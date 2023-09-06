import axios from 'axios';

const baseUrl = 'https://3cfa-2804-5dc-d5-11-58cb-6d4b-78ad-21e4.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
