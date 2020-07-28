import axios from 'axios';
const CONFIG = require('../config.json');
const API_URL = CONFIG.API_URL;

axios.interceptors.request.use(
   config => {
       const token = localStorage.getItem('accessToken');
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
       return config;
   },
   error => {
       Promise.reject(error)
   });

axios.interceptors.response.use((response) => {
   return response
}, function (error) {
   const originalRequest = error.config;
   console.log(error.response);

   if (error.response.status === 403) {
    console.log(error.response.status)
     if (!originalRequest._retry && error.response.data.error === 'AccessTokenExpired') {
         // console.log(error.response);
         originalRequest._retry = true;
         const refreshToken = localStorage.getItem('refreshToken');
         return axios.post(`${API_URL}auth/token`, {'token': refreshToken})
             .then(res => {
                 if (res.status === 201) {
                     localStorage.setItem('accessToken', res.data.tokens.accessToken);
                     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
                     return axios(originalRequest);
                 }
             })
     }

     else if (!originalRequest._retry && (error.response.data.error === 'InvalidSignature' || error.response.data.error === 'NoAccessToken')) {
          console.log('No token or invalid token');
          window.location = `${API_URL}logout`;

     } else if (originalRequest.url === `${API_URL}auth/token`) {
         console.log('WRONG TOKEN');
         window.location = `${API_URL}logout`;
         return Promise.reject(error);
     }
   }
   return Promise.reject(error);
});