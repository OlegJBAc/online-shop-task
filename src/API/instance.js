import axios from "axios"

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

window.axios = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers,
})
