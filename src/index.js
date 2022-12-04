import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv"

// rotas
import userRoute from "./routes/user.rout.js";
import authRouter from "./routes/auth.rout.js";
import newsRouter from "./routes/news.route.js";
// import swaggerRouter from "./routes/swagger.rout.js"


dotenv.config(); // habilita variaveis de ambiente



// todo servidor tem por default uma variavel chamada PORT
const port = process.env.PORT || 3000;
const app = express();

connectDatabase(); // conecta com  base de dados
app.use(express.json()); // permite que sejam feitas requisicaoes reebendo JSON
app.use("/users", userRoute);
app.use("/auth", authRouter);
app.use("/news", newsRouter);
// app.use("/doc", swaggerRouter)

app.listen(port, () => console.log(`Server runnign on port: ${port}`));
