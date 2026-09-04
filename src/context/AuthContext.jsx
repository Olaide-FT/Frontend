import {
  createContext, useContext, useEffect, useState,
} from "react";
import {
  loginUser,
  getCurrentUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import { storage } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getUser());
  const [token, setToken] = useState(() => storage.getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = storage.getToken();
      if (!storedToken) { setLoading(false); return; }
      setToken(storedToken);
      try {
        const data = await getCurrentUser();
        const currentUser = data?.user || data?.data || data;
        if (!currentUser) throw new Error("The profile response did not include a user.");
        setUser(currentUser);
        storage.setUser(currentUser);
      } catch (error) {
        // Only discard the session when the server explicitly rejects it.
        // Temporary network/API failures should not log the user out on refresh.
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          storage.clear();
          setUser(null);
          setToken(null);
        }
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    const handleLogout = () => { setUser(null); setToken(null); };
    window.addEventListener("nestora:logout", handleLogout);
    return () => window.removeEventListener("nestora:logout", handleLogout);
  }, []);

  const register = async (payload) => {
    const data = await registerUser(payload);
    return data;
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    const newToken = data?.token;
    let newUser = data?.user || null;

    if (!newToken) throw new Error("No authentication token was returned.");


    storage.setToken(newToken);
    setToken(newToken);

    // If the login response included a user but it's missing phone, fetch the full profile.
    if (newUser && !newUser.phone) {
      try {
        const profileResponse = await getCurrentUser();
        const prof = profileResponse?.user || profileResponse?.data || null;
        if (prof) newUser = prof;
      } catch {
       console.log(error)
      }
    }

    if (!newUser) {
      try {
        const profileResponse = await getCurrentUser();
        newUser = profileResponse?.user || profileResponse?.data || null;
      } catch {
        newUser = null;
      }
    }

    if (newUser) storage.setUser(newUser);
    setUser(newUser);
    return data;
  };

  const logout = async () => {
    try { await logoutUser(); }
    finally {
      storage.clear();
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      isAuthenticated: Boolean(token && user),
      setUser,
      register, login, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
