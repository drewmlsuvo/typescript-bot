import { injectable } from 'inversify';

import { IRCSocket } from './irc-socket';
import { IRCParser } from './irc-parser';

@injectable()
export class IRCAuth {
    private readonly irc: IRCParser;
    private readonly socket: IRCSocket;

    constructor(irc: IRCParser, socket: IRCSocket) {
        this.irc = irc;
        this.socket = socket;

        
    }
}