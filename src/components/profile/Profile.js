 /* eslint-disable */
import React from "react";
import UserProfile from "./UserInfor";
import OtherProfile from "./OtherInfor";
import PostsInfo from "./PostsInfo";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Profile = () => {
  document.title ="Trang cá nhân"
  const { id } = useParams();
  const {auth} = useAuth();
  return( 
   
    <div className="d-flex ">
    <div className="w-40" style={{width:"30%"}}>
      {auth?.user?.id ==id
        ?<UserProfile/>
        :<OtherProfile id ={id}/>
      }
    </div>

      <PostsInfo id ={id} style={{width:"70%"}}/>


    </div>

  );
};

export default Profile;
