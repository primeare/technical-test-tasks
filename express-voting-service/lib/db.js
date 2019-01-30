'use strict';

const { readdirSync, existsSync } = require('fs');
const { join } = require('path');
const config = require('config');
const Sequelize = require('sequelize');
const logger = require('./logger');
const Op = Sequelize.Op;
const env = config.util.getEnv('NODE_ENV');

const instance = new Sequelize({
  ...config.get('db'),
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  logging: env === 'production' ? () => { /* void */ } : logger.debug,
});

const models = {};
let component = undefined, name = undefined, model = undefined;

const modelsDir = join(__dirname, '../components');
const components = readdirSync(modelsDir, config.get('readDirOptions'))
  .filter(i => i.isDirectory());

// import models from files
for (component of components) {
  const modelsPath = join(
    modelsDir,
    `./${component.name}`,
    `./${component.name}.model.js`
  );
  if (existsSync(modelsPath)) {
    const imports = instance.import(modelsPath);
    for (model of Object.keys(imports))
      models[model] = imports[model];
  }
}

for (name in models) {
  if (Object.prototype.hasOwnProperty.call(models, name)) {
    model = models[name];
    if (model.associate !== undefined) model.associate(models);
  }
}

const sync = opts => instance.sync(opts);
const shutdown = () => instance.close();

module.exports = { Sequelize, Op, instance, sync, shutdown, models };
