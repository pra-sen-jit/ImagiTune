import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthService } from "../services/authService";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  fullName?: string;
  contact?: string;
  dob?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true);
      const storedToken = localStorage.getItem("authToken");
      
      if (storedToken) {
        try {
          const userData = await AuthService.getProfile();
          setToken(storedToken);
          setUser(userData);
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false);
    };
    
    verifyToken();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const userData = await AuthService.getProfile();
        login(storedToken, userData);
      } catch (error) {
        logout();
      }
    }
    setIsLoading(false);
  };

  const login = (newToken: string, userData: User) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    AuthService.logout();
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
