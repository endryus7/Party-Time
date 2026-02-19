const mongoose = require("mongoose")

async function main() {
    
    try {
        mongoose.set("strictQuery", true)

        await mongoose.connect("mongodb+srv://endryusmontezano_db_user:caveira1@party-time.92qdabl.mongodb.net/?appName=Party-Time")

        console.log("Conectado ao banco!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main