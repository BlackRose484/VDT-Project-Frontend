import { createContext, useState } from "react";
import { getJWTFromLocalStorage, getRoleFromLocalStorage } from "../utils/auth";
interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getJWTFromLocalStorage()),
  setIsAuthenticated: () => null,
  isAdmin: Boolean(getRoleFromLocalStorage() == "Admin"),
  setIsAdmin: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );

  const [isAdmin, setIsAdmin] = useState<boolean>(initialAppContext.isAdmin);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        isAdmin,
        setIsAdmin: setIsAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
