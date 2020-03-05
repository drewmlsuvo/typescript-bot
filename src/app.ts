import { Container } from 'inversify';
import net, { connect } from 'net';
import tls from 'tls';
import { fromEvent, Observable, Subject } from  'rxjs';
import * as P from 'parsimmon';
import * as rl from 'readline';
import process from 'process';
import 'reflect-metadata';

import { IRCMessage } from './irc-message';
import { IRCSocket } from './irc-socket';
import { RespondToPing } from './behaviours/respond-to-ping';
import { LogData } from './behaviours/log-data';
import { UrMum } from './behaviours/urmum';
import { BotParser } from './bot-parser';
import { RepeatMention } from './behaviours/repeat-mention';
import { Counter } from './behaviours/counter';
import { Stdin } from './stdin';
import { IRCParser } from './irc-parser';

export const AppContainer = new Container({ defaultScope: "Singleton", autoBindInjectable: true});

AppContainer.get<IRCSocket>(IRCSocket);
AppContainer.get<BotParser>(BotParser);
AppContainer.get<IRCParser>(IRCParser);
AppContainer.get<Stdin>(Stdin);
AppContainer.get<RespondToPing>(RespondToPing);
AppContainer.get<LogData>(LogData);
AppContainer.get<UrMum>(UrMum);
AppContainer.get<Counter>(Counter);
AppContainer.get<RepeatMention>(RepeatMention);

