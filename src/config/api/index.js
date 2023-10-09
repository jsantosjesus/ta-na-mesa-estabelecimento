import axios from 'axios';

const baseUrl = 'https://b9c4-2804-5dc-205-ef00-b464-c25a-e49c-8eab.ngrok-free.app' || '';

export const apiClient = axios.create({ baseURL: baseUrl });
