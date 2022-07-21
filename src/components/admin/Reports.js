/* eslint-disable */
import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar";
import axios from "../../api/axios";
import { Link, Route, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Reports = () => {
    document.title = "Báo cáo bình luận";
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        const getReports = async () => {
            const response = await axios.get("/reports");
            isMounted && setReports(response.data);
            // console.log(response.data);
            setLoading(false);
        };
        getReports();
        return () => (isMounted = false);
    }, [loading]);
    const handelViewModal = (postID) => {
        navigate(`/post/${postID}`);
    };
    const deleteComment = (commentId) => {
        swal({
            title: "Bạn chắc mốn xóa bình luận không?",
            text: "Một khi đã xóa thì không thể khôi phục lại",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`comment/${commentId}`);
                setLoading(true);
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
    const deletePost = (postId) => {
        swal({
            title: "Bạn chắc mốn xóa Bài viết không?",
            text: "Một khi đã xóa thì không thể khôi phục lại",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`p/post/${postId}`);
                setLoading(true);
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
    const handleDeleteReport = (id) => {
        swal({
            title: "Bạn chắc mốn xóa báo cáo không?",
            text: "Một khi đã xóa thì không thể khôi phục lại",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`reports/${id}`);
                setLoading(true);
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
    return (
        <div className="d-flex">
            <Sidebar className="w-20" style={{ overflow: "none" }}></Sidebar>
            <div className="Post_content row w-80 mt-4 pl-5 ">
                <div className="list_post">
                    <h2
                        style={{
                            color: "#0984e3",
                            fontSize: "34px",
                            fontWeight: "600",
                        }}
                    >
                        Danh sách báo cáo
                    </h2>
                    <div className="list_post_content">
                        <table
                            className="table_group1  "
                            style={{ backgroundColor: "#e8f5f9d4" }}
                        >
                            <thead style={{ backgroundColor: "#3498db" }}>
                                <tr>
                                    <td>ID</td>
                                    <td>Nội dung báo cáo</td>
                                    <td>Chi tiết </td>
                                    <td>Người viết </td>
                                    <td>Ngày báo cáo</td>
                                    <td>Hành động</td>
                                </tr>
                            </thead>

                            <tbody>
                                <>
                                    {reports.map((rp, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{rp.report_context}</td>
                                            <td>
                                                {rp.comment_id !== null ? (
                                                    <div
                                                        style={{
                                                            paddingTop: "8px",
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: rp.comment_content,
                                                        }}
                                                    />
                                                ) : (
                                                    <> {rp.post_title}</>
                                                )}
                                            </td>
                                            <td>
                                                {rp.comment_id !== null ? (
                                                    <Link
                                                        to={`/profile/${rp.comment_userId}`}
                                                        className="card-title"
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        {rp.createBy}
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to={`/profile/${rp.post_userId}`}
                                                        className="card-title"
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        {rp.author}
                                                    </Link>
                                                )}
                                            </td>
                                            <td>
                                                {new Date(
                                                    rp.report_createdAt
                                                ).toLocaleString([], {
                                                    day: "numeric",
                                                    month: "numeric",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                            <td>
                                                {rp.comment_id === null ? (
                                                    <i
                                                        className="far fa-eye"
                                                        title="xem bình luận"
                                                        onClick={() =>
                                                            handelViewModal(
                                                                rp.post_id
                                                            )
                                                        }
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="far fa-eye"
                                                        title="xem bài viết"
                                                        onClick={() =>
                                                            handelViewModal(
                                                                rp.comment_postId
                                                            )
                                                        }
                                                    ></i>
                                                )}

                                                {rp.comment_id !== null ? (
                                                    <i
                                                        className="far fa-trash-alt"
                                                        title="xóa bình luận"
                                                        onClick={() =>
                                                            deleteComment(
                                                                rp.comment_id
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="far fa-trash-alt"
                                                        title="xóa bình luận"
                                                        onClick={() =>
                                                            deletePost(
                                                                rp.post_id
                                                            )
                                                        }
                                                    />
                                                )}
                                                <i
                                                    className="fa fa-times"
                                                    style={{
                                                        color: "white",
                                                        backgroundColor:
                                                            "#d63031",
                                                    }}
                                                    title="xóa báo cáo"
                                                    onClick={() =>
                                                        handleDeleteReport(
                                                            rp.report_id
                                                        )
                                                    }
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
