export const API_URL = "http://127.0.0.1:8000/api";

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("accessToken");
  if (token && token !== "undefined" && token !== "null") {
    return { "Authorization": `Bearer ${token}` };
  }
  return {};
};

export const api = {
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
    return res.json();
  },

  getCourses: async () => {
    const res = await fetch(`${API_URL}/courses/`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  },

  getMyCourses: async () => {
    const res = await fetch(`${API_URL}/courses/my-courses/`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch my courses");
    return res.json();
  },

  getCourseDetails: async (id: string) => {
    const res = await fetch(`${API_URL}/courses/${id}/full/`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to load course content");
    return res.json();
  },

  getMonitorDashboard: async () => {
    const res = await fetch(`${API_URL}/courses/monitor/dashboard/`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch monitor dashboard");
    return res.json();
  },

  markLessonComplete: async (lessonId: number) => {
    const res = await fetch(`${API_URL}/courses/lessons/${lessonId}/complete/`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to update progress");
    return res.json();
  },

  // NEW
  enrollCourse: async (courseId: number) => {
    const res = await fetch(`${API_URL}/courses/${courseId}/enroll/`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Enrollment failed");
    return res.json();
  },

  // NEW
  manageEnrollment: async (enrollmentId: number, action: 'approve' | 'reject') => {
    const res = await fetch(`${API_URL}/courses/enrollment/${enrollmentId}/manage/`, {
      method: "POST",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (!res.ok) throw new Error("Action failed");
    return res.json();
  }
};