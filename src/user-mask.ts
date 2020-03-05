export class UserMask {
    public nick: string;
    public user: string;
    public host: string;

    constructor(nick: string, user: string, host: string) {
        this.nick = nick;
        this.user = user;
        this.host = host;
    }
}