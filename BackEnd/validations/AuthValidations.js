import Joi from "joi";


export const registerValidation = Joi.object({
  role: Joi.string().valid("customer", "restaurantOwner", "delivery_man").required(),
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  username: Joi.string().min(3).max(50).required().not(null),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  address: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(6).required(),
});


export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  remember:Joi.boolean()
});
