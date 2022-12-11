import axios from "axios";

export const apiGithub = axios.create({
  baseURL: "https://api.github.com",
});

export const apiFeedback = axios.create({
  baseURL: "https://www.respondeaqui.com.br",
});
