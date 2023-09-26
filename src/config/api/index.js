import axios from 'axios';

const baseUrl = 'https://83ee-2804-5dc-232-4300-48e2-6910-23fb-e7c6.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
