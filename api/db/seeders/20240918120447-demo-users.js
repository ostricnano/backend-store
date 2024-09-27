'use strict';

const { faker } = require('@faker-js/faker');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [...Array(100)].map(() => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['admin', 'customer']),
      create_at: new Date(),
    }));

    return queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
