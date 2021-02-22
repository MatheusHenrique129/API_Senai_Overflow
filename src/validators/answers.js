const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().min(10).max(255).required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
}