import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getAccessToken, setAccessToken } from "@/utils/utils";

interface AuthContextType {
  user: JwtPayload | null;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeModal: () => void;
  login: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUser(decodedToken);
    }
  }, []);

  const openAuthModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const login = (token: string) => {
    console.log("asdf", token);
    const decodedToken = jwtDecode<JwtPayload>(token);
    setUser(decodedToken);
    setAccessToken(token);
    closeModal();
  };

  return (
    <AuthContext.Provider
      value={{ user, isModalOpen, openAuthModal, closeModal, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
