 /* eslint-disable */
import React from "react";
import "../../style/postAdmin.css";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import swal from "sweetalert";
import { DataContext } from "../../context/GlobalContext";
const Posts = () => {
    toast.configure();
    const {socket} = useContext(DataContext);
    const axiosPrivate = useAxiosPrivate();
    const [baiCD, setBaiCD] = useState([]);
    const [baiDD, setBaiDD] = useState([]);
    const [modal, setModal] = useState("");
    const [duyet, setDuyet] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    let tatcaBaiViet = [];
    let baiVietChuaDuyet = [];
    let baiVietDaDuyet = [];
    useEffect(() => {
        let isMounted = true;
        const getPosts = async () => {
            const response = await axiosPrivate.get("/p/");
            for (let i = 0; i < response.data.length; i++) {
                tatcaBaiViet.push(response.data[i].posts);
            }

            for (let i = 0; i < tatcaBaiViet.length; i++) {
                for (let j = 0; j < tatcaBaiViet[i].length; j++) {
                    if (tatcaBaiViet[i][j].status == 0) {
                        // bai da duyet
                        baiVietChuaDuyet.push(tatcaBaiViet[i][j]);
                    } else {
                        baiVietDaDuyet.push(tatcaBaiViet[i][j]);
                    }
                }
            }
            isMounted && setBaiCD(baiVietChuaDuyet);
            // console.log(baiVietDaDuyet);
            isMounted && setBaiDD(baiVietDaDuyet);
            setLoading(true);
        };
        getPosts();

        return () => (isMounted = false);
    }, [loading]);
    const handleChangeList = (e) => {
        setDuyet(false);
    };
    const handleChange = (e) => {
        setDuyet(true);
    };
    const handleModel = (bainb) => {
        setModal(bainb);
       
    };
    const handleDelete = async (id) => {
        swal({
            title: "Bạn chắc mốn xóa?",
            text: "Một khi đã xóa thì không thể khôi phục lại",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosPrivate.delete(`/p/post/${id}`);
                setLoading(false);
                swal("Xóa thành công!", {
                    icon: "success",
                });
            } else {
                swal("Hủy xóa!", {
                    icon: "success",
                });
            }
        });
    };

    const handleAprrovePost = async (id,title,userID) => {
        try {
            const response = await axiosPrivate.post(`/p/post/${id}/approve`);
            setLoading(false);
            socket.emit('sendNotification',
            {   entityId:id,
                type:"post",
                message:`Bài viết ${title.substring(0, 15)+"..."}  đã được duyệt`,
                notifierId:userID
            })
            return toast.success("duyệt bài thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } catch (error) {
            return toast.error("duyệt bài không thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        }
    };

    const handleSreach = (rows) => {
        return rows.filter(
            (row) =>
                row.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.user.username.toLowerCase().indexOf(search.toLowerCase()) >
                    -1
        );
    };
    // console.log(modal.user.role)
    return (
        <div className="d-flex">
            <Sidebar className="w-20" style={{ overflow: "none" }}></Sidebar>
            <div className="Post_content row w-80 mt-4 pl-5 ">
                <div className="list_post">
                    <h2
                        style={{
                            color: "#0984e3",
                            fontSize: "30px",
                            fontWeight: "600",
                        }}
                    >
                        Danh sách bài viết
                    </h2>

                    <div className="search_check pt-2">
                        {/* Search */}
                        <form
                            className="d-flex my-2"
                            style={{ paddingLeft: "250px" }}
                        >
                            <label
                                className="form-label"
                                htmlFor="form3Example4cd"
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    paddingTop: "2px",
                                    paddingRight: "10px",
                                }}
                            >
                                Tìm kiếm bài viết:
                            </label>
                            <input
                                id="form3Example4cd"
                                className="form-control form-control-md col-4 mr-3"
                                type="search"
                                placeholder="Chăm sóc trẻ"
                                aria-label="Search"
                                // onChange={onchangeSearch}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: "400px",
                                    backgroundColor: "#dfe6e9",
                                }}
                            />
                        </form>
                        {/* Check */}
                        <div className="d-flex mt-2">
                            <div
                                className="form_check_all d-flex my-2"
                                style={{ paddingLeft: "150px" }}
                            >
                                <h5>Lựa chọn bài viết: </h5>
                                <div className="form-check ml-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baiviets"
                                        id="flexRadioDefault1"
                                        onClick={handleChangeList}
                                        defaultChecked={duyet === false}
                                    />

                                    <label className="form-check-label">
                                        Bài viết chưa duyệt
                                    </label>
                                </div>
                                <div className="form-check ml-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baiviets"
                                        id="flexRadioDefault1"
                                        onClick={handleChange}
                                        defaultChecked={duyet === true}
                                    />

                                    <label className="form-check-label">
                                        Bài viết đã duyệt{" "}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="list_post_content">
                            <table
                                className="table_group1  "
                                style={{ backgroundColor: "#e8f5f9d4" }}
                            >
                                <thead style={{ backgroundColor: "#3498db" }}>
                                    <tr>
                                        <td>ID</td>
                                        <td>Tiêu Đề</td>
                                        <td>Mô tả</td>
                                        <td>Hình ảnh</td>
                                        <td>Người đăng</td>
                                        <td>Danh mục</td>
                                        <td>Ngày đăng</td>
                                        <td>Hành động</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {duyet ? (
                                        <>
                                            {handleSreach(baiDD).map(
                                                (bainb, index) => (
                                                    <tr key={bainb.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <Link
                                                                to={`/post/${bainb.id}`}
                                                                className="card-title"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                            >
                                                                {bainb.title.slice(
                                                                    0,
                                                                    40
                                                                )}
                                                            </Link>
                                                            {/* {bainb.title.slice(
                                                            0,
                                                            40
                                                        )} */}
                                                        </td>
                                                        <td>
                                                            {bainb.description.slice(
                                                                0,
                                                                40
                                                            )}
                                                        </td>
                                                        <td>
                                                            {typeof bainb.thumbnail ===
                                                                "string" && (
                                                                <img
                                                                    src={
                                                                        bainb.thumbnail
                                                                    }
                                                                    width="50px"
                                                                    height="50px"
                                                                />
                                                            )}
                                                        </td>
                                                        <td>
                                                            {bainb.user.role ===
                                                            "doctor" ? (
                                                                <>
                                                                    Dr.
                                                                    {
                                                                        bainb
                                                                            .user
                                                                            .username
                                                                    }{" "}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        bainb
                                                                            .user
                                                                            .username
                                                                    }
                                                                </>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {
                                                                bainb.category
                                                                    .name
                                                            }
                                                        </td>

                                                        <td>
                                                            {new Date(
                                                                bainb.createdAt
                                                            ).toLocaleString(
                                                                [],
                                                                {
                                                                    day: "numeric",
                                                                    month: "numeric",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </td>
                                                        <td>
                                                            <i
                                                                className="far fa-eye"
                                                                data-toggle="modal"
                                                                data-target="#exampleModal"
                                                                onClick={() =>
                                                                    handleModel(
                                                                        bainb
                                                                    )
                                                                }
                                                            ></i>
                                                            <i
                                                                className="far fa-trash-alt"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        bainb.id
                                                                    )
                                                                }
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {handleSreach(baiCD).map(
                                                (bainb, index) => (
                                                    <tr key={bainb.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <Link
                                                                to={`/post/${bainb.id}`}
                                                                className="card-title"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                            >
                                                                {bainb.title.slice(
                                                                    0,
                                                                    40
                                                                )}
                                                            </Link>
                                                            {/* {bainb.title.slice(
                                                            0,
                                                            40
                                                        )} */}
                                                        </td>

                                                        <td>
                                                            {bainb.description.slice(
                                                                0,
                                                                40
                                                            )}
                                                        </td>
                                                        <td>
                                                            {typeof bainb.thumbnail ===
                                                                "string" && (
                                                                <img
                                                                    src={
                                                                        bainb.thumbnail
                                                                    }
                                                                    width="50px"
                                                                    height="50px"
                                                                />
                                                            )}
                                                        </td>
                                                        <td>
                                                            {bainb.user.role ===
                                                            "doctor" ? (
                                                                <>
                                                                    Dr.
                                                                    {
                                                                        bainb
                                                                            .user
                                                                            .username
                                                                    }{" "}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        bainb
                                                                            .user
                                                                            .username
                                                                    }
                                                                </>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {
                                                                bainb.category
                                                                    .name
                                                            }
                                                        </td>

                                                        <td>
                                                            {new Date(
                                                                bainb.createdAt
                                                            ).toLocaleString(
                                                                [],
                                                                {
                                                                    day: "numeric",
                                                                    month: "numeric",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </td>
                                                        <td>
                                                            <i
                                                                className="far fa-eye"
                                                                data-toggle="modal"
                                                                data-target="#exampleModal"
                                                                onClick={() =>
                                                                    handleModel(
                                                                        bainb
                                                                    )
                                                                }
                                                            ></i>
                                                            <i
                                                                className="fa fa-check"
                                                                onClick={() =>
                                                                    handleAprrovePost(
                                                                        bainb.id,bainb.title,bainb.user.id
                                                                    )
                                                                }
                                                            ></i>
                                                            <i
                                                                className="far fa-trash-alt"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        bainb.id
                                                                    )
                                                                }
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Chi tiết bài viết
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                        
                                data-dismiss="modal"
                            ></button>
                        </div>
                            <div className="modal-body">
                                <div className="card">
                                    <img
                                        className="card-img-top"
                                        src={modal.thumbnail}
                                        alt="Card image cap"
                                    />
                                    <div className="card-body">
                                        <h3
                                            to={`/post/${modal.id}`}
                                            className="card-title"
                                            style={{ textDecoration: "none" }}
                                        >
                                            Tiêu đề: {modal.title}
                                        </h3>

                                        <div>
                                                  
                                            { modal?.user?.role === "doctor" ? (
                                                <>Mô tả: {modal?.description}</>
                                            ) : (
                                                <>
                                                    {
                                                        <div>
                                                            Nội dung: <div  dangerouslySetInnerHTML={{__html: modal?.content , }}/>
                                                        </div>
                                                    }
                                                </>
                                            )}
                                        </div>
                                        <p>
                                            Ngày tạo:
                                            {new Date(
                                                modal.createdAt
                                            ).toLocaleString([], {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{" "}
                                        </p>
                                        <p>{modal.fullName}</p>
                                        {modal.status === 0 ? (
                                            <p>Trạng thái: Chờ duyệt</p>
                                        ) : (
                                            <p> đã duyệt</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {modal.status === 0 && (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-dismiss="modal"
                                        onClick={() =>
                                            handleAprrovePost(modal.id,modal.title,modal.user.id)
                                        }
                                    >
                                        Duyệt bài
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
