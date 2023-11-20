const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:8000";

const config = {
  BACKEND_URL,
  EMPLOYEE_LOGIN_ENDPOINT: `${BACKEND_URL}/api/auth/employee/login`,
  EMPLOYEE_LOGOUT_ENDPOINT: `${BACKEND_URL}/api/auth/employee/logout`,
  ADMIN_LOGIN_ENDPOINT: `${BACKEND_URL}/api/auth/admin/login`,
  ADMIN_LOGOUT_ENDPOINT: `${BACKEND_URL}/api/auth/admin/logout`,
};

export { config };
