 /* eslint-disable */
import { React, useState, useEffect } from "react";
import "../../style/statisticalAdmin.css";
import Sidebar from "../admin/Sidebar";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Statistical = () => {
    document.title = "Thống kê";
    const axiosPrivate = useAxiosPrivate();
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [duyet, setDuyet] = useState(1);
    const [countUser, setCountUser] = useState();
    const [countPost, setCountPost] = useState(0);
    const [countCMT, setCountCMT] = useState(0);
    const [countLike, setCountLike] = useState(0);
    let tatcaBaiViet = [];
    let posts = [];
    const [baiNB, setBaiNB] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const getUsers = async () => {
            const respone = await axiosPrivate.get("/user");
            isMounted && setUsers(respone.data.users);
            isMounted && setCountUser(respone.data.users.length);
        //    console.log(respone.data.users);
        };
        getUsers();
        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const getPosts = async () => {
            const response = await axiosPrivate.get("/p/");

            for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].posts);

                tatcaBaiViet.push(response.data[i].posts);
            }
            let countL = 0;
            let countP = 0;
            for (let i = 0; i < tatcaBaiViet.length; i++) {
                for (let j = 0; j < tatcaBaiViet[i].length; j++) {
                   
                    countL += tatcaBaiViet[i][j].totalLikes;
                    countP++;
                }
            }

            isMounted && setCountPost(countP);
            isMounted && setCountLike(countL);
        };
        getPosts();
    });
    useEffect(() => {
        let isMounted = true;
        const getCmts = async () => {
            const response = await axiosPrivate.get("/comments");
            // console.log(response.data.length);
            isMounted && setCountCMT(response.data.length);
        };
        getCmts();
    });

    useEffect(() => {
        let isMounted = true;
        const getTreding = async () => {
            const response = await axiosPrivate.get("/p/treding");
            isMounted && setBaiNB(response.data);
        };
        getTreding();
    }, []);

    
    const handleSort = (value) => {
        //   console.log(baiNB)
        setDuyet(value);
        if (value === 2) {
            baiNB.sort((a, b) => {
                return -a.post_comment + b.post_comment;
            });
        } else if (value === 1) {
            baiNB.sort((a, b) => {
                return -a.post_vote + b.post_vote;
            });
        } else {
            users.sort((a, b) => {
                return -a.total_post + b.total_post;
            })

        }
    };

    return (
        <div className="d-flex">
            <Sidebar className="w-20" style={{ overflow: "none" }}></Sidebar>

            <div className="w-80 mt-4 ml-5">
                <h2
                    style={{
                        color: "#0984e3",
                        fontSize: "30px",
                        fontWeight: "600",
                    }}
                >
                    Thống kê
                </h2>
                <div className="cards">
                    <div className="card">
                        <div className="card-content">
                            <div className="number">{countUser}</div>
                            <div className="card-name">Tổng số người dùng</div>
                        </div>
                        <div className="icon-box">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="number">{countPost}</div>
                            <div className="card-name">Tổng số bài viết</div>
                        </div>
                        <div className="icon-box">
                            <i className="fab fa-leanpub"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <div className="number">{countCMT}</div>
                            <div className="card-name">
                                Tổng số bình luận bài viết
                            </div>
                        </div>
                        <div className="icon-box">
                            <i className="fa fa-comments"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="number">{countLike}</div>
                            <div className="card-name">
                                Tổng số lượt thích bài viết
                            </div>
                        </div>
                        <div className="icon-box">
                            <i className="fa fa-comments"></i>
                        </div>
                    </div>
                </div>
                <h4>Bảng thống kê bài viết</h4>
                <div
                    className="form_check_all d-flex my-2"
                    style={{ paddingLeft: "150px" }}
                >
                    <h5>Lựa chọn thống kê bài viết theo: </h5>
                    <div className="form-check ml-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="baiviets"
                            id="flexRadioDefault1"
                            onClick={() => handleSort(1)}
                            defaultChecked={duyet === 1}
                        />

                        <label className="form-check-label">Lượt thích</label>
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
                            Lượt bình luận
                        </label>
                    </div>
                    <div className="form-check ml-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="baiviets"
                            id="flexRadioDefault1"
                            onClick={() => handleSort(3)}
                            defaultChecked={duyet === 3}
                        />

                        <label className="form-check-label">
                            Người dùng có nhiều bài viết
                        </label>
                    </div>
                </div>

                <div className="statistical_list">
                    <table className="table_group  ">
                        {duyet == 3 ? (
                            <>
                                <thead style={{ backgroundColor: "#3498db" }}>
                                    <tr>
                                        <td style={{ color: "red" }}>ID</td>
                                        <td>Người đăng</td>
                                        <td>Hình ảnh</td>
                                        <td>Số lượng bài viết</td>
                                        <td>Ngày tham gia</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.slice(0,10).map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td> 
                                                <Link
                                                    to={`/profile/${user.id}`}
                                                    className="card-title"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                  { user.fullName}
                                                   
                                                </Link>
                                            </td>
                                            <td>
                                                        <img
                                                            src={user.avatar}
                                                            alt=""
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                       
                                                            }}
                                                        />
                                                    </td>

                                            <td>{user.total_post}</td>
                        
                                            <td>
                                                {new Date(
                                                    user.createAt
                                                ).toLocaleString([], {
                                                    day: "numeric",
                                                    month: "numeric",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        ) : (
                            <>
                                <thead style={{ backgroundColor: "#3498db" }}>
                                    <tr>
                                        <td style={{ color: "red" }}>ID</td>
                                        <td>Tiêu Đề</td>
                                        <td>Mô tả</td>
                                        <td>Hình ảnh</td>
                                        <td>Người đăng</td>
                                        <td>Số lượt thích</td>
                                        <td>Bình luận</td>
                                        <td>Ngày đăng</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {baiNB.map((bainb, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link
                                                    to={`/post/${bainb.post_id}`}
                                                    className="card-title"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {bainb.post_title.slice(
                                                        0,
                                                        40
                                                    )}
                                                </Link>
                                            </td>

                                            <td>
                                                {bainb.post_description.slice(
                                                    0,
                                                    30
                                                )}
                                            </td>

                                            <td>
                                                {typeof bainb.post_thumbnail ===
                                                    "string" && (
                                                    <img
                                                        src={
                                                            bainb.post_thumbnail
                                                        }
                                                        width="50px"
                                                        height="50px"
                                                    />
                                                )}
                                            </td>
                                            <td>{bainb.user_fullName}</td>
                                            <td>{bainb.post_vote}</td>
                                            <td>{bainb.post_comment}</td>
                                            <td>
                                                {new Date(
                                                    bainb.post_createdAt
                                                ).toLocaleString([], {
                                                    day: "numeric",
                                                    month: "numeric",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Statistical;
