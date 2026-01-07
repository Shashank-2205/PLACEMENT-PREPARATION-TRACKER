const API_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

/* =====================
   AUTH APIs
===================== */

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, status: res.status, message: body.message || body.error || 'Registration failed' };
    return { success: true, status: res.status, ...body };
  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, status: res.status, message: body.message || body.error || 'Login failed' };
    return { success: true, status: res.status, ...body };
  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};

export const loginAdmin = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, status: res.status, message: body.message || body.error || 'Admin login failed' };
    return { success: true, status: res.status, ...body };
  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};
export const forgotPassword = async (email) => {
  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, status: res.status, message: body.message || 'Password reset failed' };
    return { success: true, status: res.status, ...body };
  } catch (err) {
    return { success: false, message: err.message || 'Network error' };
  }
};
/* =====================
   PROGRESS APIs
===================== */

export const getTopics = async (userId) => {
  const res = await fetch(`${API_URL}/progress/${userId}`, {
    headers: getAuthHeaders()
  });
  return await res.json();
};

export const updateProgress = async (data) => {
  const res = await fetch(`${API_URL}/progress`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return await res.json();
};
/* =====================
   NOTES APIs
===================== */

export const getNotes = async (userId, topicId) => {
  const res = await fetch(
    `${API_URL}/notes/${userId}/${topicId}`,
    {
      headers: getAuthHeaders()
    }
  );
  return await res.json();
};

export const saveNotes = async (data) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return await res.json();
};

