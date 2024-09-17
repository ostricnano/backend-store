const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(id) {
    const customer = this.findOne(id);
    if(!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = this.findOne(id);
    const updatedCustomer = await customer.update(changes);
    return updatedCustomer;
  }

  async delete(id) {
    const customer = this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;