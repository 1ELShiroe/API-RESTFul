// config inicial 
const express = require("express");
const app = express()
const db = require("mongoose");
require('dotenv').config()

// Maneira de ler json / middlewares
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// rotas da API
const personRoutes = require("./routes/personRoutes")

app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
  //mostra res = requisição;
  res.json({ message: 'OIE EXPRESS !' })
})
// entregar uma porta
db.connect(process.env.DB_CONNECT)
.then(() => {
  console.log("Conectado na database")
  app.listen(3000)
})
.catch((x) => {
  console.log(x)
});