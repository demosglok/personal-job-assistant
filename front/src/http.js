import axios from 'axios';
import config from '@/config';
import router from '@/router'

const http = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    if(response.data.success) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(new Error(response.data.error))
    }
  },
  (err) => {
    if(err && err.response) {
      if(err.response.status === 401 ||
        (err.response.data && err.response.data.error === 'Not authorized')) {
        router.replace('/login')
      }
    }
    return Promise.reject(err);
  });



export { http }
