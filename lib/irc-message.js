"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRCMessage = /** @class */ (function () {
    function IRCMessage(source, command, params, message) {
        this.source = source;
        this.command = command;
        this.params = params;
        this.message = message;
    }
    return IRCMessage;
}());
exports.IRCMessage = IRCMessage;
