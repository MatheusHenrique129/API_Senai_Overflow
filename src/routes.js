const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const authMidlleware = require("./middleware/authorization");
const uploadQuestions = require("./middleware/uploadQuestions");
const uploadImage = require("./services/firebase");

const feedController = require("./controllers/feed");
const answersController = require("./controllers/answers");
const sessionController = require("./controllers/sessions");
const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");

const studentsValidators = require("./validators/students");
const questionsValidators = require("./validators/questions");
const answersValidators = require("./validators/answers");
// const { route } = require("./app");

const routes = express.Router();

//Rota de teste para aprender a mexer com o router
// const upload = multer.single("arquivo");

// routes.post("/upload", (req, res) => {

//     const handleError = (error) => {
//         if (error) {
//             res.status(400).send({ error: "Arquivo inválido" });
//         }

//         console.log(req.file);

//         res.send(req.file);
//     }

//     upload(req, res, handleError);

// });

//rotas publicas
routes.post("/sessions", sessionController.store);
routes.post("/students", studentsValidators.create, studentController.store);

routes.use(authMidlleware);

//rotas de alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rotas de perguntas
routes.post(
  "/questions",
  uploadQuestions,
  uploadImage,
  questionsValidators.create,
  questionController.store
);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

//rotas de respostas
routes.post(
  "/questions/:id/answers",
  answersValidators.create,
  uploadQuestions,
  answersController.store
);

//rotas do Feed
routes.get("/feed", feedController.index);

module.exports = routes;
