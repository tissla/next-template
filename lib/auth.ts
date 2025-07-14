// lib/auth.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// check
export async function checkAuthStatus() {
  const res = await fetch(`${API_BASE}/auth/status`, {
    credentials: 'include',
  });
  return res.json();
}

// obs: example! through code generation
export async function requestCode(phone: string) {
  const res = await fetch(`${API_BASE}/auth/code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return handleResponse(res);
}

export async function verifyCode(phone: string, code: string) {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code }),
    credentials: 'include',
  });
  return handleResponse(res);
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
