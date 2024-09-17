const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

//se protegen los datos de la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//se crea la URI de la base de datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI);
const sequelize = new Sequelize(URI,{
    dialect: 'postgres',
    logging: false,
});

setupModels(sequelize);

module.exports = sequelize;