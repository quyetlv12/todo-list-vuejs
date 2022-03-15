import axios from 'axios'
const httpClient = axios.create({
    baseURL : 'https://622f17203ff58f023c1586c6.mockapi.io',
    headers : {
        'Content-type' : "application/json"
    }
})
export default httpClient