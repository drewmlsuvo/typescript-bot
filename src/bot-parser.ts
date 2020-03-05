import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { filter, map, tap, share } from 'rxjs/operators';
import P from 'parsimmon';


import { IRCParser } from './irc-parser';
import { Config } from './config';
import { IRCMessage } from './irc-message';
import { BotCommand } from './bot-command';

@injectable()
export class BotParser {
    private readonly config: Config;
    private readonly irc: IRCParser;

    public commands: Observable<BotCommand>;
    
    constructor(config: Config, irc: IRCParser) {
        this.config = config;
        this.irc = irc;

        let parser = P.seq(
                P.alt(P.string('~'), 
                P.string(this.config.username + ': '), 
                P.string(this.config.username + ', ')), 
                P.takeWhile(c => c != ' '), 
                P.optWhitespace.then(P.takeWhile(c => c != ' ')
            .sepBy(P.string(' '))));

        this.commands = this.irc.onMessage(['PRIVMSG']).pipe(
            filter((msg: IRCMessage) => parser.parse(msg.message).status),
            map((msg: IRCMessage) => parser.map(([mention, command, params]) => new BotCommand(msg.source, msg.command, msg.params, msg.message, command, params)).tryParse(msg.message)),
            tap(msg => console.log(msg)),
            share()
        );
    }

    public onCommand(command: string[]): Observable<BotCommand> {
        return this.commands.pipe(filter(msg => command.includes(msg.botCommand)), share());
    }
}