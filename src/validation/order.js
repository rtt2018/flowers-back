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
      flower: Joi.string().length(24).hex().required().messages({
        'string.base': 'ID must be a string',
        'string.length': 'ID must be exactly 24 characters long',
        'string.hex': 'ID must contain only hexadecimal characters',
        'any.required': 'ID is required',
      }),
      price: Joi.number().min(1).max(100500).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be at least {#limit}',
        'number.max': 'Price must be at most {#limit}',
        'any.required': 'Price is required',
      }),
      amount: Joi.number().min(1).max(100500).required().messages({
        'number.base': 'Amount must be a number',
        'number.min': 'Amount must be at least {#limit}',
        'number.max': 'Amount must be at most {#limit}',
        'any.required': 'Amount is required',
      }),
    }),
  ),
  totalPrice: Joi.number().min(1).max(100500).required().messages({
    'number.base': 'TotalPrice must be a number',
    'number.min': 'TotalPrice must be at least {#limit}',
    'number.max': 'TotalPrice must be at most {#limit}',
    'any.required': 'TotalPrice is required',
  }),
  phone: Joi.string()
    .pattern(/^\+?[0-9\s-]{10,20}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone must be starts with + and must contains digits, + or -',
    }),
  address: Joi.string().min(5).max(512).required().messages({
    'string.base': 'Address must be a string',
    'string.min': 'Address should have at least {#limit} characters',
    'string.max': 'Address should have at most {#limit} characters',
    'any.required': 'Address is required',
  }),
});
