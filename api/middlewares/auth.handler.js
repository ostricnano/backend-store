const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next(boom.unauthorized('apiKey not valid'));
  } else {
    next(boom.unauthorized('apiKey not valid'));
  }
}

function checkAdminRole(req, res, next) {
  const { role } = req.user;
  if (role !== 'admin') {
    next(boom.unauthorized('Role not valid'));
  } else {
    next();
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('Role not valid'));
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
