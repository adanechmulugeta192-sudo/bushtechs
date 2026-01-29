import axios from 'axios';

const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const api = axios.create({ baseURL: base });

export async function fetchProjects() {
  const res = await api.get('/projects');
  return res.data;
}

export async function postContact(payload) {
  const res = await api.post('/contact', payload);
  return res.data;
}

export async function loginAdmin(creds) {
  const res = await api.post('/auth/login', creds);
  return res.data;
}

export default api;
