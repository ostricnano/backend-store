const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const image = joi.string().uri();

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = joi.object({
  name: name,
  image: image,
});

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};