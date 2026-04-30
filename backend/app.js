const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

// DB Connection
const conn = require("./db/conn")

conn()

// Health check — usado pelo keep-alive para evitar demora no start
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

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