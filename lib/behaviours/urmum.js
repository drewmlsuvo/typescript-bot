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
var irc_parser_1 = require("../irc-parser");
var irc_socket_1 = require("../irc-socket");
var operators_1 = require("rxjs/operators");
var UrMum = /** @class */ (function () {
    function UrMum(irc, socket) {
        var _this = this;
        this.socket = socket;
        this.irc = irc;
        this.irc.onMessage(['PRIVMSG']).pipe(operators_1.filter(function (msg) { return (msg.message.toLowerCase().includes('ur') || msg.message.toLowerCase().includes('your')) && (msg.message.toLowerCase().includes('mum') || msg.message.toLowerCase().includes('mom')); }), operators_1.throttleTime(600000))
            .subscribe(function (msg) {
            _this.socket.sendRaw('PRIVMSG ' + msg.params[0] + ' :' + msg.source.nick.toUpperCase() + ' YOUR MOTHER WAS A HAMSTER AND YOUR FATHER SMELLS OF ELDERBERRIES! 😛');
        });
    }
    UrMum = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [irc_parser_1.IRCParser, irc_socket_1.IRCSocket])
    ], UrMum);
    return UrMum;
}());
exports.UrMum = UrMum;
