const Category = require("../models/Category");

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll();

      res.send(categories);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
