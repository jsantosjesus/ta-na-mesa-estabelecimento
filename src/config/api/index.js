import axios from 'axios';

const baseUrl = 'https://2076-2804-5dc-232-4300-29a0-e4ba-ce95-cf17.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
