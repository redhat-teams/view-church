import { createContext, useContext } from "react";
const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);
export default function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
