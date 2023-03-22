/* eslint-disable prettier/prettier */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://chatgpt-api-54ip.onrender.com/chatgpt',
});
