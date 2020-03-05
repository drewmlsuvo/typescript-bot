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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var readline_1 = __importDefault(require("readline"));
var rxjs_1 = require("rxjs");
var inversify_1 = require("inversify");
var irc_socket_1 = require("./irc-socket");
var Stdin = /** @class */ (function () {
    function Stdin(ircSocket) {
        var _this = this;
        this.ircSocket = ircSocket;
        var stdinLines = readline_1.default.createInterface({ input: process_1.default.stdin });
        var stdin = rxjs_1.fromEvent(stdinLines, 'line');
        stdin.subscribe(function (line) { return _this.ircSocket.sendRaw(line); });
    }
    Stdin = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [irc_socket_1.IRCSocket])
    ], Stdin);
    return Stdin;
}());
exports.Stdin = Stdin;
