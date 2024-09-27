require('dotenv').config(); // Para leer las variables de entorno
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smptEmail: process.env.SMPT_EMAIL,
  smptPassword: process.env.SMPT_PASSWORD,
};
module.exports = { config };