const express = require("express");
const userRoute = require("./src/routes/user.rout");
const app = express();

app.use('/soma', userRoute);



app.listen(3000);
