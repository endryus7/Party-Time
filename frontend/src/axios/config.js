import axios from "axios"

const partyFetch = axios.create({
    baseURL: "https://party-time-api-7ajw.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default partyFetch