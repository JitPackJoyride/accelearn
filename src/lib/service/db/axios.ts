import axios from 'axios';

export const dbAxiosInstance = axios.create({
	baseURL: 'https://direttissima-backend.fly.dev/'
});
