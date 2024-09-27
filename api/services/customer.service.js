const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const bcriypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcriypt.hash(data.user.password, 10);
    const newCustomer = await models.Customer.create({
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    },{
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id,{
      include: ['user']
    });
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
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;