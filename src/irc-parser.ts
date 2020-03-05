import P from 'parsimmon';
import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';
import { map, filter, tap, share } from 'rxjs/operators';

import { IRCMessage } from './irc-message';
import { IRCSocket } from './irc-socket';
import { Config } from './config';
import { UserMask } from './user-mask';

@injectable()
export class IRCParser {
    private readonly socket: IRCSocket;
    
    public all: Observable<IRCMessage>;
    
    constructor(ircSocket: IRCSocket, config: Config) {
        this.socket = ircSocket;
        this.all = ircSocket.data.pipe(map(data => this.parseIRC(data)), share());

        let authString = new Buffer('\0' + config.username + '\0' + config.password);

        this.socket.sendRaw('AUTHENTICATE PLAIN');  
        this.all.subscribe(msg => {
            if (msg.command == 'AUTHENTICATE' && msg.params[0] == '+') {
                this.socket.sendRaw('AUTHENTICATE ' + authString.toString('base64'));
                this.socket.sendRaw('CAP END');
            }
        })
        
    }

    public onMessage(messages: string[]): Observable<IRCMessage> {
        return this.all.pipe(filter(msg => messages.includes(msg.message)), share());
    }

    private parseIRC(data: string): IRCMessage {
        let userMask = P.string(':').then(
            P.seq(
                P.regexp(/[^!]+/), 
                P.string('!').then(P.regexp(/[^@]+/)), 
                P.string('@').then(P.regexp(/[^ ]+/)))
            .map(([nick, user, host]) => new UserMask(nick, user, host)))
            .or(P.of(new UserMask('', '', '')));

        let parser = P.seq(
            userMask, 
            P.optWhitespace.then(P.takeWhile(c => c != ' ')), 
            P.optWhitespace.then(P.regexp(/[^ :\r]*/)).sepBy(P.whitespace), 
            P.string(':').then(P.regexp(/[^\r]*/)).or(P.of('')))
            .map(([sender, command, params, body]) => new IRCMessage(sender, command, params, body));
    
        return parser.tryParse(data);
    }
}

