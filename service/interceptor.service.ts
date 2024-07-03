 
import axios from 'axios';
import jwt_decode from "jwt-decode"



let authTokens = localStorage.getItem('authTokens');
let parsedTokens = authTokens ? JSON.parse(authTokens) : null;




const axiosInstance = axios.create({

 baseURL: 'http://localhost:3000',
 timeout: 10000,
 headers:{Authorization: 'Bearer ${parsedTokens.access}'}  
});

export default axiosInstance;
