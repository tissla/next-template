// lib/auth.ts

// endpoint base, if multiple consider reverse proxy on serverside
const API_BASE = process.env.API_BASE_URL || '';

// check
export async function checkAuthStatus() {
  const res = await fetch(`${API_BASE}/auth/status`, {
    credentials: 'include',
  });
  return res.json();
}

// logout
export async function logout() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res);
}

// error handling
async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Error: ${res.status}`);
  }
  return data;
}
