//importa o express
const express = require("express");
const { errors } = require("celebrate");

//importa as rotas
const routes = require("./routes");

require("./database");

//cria a aplicação express
const app = express();

app.use(express.json());

//definimos a pasta uploads como pública, servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors()); //Importante que fique em baixo de routes

module.exports = app;
