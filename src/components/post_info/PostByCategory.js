 /* eslint-disable */
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import axios from "../../api/axios";
import PostCard from "../card/PostCard";
import useAuth from "../../hooks/useAuth";
import "../../style/postbycate.css";
const PostByCategory = () => {

  const { categoryName } = useParams();
  const [cName, setCName] = useState("");
  document.title =cName
  const {like,setLike} = useAuth();
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState("");
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const isActive = (index) => {
    if(index === pageNumber) return "active";
    return ""
  }

  useEffect(() => {
    let isMounted = true;
    const getPostsByCategory = async () => {
      const response = await axios.get(
        `/p/${categoryName}/?role=doctor&page=${pageNumber}`
      );
      isMounted && setPosts(response.data.content);
      isMounted && setNumberOfPages(response.data.totalPages);
      isMounted && setCName(response.data.content[0].category.name);
      isMounted && setLike(false);
    };
    getPostsByCategory();
    return () => (isMounted = false);
  }, [categoryName,pageNumber,like]);
  const gotoPrevios =() =>{
    setPageNumber(Math.max(0,pageNumber-1));
  }
  const goNext =() =>{
    setPageNumber(Math.min(numberOfPages-1,pageNumber +1));
  }
  if (!posts) {
    return <Loading />;
  }
  return (
    <div className="container padding posts_category pt-3">
      <h2 style={{color:"#0984e3", marginBottom:"20px"}}>{cName}</h2>

      <div className="show_posts ">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <nav aria-label="Page navigation ">
        <ul className="pagination">
          <li className="page-item" onClick={gotoPrevios}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
          {
            pages.map((pageIndex)=>(
              <li className={`page-item ${isActive(pageIndex)}`} key={pageIndex} onClick={()=>setPageNumber(pageIndex)}>
            <span className="page-link">
              {pageIndex+1}
            </span>
          </li>
            ))
          }
          
          <li className="page-item" onClick={goNext}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PostByCategory;
