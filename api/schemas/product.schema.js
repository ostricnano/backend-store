const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const price = joi.number().integer();
const description = joi.string().min(3).max(255);
const image = joi.string().uri();
const categoryId = joi.number().integer();

const limit = joi.number().integer();
const offset = joi.number().integer();

const price_min = joi.number().integer();
const price_max = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId,
});

const getProductSchema = joi.object({
  id: id.required(),
});

const queryProductSchema = joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: joi.number().integer(),
    then: joi.number().greater(joi.ref('price_min')).required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};