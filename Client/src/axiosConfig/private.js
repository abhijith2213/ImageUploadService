import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { getNewToken } from '../apis/refreshTokenApi';

const baseUrl = import.meta.env.VITE_API_URL

console.log(baseUrl,'mmmm');
const privateInstance = axios.create({
    baseURL:baseUrl,
    headers: {
        'Content-Type': 'multipart/form-data',
      },})

      privateInstance.interceptors.request.use(
          async (config) => {
              const token = localStorage.getItem('accessToken');
            let currentDate = new Date();
            if(token){
                const decodedToken = jwt_decode(token)
                console.log(decodedToken,'token dedcoded');
                if(decodedToken.exp *1000 < currentDate.getTime()){
                    const refreshToken = localStorage.getItem('refreshToken');
                    console.log(refreshToken,'token expired');
                  const data =  await getNewToken(refreshToken)
                  config.headers['authorization'] = `Bearer ${data.accessToken}`;
                  // throw new Error('token expired')
                    return config;
                }else{
                    console.log(token,'hhhh');
                    config.headers['authorization'] = `Bearer ${token}`;
                    return config;
                }
            }
        },
        (error) => {
            return Promise.reject(error);
        }
        );
        
        export default privateInstance
        // (config) => {
        //   const token = localStorage.getItem('accessToken');
        //   if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        //   }
        //   return config;
        // },