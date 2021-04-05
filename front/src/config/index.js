const DEFAULT_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:8081' : 'https://jobassistant.selin.in.ua';
const backendUrl = process.env.BACKEND_URL || DEFAULT_URL;
export default {
  BACKEND_URL: backendUrl,
  authUrls: {
    fb: `${backendUrl}/auth/facebook`,
    google: `${backendUrl}/auth/google`,
    github: `${backendUrl}/auth/github`,
    linkedin: `${backendUrl}/auth/linkedin`,
    logout: `${backendUrl}/auth/logout`,
  }
}
