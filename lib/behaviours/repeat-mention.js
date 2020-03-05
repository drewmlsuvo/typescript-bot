"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var irc_socket_1 = require("../irc-socket");
var bot_parser_1 = require("../bot-parser");
var RepeatMention = /** @class */ (function () {
    function RepeatMention(ircSocket, bot) {
        var _this = this;
        this.ircSocket = ircSocket;
        this.bot = bot;
        this.bot.commands.subscribe(function (msg) { return _this.ircSocket.sendRaw('PRIVMSG ' + msg.params[0] + ' :' + msg.botParams.join(' ')); });
    }
    RepeatMention = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [irc_socket_1.IRCSocket, bot_parser_1.BotParser])
    ], RepeatMention);
    return RepeatMention;
}());
exports.RepeatMention = RepeatMention;
