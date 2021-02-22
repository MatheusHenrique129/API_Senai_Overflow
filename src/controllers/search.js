const { Op } = require("sequelize");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

module.exports = {
  async find(req, res) {
    const keyword = req.query.keyword;

    try {
      const question = await Question.findAll({
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "image"],
          },
          {
            association: "Answers",
            attributes: ["id", "description", "student_id", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
          {
            association: "Categories",
            through: { attributes: [] },
            attributes: ["id", "description"],
          },
        ],
        order: [["created_at", "DESC"]],
        limit: 5,

        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });

      res.status(200).send(question);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
