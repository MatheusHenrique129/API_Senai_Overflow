const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      search: Joi.string().min(3).required(),
    }),
  }),
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(5).max(255).required(),
      description: Joi.string().min(10).max(255).required(),
      gist: Joi.string().min(20).max(255),
      categories: Joi.string().required(),
    }),
  }),
};
