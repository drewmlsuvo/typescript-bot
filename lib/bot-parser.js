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
var inversify_1 = require("inversify");
var operators_1 = require("rxjs/operators");
var parsimmon_1 = __importDefault(require("parsimmon"));
var irc_parser_1 = require("./irc-parser");
var config_1 = require("./config");
var bot_command_1 = require("./bot-command");
var BotParser = /** @class */ (function () {
    function BotParser(config, irc) {
        this.config = config;
        this.irc = irc;
        var parser = parsimmon_1.default.seq(parsimmon_1.default.alt(parsimmon_1.default.string('~'), parsimmon_1.default.string(this.config.username + ': '), parsimmon_1.default.string(this.config.username + ', ')), parsimmon_1.default.takeWhile(function (c) { return c != ' '; }), parsimmon_1.default.optWhitespace.then(parsimmon_1.default.takeWhile(function (c) { return c != ' '; })
            .sepBy(parsimmon_1.default.string(' '))));
        this.commands = this.irc.onMessage(['PRIVMSG']).pipe(operators_1.filter(function (msg) { return parser.parse(msg.message).status; }), operators_1.map(function (msg) { return parser.map(function (_a) {
            var mention = _a[0], command = _a[1], params = _a[2];
            return new bot_command_1.BotCommand(msg.source, msg.command, msg.params, msg.message, command, params);
        }).tryParse(msg.message); }), operators_1.tap(function (msg) { return console.log(msg); }), operators_1.share());
    }
    BotParser.prototype.onCommand = function (command) {
        return this.commands.pipe(operators_1.filter(function (msg) { return command.includes(msg.botCommand); }), operators_1.share());
    };
    BotParser = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [config_1.Config, irc_parser_1.IRCParser])
    ], BotParser);
    return BotParser;
}());
exports.BotParser = BotParser;
