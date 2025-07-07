// src/services/authService.ts
import api from "./api";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
  _id: string;
}

export const AuthService = {
  async signup(userData: UserData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/signup", userData);
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        "Signup failed";
      console.error("Signup error:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", loginData);
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        "Login failed";
      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await api.get<User>("/auth/profile");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profile";
      console.error("Profile fetch error:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  logout(): void {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      // Optional: Add API call to invalidate token on server if needed
      // await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  // Optional: Token refresh functionality
  async refreshToken(): Promise<{ token: string }> {
    try {
      const response = await api.post<{ token: string }>("/auth/refresh-token");
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error: any) {
      this.logout();
      const errorMessage =
        error.response?.data?.message || "Session expired. Please login again.";
      throw new Error(errorMessage);
    }
  },

  async updateProfile(profileData: { fullName?: string; contact?: string; dob?: string; avatar?: File | null }): Promise<User> {
    try {
      const formData = new FormData();
      if (profileData.fullName) formData.append('fullName', profileData.fullName);
      if (profileData.contact) formData.append('contact', profileData.contact);
      if (profileData.dob) formData.append('dob', profileData.dob);
      if (profileData.avatar) formData.append('avatar', profileData.avatar);
      const response = await api.put<User>("/auth/profile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Profile update failed";
      throw new Error(errorMessage);
    }
  },
};
