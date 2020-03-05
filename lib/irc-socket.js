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
var tls_1 = __importDefault(require("tls"));
var readline_1 = __importDefault(require("readline"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var inversify_1 = require("inversify");
var config_1 = require("./config");
var IRCSocket = /** @class */ (function () {
    function IRCSocket(config) {
        this.config = config;
        this.socket = tls_1.default.connect(6697, 'irc.snoonet.org');
        this.socket.setEncoding('utf8');
        var lines = readline_1.default.createInterface({ input: this.socket });
        var cold = rxjs_1.fromEvent(lines, 'line');
        this.data = cold.pipe(operators_1.share());
        this.sendRaw('CAP REQ :sasl');
        this.sendRaw('NICK ' + config.username);
        this.sendRaw('USER Samaritan 0 * Samaritan');
    }
    IRCSocket.prototype.sendRaw = function (msg) {
        this.socket.write(msg + '\r\n');
        console.log('\x1b[31m', msg, '\x1b[0m');
    };
    IRCSocket = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [config_1.Config])
    ], IRCSocket);
    return IRCSocket;
}());
exports.IRCSocket = IRCSocket;
