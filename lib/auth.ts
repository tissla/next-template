const API_BASE = '';

export async function checkAuthStatus() {
  const res = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'status' }),
    credentials: 'include',
  });
  return res.json();
}

export async function requestCode(phone: string) {
  const res = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'request-code', phone }),
    credentials: 'include',
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to request code');
  }
  return res.json();
}

export async function verifyCode(phone: string, code: string) {
  const res = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'verify-code', phone, code }),
    credentials: 'include',
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Verification failed');
  }
  return res.json();
}

export async function login(phone: string, code: string) {
  await verifyCode(phone, code);
}

export async function logout() {
  await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'logout' }),
    credentials: 'include',
  });
}
