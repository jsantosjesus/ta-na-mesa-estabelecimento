import axios from 'axios';

const baseUrl = 'https://c1ab-2804-5dc-232-4300-9417-d702-dfb1-181d.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
