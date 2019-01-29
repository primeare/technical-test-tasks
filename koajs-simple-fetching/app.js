'use strict';

const Koa = require('koa');
const koaBody = require('koa-body');
const config = require('config');
const logger = require('./lib/logger');
const gracefulShutdown = require('./lib/gracefulShutdown');
const app = new Koa();

const HOST = config.get('server.host');
const PORT = config.get('server.port');

const mixinApi = require('./components/mixin/api');
const proxyApi = require('./components/todos-proxy/api');

// body parser
app.use(koaBody());

app.use(async (ctx, next) => {
  const body = ctx.request.body;
  logger.info(`${ctx.method} ${ctx.path} - ${JSON.stringify(body)}`);
  next();
});

// POST /api/data
app.use(mixinApi);

// POST /api/todos/:id
app.use(proxyApi);

app.context.server = app.listen(PORT, HOST, () => {
  logger.info(`Server is running on http://${HOST}:${PORT}`);
});

process.on('SIGINT', () => gracefulShutdown(app.context.server, 0));
process.on('SIGTERM', () => gracefulShutdown(app.context.server, 0));
