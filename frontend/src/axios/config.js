import axios from "axios"

const partyFetch = axios.create({
    baseURL: "https://party-time-api-7ajw.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

// Keep-alive: pinga o backend a cada 13 minutos 

const PING_INTERVAL = 13 * 60 * 1000 // 13 minutos
 
const keepAlive = () => {
    axios.get(`${BASE_URL}/health`).catch(() => {
        // silencia erros 
    })
}
 
// Aguarda 5s após o carregamento
setTimeout(() => {
    keepAlive()
    setInterval(keepAlive, PING_INTERVAL)
}, 5000)

export default partyFetch