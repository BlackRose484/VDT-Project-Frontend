import axios, { AxiosInstance } from "axios";
import {
  getJWTFromLocalStorage,
  setJWTToLocalStorage,
  clearJWTFromLocalStorage,
  getRoleFromLocalStorage,
  setRoleToLocalStorage,
  clearRoleFromLocalStorage,
} from "./auth";

class Http {
  instance: AxiosInstance;
  private access_token: string;
  private role: string;

  constructor() {
    this.access_token = getJWTFromLocalStorage();
    this.role = getRoleFromLocalStorage();
    this.instance = axios.create({
      baseURL: "https://vdt-project-backend.onrender.com", // "http://localhost:7000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${this.access_token}`;
        config.headers.Role = this.role;
        return config;
      },
      (errors) => {
        return Promise.reject(errors);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        if (url === "/auth/login" || url === "/auth/register") {
          try {
            const { token, role } = response.data;
            this.access_token = token;
            this.role = role;
            setJWTToLocalStorage(token);
            setRoleToLocalStorage(role);
          } catch (error) {
            console.log(error);
          }
        } else if (url === "/auth/logout") {
          this.access_token = "";
          clearJWTFromLocalStorage();
          clearRoleFromLocalStorage();
        }
        return response;
      },
      (errors) => {
        return Promise.reject(errors);
      }
    );
  }
}

const http = new Http().instance;
export default http;
