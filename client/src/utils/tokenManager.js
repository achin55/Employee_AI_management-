export const tokenManager = {
  getToken: () => localStorage.getItem('token'),

  setToken: (token) => localStorage.setItem('token', token),

  removeToken: () => localStorage.removeItem('token'),

  isTokenValid: () => {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),

  removeUser: () => localStorage.removeItem('user'),

  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
