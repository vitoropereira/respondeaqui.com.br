import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com",
});

export const apiFeedback = axios.create({
  baseURL: "http://localhost:3000",
});
