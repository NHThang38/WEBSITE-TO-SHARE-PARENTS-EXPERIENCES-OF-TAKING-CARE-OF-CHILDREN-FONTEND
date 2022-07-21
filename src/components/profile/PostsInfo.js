 /* eslint-disable */
import React, { useEffect, useState } from "react";
import NotFound from "../NotFound";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import PostCard from "../card/PostCard";
import "../../style/userpost.css"
const PostsInfo = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState("");
  const [approve,setApprove] =useState(1);
  const [load,setLoad] = useState(false);
  const { auth,like,setLike } = useAuth();
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const isActive = (index) => {
    if (index === pageNumber) return "active";
    return "";
  };
  const isActiveTab = (tab) => {
    if (tab === approve) return "active";
    return "";
  };
  useEffect(() => {
    let isMounted = true;
    const getPostsByUserId = async () => {
      const response = await axios.get(`/p/u/${id}/?page=${pageNumber}&status=${approve}`);
      isMounted && setPosts(response.data.content);
      isMounted && setNumberOfPages(response.data.totalPages);
      setLoad(false);
      setLike(false)
    };
    getPostsByUserId();
    return () => (isMounted = false);
  }, [id, pageNumber,approve,load,like]);
  useEffect(() => {
    let isMounted = true;
    const getPostByStatus = async () => {
      const response = await axios.get(`/p/u/${id}/?status=${approve}`);
      isMounted && setPosts(response.data.content);
      isMounted && setNumberOfPages(response.data.totalPages);
      setLoad(false)
      setLike(false)
    };
    getPostByStatus();
    return () => (isMounted = false);
  }, [id,approve,load,like]);
  const gotoPrevios = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const goNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  if (!posts) {
    return <NotFound />;
  }
  return (
    <div className="user_post" style={{margin: "0", padding:"0"}}>
      <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation" onClick={()=>setApprove(1)} style={{cursor:"default"}}>
          <span
            className={`nav-link ${isActiveTab(1)}`}
            id="ex1-tab-1"
            data-mdb-toggle="tab"
            href="#ex1-tabs-1"
            role="tab"
            aria-controls="ex1-tabs-1"
            aria-selected={`${isActiveTab(1)}`}
          >
            Bài viết 
          </span>
        </li>
        {auth?.user?.id == id 
         && (
            <li className="nav-item" role="presentation" onClick={()=>setApprove(0)} style={{cursor:"default"}}>
              <span
                className={`nav-link ${isActiveTab(0)}`}
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-2"
              >
                Bài viết chưa duyệt
              </span>
            </li>
          )}
      </ul>

      <div className="tab-content" id="ex1-content">
        <div
          className="tab-pane fade show active"
          id="ex1-tabs-1"
          role="tabpanel"
          aria-labelledby="ex1-tab-1"
        >
          {posts.map(
            (post) =>
             <PostCard key={post.id} post={post} setLoad={setLoad}/>
          )}
          <nav aria-label="Page navigation ">
            <ul className="pagination">
              <li className="page-item" onClick={gotoPrevios}>
                <span className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </span>
              </li>
              {pages.map((pageIndex) => (
                <li
                  className={`page-item ${isActive(pageIndex)}`}
                  key={pageIndex}
                  onClick={() => setPageNumber(pageIndex)}
                >
                  <span className="page-link">{pageIndex + 1}</span>
                </li>
              ))}

              <li className="page-item" onClick={goNext}>
                <span className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className="tab-pane fade"
          id="ex1-tabs-2"
          role="tabpanel"
          aria-labelledby="ex1-tab-2"
          style={{width:"100%"}}
        >
          {posts.map(
            (post) =>
              post.status === 0 && <PostCard key={post.id} post={post} setLoad={setLoad} />
          )}
          <nav aria-label="Page navigation ">
            <ul className="pagination">
              <li className="page-item" onClick={gotoPrevios}>
                <span className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </span>
              </li>
              {pages.map((pageIndex) => (
                <li
                  className={`page-item ${isActive(pageIndex)}`}
                  key={pageIndex}
                  onClick={() => setPageNumber(pageIndex)}
                >
                  <span className="page-link">{pageIndex + 1}</span>
                </li>
              ))}

              <li className="page-item" onClick={goNext}>
                <span className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PostsInfo;
