import axios from 'axios';

export const aiAxiosInstance = axios.create({
	baseURL: 'https://direttissima-backend.fly.dev/'
});
