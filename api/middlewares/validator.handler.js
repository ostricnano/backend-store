const boom = require('@hapi/boom');
//clousers una funcion que retorna otra funcion
//abortEarly: false para que no se detenga en el primer error

function validatorHandler(schema, property) {
  return (req, _res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

module.exports = validatorHandler;
