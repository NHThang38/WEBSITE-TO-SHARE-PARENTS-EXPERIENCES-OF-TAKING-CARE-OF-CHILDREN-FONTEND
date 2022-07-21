 /* eslint-disable */
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import Home from "../Home"
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    let isMounted = true;
    const verifyRefresToken = async () => {
      try {
        await refresh();
      } catch (err) {
       console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.acessToken ? verifyRefresToken() : setIsLoading(false);
    return () => isMounted = false;
  }, []);
  return <div>{isLoading ? <Home/> : <Outlet />}</div>;
};

export default PersistLogin;
