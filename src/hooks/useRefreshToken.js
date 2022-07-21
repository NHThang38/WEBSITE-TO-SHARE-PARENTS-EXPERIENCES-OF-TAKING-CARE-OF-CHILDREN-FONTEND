import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  
  const refesh = async () => {
    const response = await axios.get("auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { 
        ...prev,
        user: response.data.user[0], 
        acessToken: response.data.acessToken };
    });
    return response.data.acessToken;
  };
  return refesh;
};

export default useRefreshToken;
