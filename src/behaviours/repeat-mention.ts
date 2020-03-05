import { injectable } from 'inversify';
import { IRCSocket } from '../irc-socket';
import { BotParser } from '../bot-parser';
import { IRCMessage } from '../irc-message';
import { BotCommand } from '../bot-command';

@injectable()
export class RepeatMention {
    private readonly ircSocket: IRCSocket;
    private readonly bot: BotParser;

    constructor(ircSocket: IRCSocket, bot: BotParser) {
        this.ircSocket = ircSocket;
        this.bot = bot;
        this.bot.commands.subscribe((msg: BotCommand) => this.ircSocket.sendRaw('PRIVMSG ' + msg.params[0] + ' :' + msg.botParams.join(' ')));
    }
}