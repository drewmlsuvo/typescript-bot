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
var Counter = /** @class */ (function () {
    function Counter(ircSocket, bot) {
        var _this = this;
        this.bot = bot;
        this.ircSocket = ircSocket;
        this.count = 0;
        this.bot.onCommand(['counter', 'count']).subscribe(function (msg) {
            if (msg.botParams[0] === '++') {
                _this.count++;
            }
            else if (msg.botParams[0] === '--') {
                _this.count--;
            }
            _this.ircSocket.sendRaw('PRIVMSG ' + msg.params[0] + ' :' + 'Count: ' + _this.count);
        });
    }
    Counter = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [irc_socket_1.IRCSocket, bot_parser_1.BotParser])
    ], Counter);
    return Counter;
}());
exports.Counter = Counter;
