const { Segments, Joi, celebrate } = require("celebrate");


module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      ra: Joi.string().length(7).pattern(/^[0-9]+$/).required(),
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().min(8).max(255),
      password: Joi.string().min(6).max(255)
    })
  }),
}