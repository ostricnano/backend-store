'use strict';

const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recover_token', {
      type: Sequelize.STRING,
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'recover_token');
  }
};
