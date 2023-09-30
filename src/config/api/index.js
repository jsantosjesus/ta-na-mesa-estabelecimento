import axios from 'axios';

const baseUrl = 'https://7fa2-2804-5dc-20e-de00-54ea-406e-9a9-e6a3.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
