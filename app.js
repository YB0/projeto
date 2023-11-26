const express = require('express')
const app = express()
const routes = require('./routes/routes')

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(3000, () => {
  console.log('Servidor iniciado')
})