import { inject, injectable } from 'inversify';
import { IRCParser } from '../irc-parser';
import { IRCSocket } from '../irc-socket';
import { IRCMessage } from '../irc-message';
import { throttleTime, filter } from 'rxjs/operators'

@injectable()
export class UrMum {
    private readonly irc: IRCParser;
    private readonly socket: IRCSocket;

    constructor(irc: IRCParser, socket: IRCSocket) {
        this.socket = socket;
        this.irc = irc;
        this.irc.onMessage(['PRIVMSG']).pipe(
                filter(msg => (msg.message.toLowerCase().includes('ur') || msg.message.toLowerCase().includes('your')) && (msg.message.toLowerCase().includes('mum') || msg.message.toLowerCase().includes('mom'))),
                throttleTime(600000))
            .subscribe((msg: IRCMessage) => {
                this.socket.sendRaw('PRIVMSG ' + msg.params[0] + ' :' + msg.source.nick.toUpperCase() + ' YOUR MOTHER WAS A HAMSTER AND YOUR FATHER SMELLS OF ELDERBERRIES! 😛');
        });
    }
}