//const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

//estas dos no hacen falta porque lo gestiona sequelize
//const getConnection = require('../libs/postgres');

// no hace falta incializar el contrusctos con this.pool = pool
// const pool = require('../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}
  // generate() {
  //   const limit =  10;
  //   for (let i = 0; i < limit; i++) {
  //     this.users.push({
  //       id: faker.string.uuid(),
  //       name: faker.person.fullName(),
  //       email: faker.internet.email(),
  //     });
  //   }
  // }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = this.findOne(id);
    return user;
  }

  async update(id, changes) {
    const user = this.findOne(id);
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;