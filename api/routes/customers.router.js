const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const CustomerService = require('../services/customer.service');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newCustomer,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
  async (req, res, next) => {
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;