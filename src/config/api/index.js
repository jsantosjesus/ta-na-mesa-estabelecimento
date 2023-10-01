import axios from 'axios';

const baseUrl = 'https://9479-2804-5dc-20e-de00-c950-cbea-fbaa-3382.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
