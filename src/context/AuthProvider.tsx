import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  rootFolder: number | null;
  setRootFolder: (rootFolder: number | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [rootFolder, setRootFolder] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRootFolder = localStorage.getItem("rootFolder");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRootFolder) {
      setRootFolder(parseInt(storedRootFolder, 10));
    }
  }, []);

  const value = {
    token,
    setToken: (newToken: string | null) => {
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
      setToken(newToken);
    },
    rootFolder,
    setRootFolder: (newRootFolder: number | null) => {
      if (newRootFolder !== null) {
        localStorage.setItem("rootFolder", newRootFolder.toString());
      } else {
        localStorage.removeItem("rootFolder");
      }
      setRootFolder(newRootFolder);
    },
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
