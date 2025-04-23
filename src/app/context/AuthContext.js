"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (email, name, phone) => {
    try {
      // Check if user already exists
      const existingUsers = Cookies.get("registeredUsers");
      if (existingUsers) {
        const users = JSON.parse(existingUsers);
        const userExists = users.some(user => user.email === email);
        if (userExists) {
          toast.error("You're already registered!");
          return false;
        }
      }

      const userData = { email, name, phone };
      Cookies.set("tempUser", JSON.stringify(userData));

      const newRegisteredUsers = existingUsers
        ? [...JSON.parse(existingUsers), userData]
        : [userData];
      Cookies.set("registeredUsers", JSON.stringify(newRegisteredUsers), { expires: 30 }); // Store for 30 days

      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
      return false;
    }
  };

  const login = async (email) => {
    try {
      // Check if user exists in registered users
      const existingUsers = Cookies.get("registeredUsers");
      if (!existingUsers) {
        toast.error("Please register first");
        return false;
      }

      const users = JSON.parse(existingUsers);
      const userExists = users.some(user => user.email === email);

      if (!userExists) {
        toast.error("Please register first");
        return false;
      }

      Cookies.set("tempEmail", email);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed");
      return false;
    }
  };

  const verifyOtp = (otp) => {
    if (otp !== "1234") {
      toast.error("Invalid OTP");
      return false;
    }

    //Registration flow
    const tempUser = Cookies.get("tempUser");
    if (tempUser) {
      const userData = JSON.parse(tempUser);
      Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
      Cookies.remove("tempUser");
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Registration successful!");
      return true;
    }

    // Login flow
    const tempEmail = Cookies.get("tempEmail");
    if (tempEmail) {
      const existingUsers = Cookies.get("registeredUsers");
      if (existingUsers) {
        const users = JSON.parse(existingUsers);
        const userData = users.find(user => user.email === tempEmail);
        if (userData) {
          Cookies.set("user", JSON.stringify(userData), { expires: 7 });
          Cookies.remove("tempEmail");
          setUser(userData);
          setIsAuthenticated(true);
          toast.success("Login successful!");
          return true;
        }
      }
    }

    toast.error("Verification failed");
    return false;
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("tempUser");
    Cookies.remove("tempEmail");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);