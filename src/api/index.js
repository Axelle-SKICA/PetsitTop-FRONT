import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://petsit-top-api.up.railway.app/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});
