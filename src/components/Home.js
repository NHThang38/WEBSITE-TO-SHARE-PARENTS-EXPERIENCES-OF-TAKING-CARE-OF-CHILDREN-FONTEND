 /* eslint-disable */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import PostCard from "./card/PostCard";
import "../style/home.css";
import { Link as Link1 } from "react-scroll";

import Scrollspy from "react-scrollspy";
const Home = () => {
    document.title = "Trang chủ";
    const [homePosts, setHomePosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { like, setLike } = useAuth();
    const [baiNB, setBaiNB] = useState([]);
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const closeMenu = () => setClick(false);
    useEffect(() => {
        let isMounted = true;

        const getPosts = async () => {
            const response = await axiosPrivate.get("/p/doctor/");
            isMounted && setHomePosts(response.data);
            isMounted && setLike(false);
            setLoading(false);
        };
        getPosts();
        return () => (isMounted = false);
    }, [like, loading]);

    useEffect(() => {
        let isMounted = true;

        const getTreding = async () => {
            const response = await axiosPrivate.get("/p/treding");
            isMounted && setBaiNB(response.data);
            isMounted && setLike(false);
        };
        getTreding();
        return () => (isMounted = false);
    }, [like]);

    return (
        <div className="container padding wraap ">

            <nav id="thanhdh"   style={{background:"#fff"}} >   {/* //hsla(204, 50%, 89%, 0.9) */}
                <ul className="nav nav-pills px-5 ul-thanhdh" >
                    {homePosts.map((homePost, index) => (
                        <li key={index} className="nav-item px-2" style={{fontSize:"20px", color:"#2f3542", marginRight:"20px", cursor:"pointer"}} >
                            <Link1
                                to={`${index}`}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={100}
                                onClick={closeMenu}
                            
                            >
                                {" "}
                                {homePost.category_name}
                            </Link1>
                
                        </li>
                    ))}
                </ul>
            </nav>
     


            <div className="home_page row mx-0 pt-2 ">
                <div className="col-md-8 animate-box fadeInLeft animated-fast mt-3">
                    {homePosts.map((homePost, index) => (
                        <div
                            data-bs-spy="scroll"
                            data-bs-target="#navbar-example2"
                            data-bs-offset="0"
                            className="scrollspy-example"
                            tabIndex={0}
                            key={homePost.category_id}
                            style={{ paddingTop: "30px" }}
                            id={`${index}`}
                        >
                            {homePost.count > 0 && (
                                <>
                                    <h4>
                                        <Link
                                            to={`/p/${homePost.category_path}`}
                                        >
                                            {homePost.category_name}
                                        </Link>
                                    </h4>
                                    <hr className="mt-1" />
                                    {/* style={{overflowY:"scroll", height:"298px"}} */}
                                    <div className="home_posts">
                                        {homePost.posts
                                            .slice(0, 3)
                                            .map((post) => (
                                                <PostCard
                                                    key={post.id}
                                                    post={post}
                                                    setLoading={setLoading}
                                                />
                                            ))}
                                    </div>
                                    <hr className="mt-2" />
                                </>
                            )}
                            {homePost.count > 2 && (
                                <Link
                                    className="more"
                                    to={`/p/${homePost.category_path}`}
                                >
                                    Xem thêm &gt;&gt;
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <div className="col-md-4 mt-5">
                    <>
                        <h4 className="mt-2 ml-4">Bài viết nổi bật</h4>

                        <ul className="list-group" style={{ margin: "0 14px" }}>
                            {baiNB.map((bainb, index) => (
                                <a href={`post/${bainb.post_id}`} key={index}>
                                    <li className="list-group-item">
                                        <i className="fa fa-arrow-circle-right"></i>{" "}
                                        {bainb.post_title}
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </>
                </div>
            </div>
        </div>
    );
};
export default Home;
