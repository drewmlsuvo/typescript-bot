import { injectable } from 'inversify';
import { IRCSocket } from '../irc-socket';

@injectable()
export class LogData {
    private readonly ircSocket: IRCSocket;

    constructor(ircSocket: IRCSocket) {
        this.ircSocket = ircSocket;
        ircSocket.data.subscribe(data => console.log(data));
    }
}