'use strict';
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(ORDER_PRODUCT_TABLE, 'price');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(ORDER_PRODUCT_TABLE, 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  }
};
