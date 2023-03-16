import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const { user, token } = useContext(AuthContext);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return [user, token, config];
};

export default useAuth;