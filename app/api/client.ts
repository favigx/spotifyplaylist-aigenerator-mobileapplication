import axios from 'axios';

const client = axios.create({
  baseURL: 'https://sea-turtle-app-le797.ondigitalocean.app/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
