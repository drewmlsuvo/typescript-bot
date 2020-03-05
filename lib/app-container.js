"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
exports.AppContainer = new inversify_1.Container({ defaultScope: "Singleton", autoBindInjectable: true });
/*
AppContainer.bind<IRCSocket>(IRCSocket).toSelf();
AppContainer.bind<Config>(Config).toSelf();
AppContainer.bind<IRCParser>(IRCParser).toSelf();
AppContainer.bind<BotParser>(BotParser).toSelf();

AppContainer.bind<RespondToPing>(RespondToPing).toSelf();
AppContainer.bind<LogData>(LogData).toSelf();
AppContainer.bind<UrMum>(UrMum).toSelf();
AppContainer.bind<RepeatMention>(RepeatMention).toSelf();
AppContainer.bind<Counter>(Counter).toSelf();
*/ 
