import axios from 'axios';

export const api = axios.create({
    baseURL: "https://chandla-steel-works.onrender.com/api"
});