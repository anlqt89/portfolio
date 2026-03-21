export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const API = {
  chat:            `${API_BASE_URL}/chat`,
  contact:         `${API_BASE_URL}/contact`,
  contactSend:     `${API_BASE_URL}/contact/send`,
  experience:      `${API_BASE_URL}/experience`,
  skills:          `${API_BASE_URL}/skills`,
  projects:        `${API_BASE_URL}/projects`,
  projectById: (id) => `${API_BASE_URL}/projects/${id}`,
  education:       `${API_BASE_URL}/education`,
  resumeDownload:  `${API_BASE_URL}/resume/download`,
  media: (filename) => `${API_BASE_URL.replace('/api', '')}/media/${filename}`,
  search: (q) => `${API_BASE_URL}/search?q=${encodeURIComponent(q)}`,
};
