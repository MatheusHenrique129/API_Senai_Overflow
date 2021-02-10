const Student = require("../models/Student");

module.exports = {
  async store(req, res) {
    const { firebaseUrl } = req.file;

    const { studentId } = req;

    if (!firebaseUrl)
      return res.status(400).send({ error: "Campo Imagem é obrigatório" });

    try {
      const student = await Student.findByPk(studentId);

      student.image = firebaseUrl;

      student.save();

      res.status(201).send({
        studentId,
        image: firebaseUrl,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
