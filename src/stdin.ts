import process from 'process';
import rl from 'readline';
import { fromEvent, Observable } from 'rxjs'
import { injectable } from 'inversify';

import { IRCSocket } from './irc-socket';


@injectable()
export class Stdin {
    private readonly ircSocket: IRCSocket;

    constructor (ircSocket: IRCSocket) {
        this.ircSocket = ircSocket;

        const stdinLines = rl.createInterface({input: process.stdin});
        const stdin = fromEvent<string>(stdinLines, 'line');

        stdin.subscribe((line: string) => this.ircSocket.sendRaw(line));
    }
    
}