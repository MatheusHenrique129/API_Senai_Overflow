const express = require("express");

const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answersController = require("./controllers/answers");
const feedController = require("./controllers/feed");

const routes = express.Router();

//rotas de alunos
routes.get("/students", studentController.index);

routes.get("/students/:id", studentController.find);
routes.post("/students", studentController.store);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);


//rotas de perguntas
routes.post("/questions", questionController.store);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

//rotas de respostas
routes.post("/questions/:id/answers", answersController.store);

//rotas do Feed
routes.get("/feed", feedController.index);


module.exports = routes;