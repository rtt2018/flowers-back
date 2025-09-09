import Joi from 'joi';

export const createOrderShema = Joi.object({
  user: Joi.object({
    name: Joi.string().min(3).max(64).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least {#limit} characters',
      'string.max': 'Name should have at most {#limit} characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email field cannot be empty',
      'string.email':
        'Please enter a valid email with .com, .org or .net domain',
      'any.required': 'Email is required',
    }),
  }),
  cart: Joi.array().items(
    Joi.object({
      _id: Joi.string().length(24).hex().required().messages({
        'string.base': 'ID must be a string',
        'string.length': 'ID must be exactly 24 characters long',
        'string.hex': 'ID must contain only hexadecimal characters',
        'any.required': 'ID is required',
      }),
      //   name: Joi.string().min(3).max(128).required().messages({
      //     'string.base': 'Flower name must be a string',
      //     'string.min': 'Flower name should have at least {#limit} characters',
      //     'string.max': 'Flower name should have at most {#limit} characters',
      //     'any.required': 'Flower name is required',
      //   }),
      //   description: Joi.string().min(3).max(512).required().messages({
      //     'string.base': 'Flower description must be a string',
      //     'string.min':
      //       'Flower description should have at least {#limit} characters',
      //     'string.max':
      //       'Flower description should have at most {#limit} characters',
      //     'any.required': 'Flower description is required',
      //   }),
      //   price: Joi.number().min(1).max(100500).required().messages({
      //     'number.base': 'Food energy must be a number',
      //     'number.min': 'Food energy must be at least {#limit}',
      //     'number.max': 'Food energy must be at most {#limit}',
      //     'any.required': 'Price is required',
      //   }),
      amount: Joi.number().min(1).max(100500).required().messages({
        'number.base': 'Food energy must be a number',
        'number.min': 'Food energy must be at least {#limit}',
        'number.max': 'Food energy must be at most {#limit}',
        'any.required': 'Price is required',
      }),
    }),
  ),
  totalPrice: Joi.number().min(1).max(100500).required().messages({
    'number.base': 'Food energy must be a number',
    'number.min': 'Food energy must be at least {#limit}',
    'number.max': 'Food energy must be at most {#limit}',
    'any.required': 'Price is required',
  }),
});
