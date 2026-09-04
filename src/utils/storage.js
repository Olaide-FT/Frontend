const TOKEN_KEY = "nestora_token";
const USER_KEY = "nestora_user";
const LEGACY_TOKEN_KEY = "Nestora_token";
const LEGACY_USER_KEY = "Nestora_user";

const getSessionStore = () => window.sessionStorage;

const readItem = (key) => {
  try {
    return getSessionStore().getItem(key);
  } catch {
    return null;
  }
};

const writeItem = (key, value) => {
  try {
    getSessionStore().setItem(key, value);
  } catch {}
};

const removeItem = (key) => {
  try {
    getSessionStore().removeItem(key);
  } catch {}
  try {
    localStorage.removeItem(key);
  } catch {}
};

export const storage = {
  getToken: () => {
    // prefer sessionStorage but fall back to localStorage when needed
    let token = readItem(TOKEN_KEY);
    if (!token) {
      try {
        token = localStorage.getItem(TOKEN_KEY);
      } catch {}
    }
    if (!token) {
      token = readItem(LEGACY_TOKEN_KEY);
      if (!token) {
        try {
          token = localStorage.getItem(LEGACY_TOKEN_KEY);
        } catch {}
      }
      if (token) storage.setToken(token);
    }
    return token || null;
  },
  setToken: (token) => {
    writeItem(TOKEN_KEY, token);
    try { localStorage.setItem(TOKEN_KEY, token); } catch {}
  },

  removeToken: () => removeItem(TOKEN_KEY),
  getUser: () => {
    // prefer sessionStorage but fall back to localStorage when sessionStorage is cleared
    let userStr = readItem(USER_KEY) || (() => { try { return localStorage.getItem(USER_KEY); } catch { return null; } })();
    if (!userStr) {
      userStr = readItem(LEGACY_USER_KEY) || (() => {
        try { return localStorage.getItem(LEGACY_USER_KEY); } catch { return null; }
      })();
      if (userStr) {
        try {
          const parsedUser = JSON.parse(userStr);
          storage.setUser(parsedUser);
        } catch {}
      }
    }
    if (!userStr) return null;
    try { return JSON.parse(userStr); } catch { return null; }
  },
  setUser: (user) => {
    const str = JSON.stringify(user);
    // primary: sessionStorage
    writeItem(USER_KEY, str);
    // also persist to localStorage as a fallback so edits survive reload/login flows
    try { localStorage.setItem(USER_KEY, str); } catch (e) {}
  },
  removeUser: () => removeItem(USER_KEY),
  clear: () => {
    removeItem(TOKEN_KEY);
    removeItem(USER_KEY);
  },
};
