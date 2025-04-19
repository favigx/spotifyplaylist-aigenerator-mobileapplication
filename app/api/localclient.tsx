import axios from 'axios';

const localClient = axios.create({
  baseURL: 'http://192.168.1.13:8080/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default localClient;
