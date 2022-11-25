const express = require("express");
const app = express();


/* reuisicao get, no caminho (/), executara a callback*/ 
app.get("/",  (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
