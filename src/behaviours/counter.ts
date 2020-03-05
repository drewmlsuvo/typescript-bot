import { injectable } from 'inversify';
import { filter } from 'rxjs/operators';

import { IRCSocket } from '../irc-socket';
import { BotParser } from '../bot-parser';

@injectable()
export class Counter {
    private readonly ircSocket: IRCSocket;
    private readonly bot: BotParser;

    private count: number;

    constructor(ircSocket: IRCSocket, bot: BotParser) {
        this.bot = bot;
        this.ircSocket = ircSocket;

        this.count = 0;

        this.bot.onCommand(['counter', 'count']).subscribe(msg => {
            if (msg.botParams[0] === '++') {
                this.count++;
            }
            else if (msg.botParams[0] === '--') {
                this.count--;
            }

            this.ircSocket.sendRaw('PRIVMSG ' + msg.params[0] + ' :' + 'Count: ' + this.count);
        });

    }
}