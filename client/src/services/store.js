import React, { useState, useMemo } from "react";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  // khởi tạo
  const [user, setUser] = useState(null);
  const [isLogged, setLogged] = useState(null);

  const value = useMemo(
    () => ({ User: [user, setUser], IsLogged: [isLogged, setLogged] }),
    [user, isLogged]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
