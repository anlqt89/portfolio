export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const API = {
  chat:            `${API_BASE_URL}/api/chat`,
  contact:         `${API_BASE_URL}/api/contact`,
  contactSend:     `${API_BASE_URL}/api/contact/send`,
  experience:      `${API_BASE_URL}/api/experience`,
  skills:          `${API_BASE_URL}/api/skills`,
  projects:        `${API_BASE_URL}/api/projects`,
  projectById: (id) => `${API_BASE_URL}/api/projects/${id}`,
  education:       `${API_BASE_URL}/api/education`,
  resumeDownload:  `${API_BASE_URL}/api/resume/download`,
  media: (filename) => `${API_BASE_URL}/media/${filename}`,
  search: (q) => `${API_BASE_URL}/api/search?q=${encodeURIComponent(q)}`,
};
