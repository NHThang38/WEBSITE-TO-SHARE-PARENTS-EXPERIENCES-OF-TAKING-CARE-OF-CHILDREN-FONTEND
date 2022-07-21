 /* eslint-disable */
import { React, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link,useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Input from "../post_info/Input";
import swal from "sweetalert";
const Comment = ({
    comment,
    replies,
    modal,
    deleteComment,
    activeComment,
    addComment,
    setActiveComment,
    updateComment,
    handelReport,
    
    rootComment = null,
}) => {
    const { auth } = useAuth();
    const [report, setReport] = useState([]);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const replyId = rootComment ? rootComment : comment.id;
    let replyUser = comment.userId;
    const [userReply, setUserReply] = useState([]);
    useEffect(() => {
        if (!comment.replyUser) return;
        let isMounted = true;
        const getComments = async () => {
            const response = await axiosPrivate.get(
                `user/${comment.replyUser}`
            );
            isMounted && setUserReply(response.data.user[0]);
        };
        getComments();
        return () => (isMounted = false);
    }, []);
    
    // if(!replyUser.length) return replyUser=[];
    const handelCommentReport = async (commentId) => {
        if(!auth.acessToken){
            navigate("/login")
        }
        try {
            await axiosPrivate
                .post("/reports/create-report", {
                    commentId: commentId,
                    context: report,
                })
                .then((response) => {
                    swal(response.data.msg, {
                        icon: "success",
                    });
                });
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.msg
            ) {
                swal(error.response.data.msg, {
                    icon: "error",
                });
            }
        }
    };
    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <img src={comment.user.avatar} />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <Link
                        to={`/profile/${comment.user.id}`}
                        className="comment-author"
                    >
                        {comment.user.username}
                    </Link>
                    <div>
                        {new Date(comment.createdAt).toLocaleString([], {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
                {userReply.length !== 0 && (
                    <>
                        <div className="comment-content">
                            trả lời
                            <Link to={`/profile/${userReply.id}`}>
                                <span className="ml-2">
                                    {userReply.fullName}
                                </span>
                            </Link>
                        </div>
                    </>
                )}

                {!isEditing && (
                    <div
                        className="comment-text"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                )}
                {isEditing && (
                    <Input
                        submitLabel="Cập nhập"
                        hasCancelButton
                        initialText={comment.content}
                        callback={(body) => updateComment(body, comment.id)}
                        handelCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="comment-actions">
                    { auth?.acessToken && 
                    <div
                        className="comment-action"
                        onClick={() =>
                            setActiveComment({
                                id: comment.id,
                                type: "replying",
                            })
                        }
                    >
                        Trả lời
                    </div>
                    }
                    {auth?.user?.id === comment.user.id && (
                        <>
                            <div
                                className="comment-action"
                                onClick={() =>
                                    setActiveComment({
                                        id: comment.id,
                                        type: "editing",
                                    })
                                }
                            >
                                Chỉnh sửa
                            </div>
                            <div
                                className="comment-action"
                                onClick={() => deleteComment(comment.id)}
                            >
                                Xóa
                            </div>
                        </>
                    )}
                    {auth?.user?.id !== comment.user.id && auth?.acessToken && (
                        <>
                            <div
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal12"
                                onClick={()=>{handelReport(comment.id)}}
                            >
                                Báo cáo
                            </div>
                        </>
                    )}
                </div>
                {isReplying && (
                    <Input
                        hasCancelButton
                        submitLabel="Trả lời"
                        callback={(body) =>
                            addComment(body, replyId, replyUser)
                        }
                        handelCancel={() => setActiveComment(null)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replies={[]}
                                modal ={modal}
                                deleteComment={deleteComment}
                                rootComment={comment.id}
                                addComment={addComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                handelReport={handelReport}
                                setActiveComment={setActiveComment}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div
                className="modal fade"
                id="exampleModal12"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Báo cáo bình luận
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="form_check_all">
                                <h5>Báo cáo vi phạm: </h5>
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baocao"
                                        id="flexRadioDefault1"
                                        value=" Nội dung rác hoặc nội dung quảng cáo
                                        không mong muốn"
                                        onChange={(e) =>
                                            setReport(e.target.value)
                                        }
                                    />

                                    <label className="form-check-label">
                                        Nội dung rác hoặc nội dung quảng cáo
                                        không mong muốn
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baocao"
                                        id="flexRadioDefault2"
                                        value="Tài liệu khiêu dâm hoặc phim khiêu dâm"
                                        onChange={(e) =>
                                            setReport(e.target.value)
                                        }
                                    />

                                    <label className="form-check-label">
                                        Tài liệu khiêu dâm hoặc phim khiêu dâm{" "}
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baocao"
                                        id="flexRadioDefault3"
                                        value="Lời nói căm thù hoặc hình ảnh bạo lực"
                                        onChange={(e) =>
                                            setReport(e.target.value)
                                        }
                                    />

                                    <label className="form-check-label">
                                        Lời nói căm thù hoặc hình ảnh bạo lực
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baocao"
                                        id="flexRadioDefault2"
                                        value="Thông tin sai lệch"
                                        onChange={(e) =>
                                            setReport(e.target.value)
                                        }
                                    />

                                    <label className="form-check-label">
                                        Thông tin sai lệch
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baocao"
                                        id="flexRadioDefault2"
                                        value="Nội dung quấy rối hoặc bắt nạt"
                                        onChange={(e) =>
                                            setReport(e.target.value)
                                        }
                                    />

                                    <label className="form-check-label">
                                        Nội dung quấy rối hoặc bắt nạt
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="baocao"
                                        id="flexRadioDefault2"
                                        value=" Nội dung Xâm hại trẻ em"
                                        onChange={(e) =>
                                            setReport(e.target.value)
                                        }
                                    />

                                    <label className="form-check-label">
                                        Nội dung Xâm hại trẻ em
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={()=>handelCommentReport(modal)}
                                data-bs-dismiss="modal"
                            >
                                Báo cáo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
