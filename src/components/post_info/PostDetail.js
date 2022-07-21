 /* eslint-disable */
import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Loading from "../Loading";
import NotFound from "../NotFound";
import DisplayPost from "./DisplayPost";
import "../../style/postinfo.css";
import {DataContext} from "../../context/GlobalContext"
import useAuth from "../../hooks/useAuth";
const PostDetail = () => {
  const {socket} = useContext(DataContext);
  const { id } = useParams();
  const {auth} = useAuth();
  const [post, setPost] = useState("");
  document.title = post[0]?.title
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const getPost = async () => {
      const response = await axios.get(`p/post/${id}`);
      isMounted && setPost(response.data);
      // console.log(response.data);   
      setLoading(false);
    };
    getPost();
    return () => (isMounted = false);
  }, [id,loading]);
  useEffect(()=>{
    if(socket){
      socket.emit("joinRoom",id)
    }
  },[socket,id])
  if(loading) return <Loading/>
  if (!post[0] ||post[0].post_status===0 && auth?.user?.role !=='admin'&& auth?.user?.id !== post[0].userId) return <NotFound />;
  return (
    <div className="container padding  ">
      <div className="row clearfix detailbv " >
        <div className="ccol-lg-8 col-md-12 left-box">
          <DisplayPost post={post} id ={id} socket={socket}/>
        </div>
        <div className="col-lg-4 col-md-12 right-box">
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
