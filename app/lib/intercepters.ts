import axios from 'axios';
import { useEffect } from 'react';
 
import axiosInstance from '@/service/interceptor.service';
import { useRouter } from 'next/navigation';

const setupAxiosInterceptors = () => {
  const router = useRouter();
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
//   useEffect(() => {
//     const interceptor = axiosInstance.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       async (error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem('access_token');
//           await router.push('/login');
//         }
//         return Promise.reject(error);
//       }
//     );

    
//     return () => {
//       axiosInstance.interceptors.response.eject(interceptor);
//     };
//   }, [router]);

  return null; 
};
   
 
export default setupAxiosInterceptors ;
