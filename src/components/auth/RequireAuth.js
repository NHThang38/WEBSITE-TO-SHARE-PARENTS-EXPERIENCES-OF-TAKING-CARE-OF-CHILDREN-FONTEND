import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "./Login";
const RequireAuth = () => {
  const {auth} = useAuth();
  return(
  <>
   {auth?.acessToken 
   ? <Outlet  />
   :<Login />
  }
  </>
  )
};

export default RequireAuth;
