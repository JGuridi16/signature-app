import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  },
});

const baseApiURL = 'api/signature';

export const saveSignatureData = async (payload) =>
  await apiClient.post(`${baseApiURL}/save`, payload);