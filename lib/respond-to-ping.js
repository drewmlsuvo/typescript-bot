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
var irc_socket_1 = require("./irc-socket");
var irc_parser_1 = require("./irc-parser");
var RespondToPing = /** @class */ (function () {
    function RespondToPing(ircSocket, ircMsg) {
        var _this = this;
        this.ircSocket = ircSocket;
        this.ircMsg = ircMsg;
        this.ircMsg.ping.subscribe(function (msg) {
            _this.respondToPing(msg.message);
        });
    }
    RespondToPing.prototype.respondToPing = function (message) {
        this.ircSocket.sendMessage('PONG :' + message);
    };
    RespondToPing = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [irc_socket_1.IRCSocket, irc_parser_1.IRCParser])
    ], RespondToPing);
    return RespondToPing;
}());
exports.RespondToPing = RespondToPing;
