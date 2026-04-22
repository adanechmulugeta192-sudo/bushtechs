// src/api/auth.js
import axios from "axios";

// This pulls from your .env file automatically
const API_BASE = import.meta.env.VITE_API_BASE; 

export async function login(email, password) {
  // Use backticks `` to combine the base URL and the route
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data;
}
