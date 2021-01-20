const express = require("express");
const Multer = require("multer");
const { celebrate, Segments, Joi } = require("celebrate");

const authMidlleware = require("./middleware/authorization");

const feedController = require("./controllers/feed");
const answersController = require("./controllers/answers");
const sessionController = require("./controllers/sessions");
const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");

const studentsValidators = require("./validators/students");
const questionsValidators = require("./validators/questions");
const answersValidators = require("./validators/answers");
const { route } = require("./app");


const routes = express.Router();

const multer = Multer({
    storage: Multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, calback) => {
            //pop pega sempre a ultima estima de um vetor
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return calback(null, filename);
        }
    })
});

routes.post("/upload", multer.single("arquivo"), (req, res) => {
    console.log(req.file);

    res.send(req.file);
});

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
routes.post("/questions", questionsValidators.create, questionController.store);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

//rotas de respostas
routes.post("/questions/:id/answers", answersValidators.create, answersController.store);

//rotas do Feed
routes.get("/feed", feedController.index);

module.exports = routes;