const Question = require("../models/Question");
const Answer = require("../models/Answer");
const { removeAttribute } = require("../models/Question");

module.exports = {
  async index(req, res) {
    try {
      const feed = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
        ],
        include: [
          {
            association: "Student",
            attributes: ["id", "name"],
          },
          {
            association: "Categories",
            attributes: ["id", "description"],
            through: { attributes: [] },
          },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name"],
            },
          },
        ],
        order: [["created_at", "DESC"]],
      });

      res.send(feed);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};