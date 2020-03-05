import { inject, injectable } from 'inversify';

import { IRCMessage } from '../irc-message';
import { IRCSocket } from '../irc-socket';
import { IRCParser } from '../irc-parser';

@injectable()
export class RespondToPing {
    private readonly ircSocket: IRCSocket;
    private readonly ircMsg: IRCParser;
    
    constructor(ircSocket: IRCSocket, ircMsg: IRCParser) {
        this.ircSocket = ircSocket;
        this.ircMsg = ircMsg;

        this.ircMsg.onMessage(['PING']).subscribe( (msg: IRCMessage) => {
            this.respondToPing(msg.params.join());
        }
        )
    }

    private respondToPing(message: string): void {
        this.ircSocket.sendRaw('PONG :' + message);
    }

}