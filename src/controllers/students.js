const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");
const { generateToken } = require("../utils");

module.exports = {
  //função que vai ser executada pela rota
  async index(req, res) {
    try {
      const student = await Student.findAll();

      res.send(student);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    //recuperar o id do aluno
    const studentId = req.params.id;

    try {
      let student = await Student.findByPk(studentId, {
        attributes: ["id", "ra", "name", "email"],
      });

      //se aluno não encontrado, retornar not found
      if (!student)
        return res.status(404).send({ erro: "Aluno não encontrado" });

      res.send(student);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async store(req, res) {
    //receber os dados do body
    const { ra, name, email, password } = req.body;

    try {
      //SELECT * FROM alunos WHERE ra = ? AND email = ?
      let student = await Student.findOne({
        where: {
          ra: ra,
        },
      });

      if (student)
        return res.status(400).send({ error: "Aluno já cadastrado" });

      const passwordCript = bcrypt.hashSync(password);

      student = await Student.create({
        ra,
        name,
        email,
        password: passwordCript,
      });

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      //retornar resposta de sucesso
      res.status(201).send({
        student: {
          studentId: student.id,
          name: student.name,
          ra: student.ra,
          email: student.email,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    //recuperar o id do aluno
    const studentId = req.params.id;

    try {
      let student = await Student.findByPk(studentId);

      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado" });

      await student.destroy();

      //devolver resposta de sucesso
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    //recuperar o id do aluno
    const studentId = req.params.id;

    //recuperar o dados do corpo
    const { name, email } = req.body;

    try {
      let student = await Student.findByPk(studentId);

      if (!student) res.status(404).send({ error: "Aluno não encontrado" });

      student.name = name;
      student.email = email;

      student.save();

      //retornar resposta
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
