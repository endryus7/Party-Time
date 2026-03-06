const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

// DB Connection
const conn = require("./db/conn")

conn()

// rota principal
app.get("/", (req, res) => {
  res.json({ message: "Party Time API funcionando 🚀" });
})

// Routes
const routes = require("./routes/router")

app.use("/api", routes)

app.listen(3000, function() {
    console.log("Servidor Online!")
})

// 189.30.234.223