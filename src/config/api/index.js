import axios from 'axios';

const baseUrl = 'https://7c14-2804-5dc-232-4300-599c-bb0a-8b6-5dea.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
