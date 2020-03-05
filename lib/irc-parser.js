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
var parsimmon_1 = __importDefault(require("parsimmon"));
var inversify_1 = require("inversify");
var operators_1 = require("rxjs/operators");
var irc_message_1 = require("./irc-message");
var irc_socket_1 = require("./irc-socket");
var config_1 = require("./config");
var user_mask_1 = require("./user-mask");
var IRCParser = /** @class */ (function () {
    function IRCParser(ircSocket, config) {
        var _this = this;
        this.socket = ircSocket;
        this.all = ircSocket.data.pipe(operators_1.map(function (data) { return _this.parseIRC(data); }), operators_1.share());
        var authString = new Buffer('\0' + config.username + '\0' + config.password);
        this.socket.sendRaw('AUTHENTICATE PLAIN');
        this.all.subscribe(function (msg) {
            if (msg.command == 'AUTHENTICATE' && msg.params[0] == '+') {
                _this.socket.sendRaw('AUTHENTICATE ' + authString.toString('base64'));
                _this.socket.sendRaw('CAP END');
            }
        });
    }
    IRCParser.prototype.onMessage = function (messages) {
        return this.all.pipe(operators_1.filter(function (msg) { return messages.includes(msg.message); }), operators_1.share());
    };
    IRCParser.prototype.parseIRC = function (data) {
        var userMask = parsimmon_1.default.string(':').then(parsimmon_1.default.seq(parsimmon_1.default.regexp(/[^!]+/), parsimmon_1.default.string('!').then(parsimmon_1.default.regexp(/[^@]+/)), parsimmon_1.default.string('@').then(parsimmon_1.default.regexp(/[^ ]+/)))
            .map(function (_a) {
            var nick = _a[0], user = _a[1], host = _a[2];
            return new user_mask_1.UserMask(nick, user, host);
        }))
            .or(parsimmon_1.default.of(new user_mask_1.UserMask('', '', '')));
        var parser = parsimmon_1.default.seq(userMask, parsimmon_1.default.optWhitespace.then(parsimmon_1.default.takeWhile(function (c) { return c != ' '; })), parsimmon_1.default.optWhitespace.then(parsimmon_1.default.regexp(/[^ :\r]*/)).sepBy(parsimmon_1.default.whitespace), parsimmon_1.default.string(':').then(parsimmon_1.default.regexp(/[^\r]*/)).or(parsimmon_1.default.of('')))
            .map(function (_a) {
            var sender = _a[0], command = _a[1], params = _a[2], body = _a[3];
            return new irc_message_1.IRCMessage(sender, command, params, body);
        });
        return parser.tryParse(data);
    };
    IRCParser = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [irc_socket_1.IRCSocket, config_1.Config])
    ], IRCParser);
    return IRCParser;
}());
exports.IRCParser = IRCParser;
