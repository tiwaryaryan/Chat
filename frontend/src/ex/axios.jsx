import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "http://localhost:3001/",  //making requests to apis
  withCredentials: true,  //this will send the cookie or jwt token with it also
});


//we made this so that we dont have have to repeat this again and again