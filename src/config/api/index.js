import axios from 'axios';

const baseUrl = 'https://3d19-2804-5dc-205-ef00-1474-f032-1df9-7697.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
