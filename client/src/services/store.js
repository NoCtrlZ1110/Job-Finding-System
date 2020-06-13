/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";

export const AuthContext = React.createContext(null);

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export const AuthProvider = ({ children }) => {
  // khởi tạo
  const [user, setUser] = useStateWithLocalStorage("user");
  const [role, setRole] = useStateWithLocalStorage("role");
  const [isLogged, setLogged] = useStateWithLocalStorage("isLogged");

  const value = useMemo(
    () => ({
      User: [user, setUser],
      IsLogged: [isLogged, setLogged],
      Role: [role, setRole],
    }),
    [user, isLogged]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
