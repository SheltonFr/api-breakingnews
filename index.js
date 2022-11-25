const express = require("express");
const app = express();
const connectDatabase = require('./src/database/db');

const userRoute = require("./src/routes/user.rout");

const port = 3000;

connectDatabase(); // conecta com  base de dados
app.use(express.json()); // permite que sejam feitas requisicaoes reebendo JSON
app.use("/users", userRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
