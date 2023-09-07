import axios from 'axios';

const baseUrl = 'https://5396-2804-5dc-232-4300-2dc9-d539-2493-ee40.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
