const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');


const { config } = require('../config/config');
const UserService = require('./user.service');
const service = new UserService();


class AuthServicer {

  async getUser (email, password) {
    const user = await service.findByEmail(email)
    if(!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    }
  }

  async sentRecovery(email){
    const user = await service.findByEmail(email)
    if(!user) {
      throw boom.unauthorized('user not found');
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://localhost:3000/recovery/?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smptEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contraseña ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Ingresa al siguiente link ->> ${link} para recuperar la contraseña</b>`, // html body
    }
    const rta = await this.sendEmail(mail);
    return rta;
  }

  async sendEmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: config.smptEmail,
        pass: config.smptPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'email sent'}
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'password changed' }
    } catch (error) {
     throw boom.unauthorized('invalid token');
    }
  }

}

module.exports = AuthServicer;