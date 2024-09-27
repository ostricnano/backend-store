const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    console.log(newOrder,'aaaaaaa');
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  async find() {
    const orders = await models.Order.findAll({
      include: ['customer']
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id,{
      include: [
      {
        association: 'customer',
        include: ['user']
      },
      'items',
    ]
    });
    if(!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async finByUser (userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
      ]
    })
    return orders;
  }

  async update(id, changes) {
    const order = this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = this.findOne(id);
    await order.destroy();
    return { id };
  }
}
module.exports = OrderService;