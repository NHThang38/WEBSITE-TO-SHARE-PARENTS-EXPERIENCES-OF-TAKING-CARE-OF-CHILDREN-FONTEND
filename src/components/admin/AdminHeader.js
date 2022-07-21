 /* eslint-disable */
import axios from "../../api/axios";
import { useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
const AdminHeader = () => {
    const { auth, setAuth, loading } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
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
    const sigout = async () => {
        await logout();
        navigate("/login");
        window.location.reload();
    };
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark topbar  static-top shadow sticky-top">
            <Link className="navbar-brand" to="/">
                Family
            </Link>
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
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            ></div>
            {/* login require */}

            <ul className="navbar-nav ml-auto">
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
                        <Link className="dropdown-item link" to="/admin/statis">
                            <i className="fab fa-buffer fa-fw mr-2 text-gray-400"></i>
                            Trang quản lý
                        </Link>
                        <Link className="dropdown-item link" to="/">
                            <i className="fa fa-home fa-fw mr-2 text-gray-400"></i>
                            Trang chủ
                        </Link>
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
        </nav>
    );
};

export default AdminHeader;
