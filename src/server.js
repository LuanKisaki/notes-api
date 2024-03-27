require("express-async-errors");
require("dotenv/config");

// const database = require("./database/sqlite/");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

// database();

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// ROUTE criada com resposta enviada em tela (via http)
app.get("/hello", (request, response) => {
  response.send("Hello, World!");
});
app.get("/dev", (request, response) => {
  response.send("Luan Kisaki");
});
app.get("/route_01", (request, response) => {
  response.send("Rota 01 criada");
});
app.get("/route_final", (request, response) => {
  response.send("Rota final");
});

// a partir daqui será utilizado 'req' no lugar de 'request' e 'res' no lugar de 'response'

// ROUTE PARAMS criada com o parâmetro 'id' com resposta e parâmetro enviada em tela (via http)
app.get("/route_final/:id", (req, res) => {
  res.send(`Rota final com parâmetro :id (${req.params.id})`);
});

// ROUTE PARAMS criada com o parâmetro 'id' com resposta e parâmetro em mais camadas enviada em tela (via http)
//app.get("/route_final/:id/:user", (req, res) => { res.send(`id: ${req.params.id} para o usuário: ${req.params.user}.`) })

// ROUTE PARAMS desestruturar request.params
app.get("/route_final/:id/:user", (req, res) => {
  const { id, user } = req.params;

  res.send(`id: ${id} para o usuário: ${user}.`);
});

//   app.get("/users", (req, res) => {
//     const { page, limit } = req.query;

//     res.send(`Query Params: Página: ${page}, Limite: ${limit}`)

//     // para passar os valores em Query Params via http. /users?page=2&limit=10
// })

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server is running on Port ${port}`));
