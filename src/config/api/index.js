import axios from 'axios';

const baseUrl = 'https://6a18-2804-5dc-d5-c-3d50-9995-a6e2-bd86.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
