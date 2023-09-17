import axios from 'axios';

const baseUrl = 'https://0a8c-2804-5dc-232-4300-286b-f615-9108-8c7e.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
