import axios from "axios";

const api = axios.create({
    baseURL: process.emv.REACT_APP_API_URL
})