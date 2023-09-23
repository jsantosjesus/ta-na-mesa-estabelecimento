import axios from 'axios';

const baseUrl = 'https://6a71-2804-5dc-232-4300-fc91-1dd1-d732-f3aa.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
