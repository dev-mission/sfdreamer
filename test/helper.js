/* eslint-disable mocha/no-top-level-hooks, mocha/no-hooks-for-single-case, mocha/no-exports */

// MUST BE FIRST! set the NODE_ENV to test to disable logging, switch to test db
process.env.NODE_ENV = 'test';

const fixtures = require('sequelize-fixtures');
const path = require('path');

const models = require('../models');

const loadFixtures = async (files) => {
  const filePaths = files.map((f) => path.resolve(__dirname, `fixtures/${f}.json`));
  await models.sequelize.transaction(async (transaction) => {
    await fixtures.loadFiles(filePaths, models, { transaction });
  });
};

const resetDatabase = async () => {
  // clear all test data (order matters due to foreign key relationships)
  await models.sequelize.query(`
    DELETE FROM "Resources";
    DELETE FROM "Categories";
    DELETE FROM "Users";
  `);
};

beforeEach(async () => {
  await resetDatabase();
});

// eslint-disable-next-line no-undef
after(async () => {
  // close all db connections
  await models.sequelize.close();
});

module.exports = {
  loadFixtures,
};
