const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {},

  async store(req, res) {
    const { title, description, gist, categories } = req.body;

    const categoriesArray = categories.split(",");

    const { studentId } = req;

    const {firebaseUrl} = req.file? req.file: ""



    try {
      //buscar o aluno pelo ID
      let student = await Student.findByPk(studentId);

      //se aluno não existir, retorna erro
      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado" });

      //crio a pergunta para o aluno
      let question = await student.createQuestion({
        title,
        description,
        image: firebaseUrl,
        gist,
      });

      await question.addCategories(categoriesArray);

      //retorno sucesso
      res.status(201).send(question);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  find(req, res) {},

  async update(req, res) {
    const questionId = req.params.id;

    const { title, description } = req.body;

    const { studentId } = req;

    try {
      const question = await Question.findByPk(questionId);

      if (!question)
        return res.status(404).send({ error: "Questão não encontrada" });

      if (question.StudentId != studentId)
        return res.status(401).send({ error: "Não autorizado" });

      question.title = title;
      question.description = description;

      question.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const questionId = req.params.id;

    const { studentId } = req;

    try {
      const question = await Question.findOne({
        where: {
          id: questionId,
          student_id: studentId,
        },
      });

      if (!question) res.status(404).send({ error: "Questão não encontrada" });

      await question.destroy();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
