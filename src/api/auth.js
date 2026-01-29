// src/api/auth.js
import axios from "axios";

const API = "http://localhost:4000/api/auth";

export async function login(email, password) {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data; // FIX: Return data only
}
