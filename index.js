import express from "express";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.rout.js";

const port = 3000;
const app = express();

connectDatabase(); // conecta com  base de dados
app.use(express.json()); // permite que sejam feitas requisicaoes reebendo JSON
app.use("/users", userRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
