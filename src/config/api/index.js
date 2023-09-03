import axios from 'axios';

const baseUrl = 'https://3b90-2804-5dc-d5-c-a133-3c44-16fe-81c6.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
