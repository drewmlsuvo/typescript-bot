import { UserMask } from "./user-mask";

export class IRCMessage {
    constructor(source: UserMask, command: string, params: string[], message: string) {
        this.source = source;
        this.command = command;
        this.params = params;
        this.message = message;
    }
    source: UserMask;
    command: string;
    params: string[];
    message: string;
}