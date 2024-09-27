const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const bcriypt = require('bcrypt');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcriypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include: ['customer']
    });
    if(!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where : { email },
    });
    if(!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;