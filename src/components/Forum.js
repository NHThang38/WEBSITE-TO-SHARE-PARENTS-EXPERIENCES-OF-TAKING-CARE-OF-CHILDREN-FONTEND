 /* eslint-disable */
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../style/forum.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import moment from "moment";
const Forum = () => {
    document.title = "diễn đàn";
    const [categories, setCategories] = useState([]);
    const [baiNB, setBaiNB] = useState([]);
    const [category, setCategory] = useState("all");
    const { like, setLike } = useAuth();
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("like");
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState("");
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    const [duyet, setDuyet] = useState(1);
    const isActive = (index) => {
        if (index === pageNumber) return "active";
        return "";
    };
    useEffect(() => {
        let isMounted = true;
        const getCategories = async () => {
            const response = await axios.get("/category");
            isMounted && setCategories(response.data.categories);
        };
        getCategories();
        return () => (isMounted = false);
    }, []);
    useEffect(() => {
        let isMounted = true;

        const getTreding = async () => {
            const response = await axios.get("/p/treding");
            isMounted && setBaiNB(response.data);
            isMounted && setLike(false);
        };
        getTreding();
        return () => (isMounted = false);
    }, [like]);
    const handelChangeInput = (e) => {
        const category = e.target.value;
        setCategory(category);
    };

    useEffect(() => {
        let isMounted = true;
        const getPosts = async () => {
            try {
                let response = "";
                if (category === "all") {
                    response = await axios.get(`/p/posts/?page=${pageNumber}`);
                    isMounted && setPosts(response.data.content);
                } else {
                    response = await axios.get(
                        `/p/${category}/?role=parent&page=${pageNumber}`
                    );
                    isMounted && setPosts(response.data.content);
                }

                isMounted && setNumberOfPages(response.data.totalPages);
                isMounted && setLike(false);
            } catch (error) {
                setCategory("all");
            }
        };
        getPosts();
        return () => (isMounted = false);
    }, [category, pageNumber, like]);
    const handleChangeSort = (e) => {
        const sort = e.target.value;
        setSort(sort);
    };
    // const handleSort = () => {
    //     console.log(sort);
    //     if (sort === "like") {
    //         posts.sort((a, b) => {
    //             return -a.totalComment + b.totalComment;
    //         });
    //     }
    //     if (sort === "comment") {
    //         posts.sort((a, b) => {
    //             return -a.totalLikes + b.totalLikes;
    //         });
    //     }
    // };

    const handleSort = (value) => {

        setDuyet(value);
        if (value == 3) {
            posts.sort((a, b) => {
                return -a.totalComment + b.totalComment;
            });
     
        } else if (value == 2) {
            posts.sort((a, b) => {
                return -a.totalLikes + b.totalLikes;
            });
        } else  {
            posts.sort((a, b) => {
                return -a.id + b.id;
            });
        }
    };
    
    const gotoPrevios = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };
    const goNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };
    return (
        <div className="container">
            <h3 className="mt-3">Diễn Đàn</h3>
            <div className="row">
                <div className="col-lg-9 mb-3 pt-4 left_content" >
                    <div className="row text-left mb-5">
                        <div className="col-lg-6 mb-3 mb-sm-0" >
                            <div
                                className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
                                style={{ width: "100%" }}
                            >
                                <select
                                    className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
                                    data-toggle="select"
                                    tabIndex="-98"
                                    onChange={handelChangeInput}
                                >
                                    <option value="all"> Tất cả </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.path}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                        <div
                    className="form_check_all d-flex "
              
                >
                    <h5>Lọc theo </h5>
                    <div className="form-check ml-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="baiviets"
                            id="flexRadioDefault1"
                            onClick={() => handleSort(1)}
                            defaultChecked={duyet === 1}
                        />

                        <label className="form-check-label">Tất cả</label>
                    </div>
                    <div className="form-check ml-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="baiviets"
                            id="flexRadioDefault1"
                            onClick={() => handleSort(2)}
                            defaultChecked={duyet === 2}
                        />

                        <label className="form-check-label">
                        Lượt thích
                        </label>
                    </div>
                    <div className="form-checkm ml-4">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="baiviets"
                            id="flexRadioDefault1"
                            onClick={() => handleSort(3)}
                            defaultChecked={duyet === 3}
                        />

                        <label className="form-check-label">
                        Lượt bình luận
                        </label>
                    </div>
                </div>
                            {/* <div
                                className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
                                style={{ width: "100%" }}
                            >
                                <select
                                    className="form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
                                    data-toggle="select"
                                    tabIndex="-98"
                                    onChange={handleChangeSort}
                                    onClick={() => handleSort()}
                                >
                                    <option> Sắp xếp theo </option>
                                    <option value="like"> Lượt thích </option>
                                    <option value="comment">
                                        {" "}
                                        Lượt bình luật{" "}
                                    </option>
                                </select>
                            </div> */}
                        </div>
                    </div>
                    {posts.length === 0 ? (
                        <p>Danh mục không có bài viết</p>
                    ) : (
                        <div className="card row-hover pos-relative py-2 px-3 mb-2" >
                            {posts.map((post, index) => (
                                <div
                                    className="row align-items-center content_Post"
                              
                                    key={index}
                                >
                                    <div className="col-md-8 mb-3 mb-sm-0" >
                                        <h5>
                                            <Link
                                                to={`/post/${post.id}`}
                                                className="text-primary"
                                            >
                                                {post.title}
                                            </Link>
                                        </h5>
                                        <span className="text-sm">
                                            <div className="text-black">
                                                {moment(
                                                    post.createdAt
                                                ).fromNow()}
                                            </div>
                                            <span className="op-6 mr-1">
                                                Người viết:
                                            </span>
                                            <Link
                                                to={`/profile/${post.user.id}`}
                                                className="text-black"
                                            >
                                                {post.user.username}
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="col-md-4 op-7">
                                        <div className="row text-center op-7">
                                            <div className="col px-1">
                                                <i className="fas fa-heart text-danger "></i>
                                                <span className="d-block text-sm">
                                                    {post.totalLikes} Lượt Thích
                                                </span>
                                            </div>
                                            <div className="col px-1">
                                                <i className="fas fa-comment text-info"></i>
                                                <span className="d-block text-sm">
                                                    {post.totalComment} Bình
                                                    luận
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <nav aria-label="Page navigation ">
                        <ul className="pagination">
                            <li className="page-item" onClick={gotoPrevios}>
                                <span
                                    className="page-link"
                                    aria-label="Previous"
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </span>
                            </li>
                            {pages.map((pageIndex) => (
                                <li
                                    className={`page-item ${isActive(
                                        pageIndex
                                    )}`}
                                    key={pageIndex}
                                    onClick={() => setPageNumber(pageIndex)}
                                >
                                    <span className="page-link">
                                        {pageIndex + 1}
                                    </span>
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
                <div className="col-lg-3 mb-4 mb-lg-0 px-lg-0 mt-lg-0   ">
                   
                    <div
                        data-settings='{"parent":"#content","mind":"#header","top":10,"breakpoint":992}'
                        data-toggle="sticky"
                        className="sticky"
                        style={{ top: "85px" }}
                    >
                        <div className="sticky-inner ">
                            <div className="bg-white pl-3 ml-2 mb-3 ">
                                <h4 className="px-3 py-2 op-5 m-0">
                                    Bài viết nổi bật
                                </h4>
                                <hr className="m-0" />
                                {baiNB.slice(0, 5).map((bainb, index) => (
                                    <div
                                    style={{border:"1px solid #636e72"}}
                                    // style={{background:"#e5caed4f", margin:"10px"}}
                                        className="hi pos-relative px-3 py-3 "
                                        key={index}
                                    >
                                        <h6 className="text-primary text-sm">
                                            <Link
                                                to={`/post/${bainb.post_id}`}
                                                className="text-primary"
                                            >
                                                {bainb.post_title}
                                            </Link>
                                        </h6>
                                        <span className="mb-0 text-sm">
                                            <span className="text-black">
                                                {moment(
                                                    bainb.post_createdAt
                                                ).fromNow()}
                                            </span>
                                            <span className="op-6">
                                                {" "}
                                                Người viết
                                            </span>{" "}
                                            <Link
                                                className="text-danger"
                                                to={`/profile/${bainb.user_id}`}
                                            >
                                                {bainb.user_fullName}
                                            </Link>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
