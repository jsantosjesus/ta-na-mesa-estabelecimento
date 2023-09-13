import axios from 'axios';

const baseUrl = 'https://2e4a-2804-5dc-232-4300-2cf2-cfc2-aff1-ea4c.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
