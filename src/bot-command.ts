import { IRCMessage } from "./irc-message";
import { UserMask } from "./user-mask";

export class BotCommand extends IRCMessage {
    public botCommand: string;
    public botParams: string[];

    constructor(source: UserMask, command: string, params: string[], message: string, botCommand: string, botParams: string[]) {
        super(source, command, params, message);
        this.botCommand = botCommand;
        this.botParams = botParams;
    }
}