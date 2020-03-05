import net from 'net';
import tls from 'tls';
import rl from 'readline';
import { Observable, fromEvent, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { injectable } from 'inversify';

import { Config } from './config';

@injectable()
export class IRCSocket {

    private socket: net.Socket;
    private config: Config;
    public data: Observable<string>;

    constructor(config: Config) {
        this.config = config;
        this.socket = tls.connect(6697, 'irc.snoonet.org');
        this.socket.setEncoding('utf8');

        let lines = rl.createInterface({input: this.socket});

        const cold = fromEvent<string>(lines, 'line');

        this.data = cold.pipe(share());

        this.sendRaw('CAP REQ :sasl');
        this.sendRaw('NICK ' + config.username);
        this.sendRaw('USER Samaritan 0 * Samaritan');
        

    }

    public sendRaw(msg: string): void {
        this.socket.write(msg + '\r\n');
        console.log('\x1b[31m', msg, '\x1b[0m');
    }
    
}