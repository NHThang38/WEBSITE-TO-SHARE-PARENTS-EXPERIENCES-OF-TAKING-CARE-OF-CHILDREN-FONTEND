/* eslint-disable */ 
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/Navbar.css";
import axios from "../api/axios";
import useLogout from "../hooks/useLogout";
import { useEffect, useState, useContext } from "react";
import SearchBar from "./SearchBar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { DataContext } from "../context/GlobalContext";
const Navbar = () => {
    const { auth, setAuth, loading } = useAuth();
    const { socket,isReaded, setIsReaded } = useContext(DataContext);
    const [notification, setNotification] = useState([]);
    const logout = useLogout();
    const axiosPrivate = useAxiosPrivate();
    const [baiDD, setBaiDD] = useState([]);
    const [users, setUsers] = useState([]);
    let tatcaBaiViet = [];
    let baiVietDaDuyet = [];

    useEffect(() => {
        const refesh = async () => {
            const response = await axios.get("auth/refresh", {
                withCredentials: true,
            });

            setAuth((prev) => {
                return {
                    ...prev,
                    user: response.data.user[0],
                    acessToken: response.data.acessToken,
                };
            });
        };
        refesh();
    }, [auth.acessToken, loading]);
    useEffect(() => {
        let isMounted = true;
        const getNotification = async () => {
            const response = await axiosPrivate.get(
                `/notification/${auth?.user?.id}?readed=0`
            );
            isMounted && setNotification(response.data);
            isMounted && setIsReaded(false);
        };
        getNotification();
        return () => (isMounted = false);
    }, [auth?.user?.id, isReaded]);
    useEffect(() => {
        if (socket) {
            socket.on("getNotification", (msg) => {
                setNotification([msg, ...notification]);
            });
            return () => socket.off("getNotification");
        }
    }, [socket, notification]);
    const sigout = async () => {
        await logout();
        window.location.reload();
    };
    useEffect(() => {
        let isMounted = true;

        const getPosts = async () => {
            const response = await axiosPrivate.get("/p/");
            //    console.log(response.data)

            for (let i = 0; i < response.data.length; i++) {
                tatcaBaiViet.push(response.data[i].posts);
            }

            for (let i = 0; i < tatcaBaiViet.length; i++) {
                for (let j = 0; j < tatcaBaiViet[i].length; j++) {
                    if (tatcaBaiViet[i][j].status == 1) {
                        // bai da duyet
                        baiVietDaDuyet.push(tatcaBaiViet[i][j]);
                    }
                }
            }
            isMounted && setBaiDD(baiVietDaDuyet);
            //   console.log(baiVietDaDuyet);
        };
        getPosts();
        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const getUsers = async () => {
            const respone = await axiosPrivate.get("/user");
            isMounted && setUsers(respone.data.users);
            // console.log(respone.data.users);
        };
        getUsers();
        return () => (isMounted = false);
    }, []);
    const handleRead = async (id) => {
        await axiosPrivate.post("/notification/read", { id });
        setIsReaded(true);
    };
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark topbar  static-top shadow sticky-top">
            <Link className="navbar-brand" to="/">
                Family
            </Link>
            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <Link className="nav-link link" to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/forum">
                            Diễn đàn
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/rules"}>
                            Nội quy
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/guide"}>
                            Hướng dẫn
                        </Link>
                    </li>
                </ul>

                <div
                    className=" d-none d-sm-inline-block form-inline  "
                    style={{ height: "80px", marginLeft: "40px" }}
                >
                    <SearchBar
                        placeholder="Tìm kiếm..."
                        data={baiDD}
                        dataUser={users}
                    ></SearchBar>
                </div>
                {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            style={{ width: "400px" }}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fa fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form> */}
            </div>
            {/* login require */}
            {auth?.acessToken?  (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-1">
                        <Link className="nav-link link" to="p/create">
                            <i className="fa fa-pencil fa-light"></i>
                        </Link>
                    </li>
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle hidden-arrow"
                            href="htAHrefJavascript"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-bell fa-lg"></i>
                            {notification.length > 0 && (
                                <span className="badge rounded-pill badge-notification bg-danger ">
                                    {notification.length}
                                </span>
                            )}
                        </a>
                        <ul
                            className="user-dropdown dropdown-menu dropdown-menu-end ul_thongBao"
                            aria-labelledby="navbarDropdownMenuLink"
     
                        >   {notification.length ===0 &&(
                            <div id="kcThongBao" >Không có thông báo mới</div>
                           
                        )}
                            {notification.slice(0,6).map((notification, index) => (
                                <li
                                    key={index}
                                    className="notification"
                                    onClick={() => handleRead(notification.id)}
                                >
                                    <Link
                                        to={`/post/${notification.entityId}`}
                                        className="dropdown-item link_tb"
                                        // style={{
                                        //     whiteSpace: "normal",
                                        //     wordBreak: "break-word",
                                        // }}
                                    >
                                        {notification.message}
                                    </Link>
                                    <span
                                        className="fa fas-check"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    />
                                </li>
                            ))}
                                <Link to='/notification' id="all"  className="text-info">Xem tất cả thông báo</Link>
                        </ul>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle"
                            href="htAHrefJavascript"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                {auth?.user?.fullName}
                            </span>
                            <img
                                className="img-profile rounded-circle"
                                src={auth?.user?.avatar}
                            />
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown"
                        >
                            <Link
                                className="dropdown-item"
                                to={`/profile/${auth?.user?.id}`}
                            >
                                <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Trang cá nhân
                            </Link>
                            <Link className="dropdown-item link" to="/p/create">
                                <i className="fa fa-pencil fa-sm fa-fw mr-2 text-gray-400"></i>
                                Tạo bài viết
                            </Link>

                            {auth?.user?.role == "admin" && (
                                <Link
                                    className="dropdown-item link"
                                    to="/admin/users"
                                >
                                    <i className="fab fa-buffer fa-fw mr-2 text-gray-400"></i>
                                    Trang quản lý
                                </Link>
                            )}
                            <div className="dropdown-divider"></div>
                            <a
                                className="dropdown-item"
                                href="htAHrefJavascript"
                                data-toggle="modal"
                                data-target="htAHrefJavascriptlogoutModal"
                                onClick={sigout}
                            >
                                <i className="fa fa-sign-out fa-sm fa-fw mr-2 text-gray-400"></i>
                                Đăng xuất
                            </a>
                        </div>
                    </li>
                </ul>
            ) : (
                <ul className="navbar-nav mr-2">
                    <li className="nav-item mr-auto">
                        <Link className="link mr-2" to="/login">
                            <i className="fa fa-sign-in fa-sm fa-fw mr-2 text-gray-400"></i>
                            Đăng nhập
                        </Link>
                    </li>
                    <li className="nav-item mr-auto">
                        <Link className="link ml-2" to="/register">
                            Đăng ký
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
