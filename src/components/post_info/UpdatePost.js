import React from "react";
import { useParams } from "react-router-dom";
import CreatePost from "../CreatePost";
const UpdatePost = () => {
  document.title = "Cập nhập bài viết"
  const {id} = useParams();
  
  return <div>
    <CreatePost id={id}/>
  </div>;
};
export default UpdatePost;
