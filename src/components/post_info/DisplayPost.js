/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "./Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Comment from "../comment/Comment";
import useAuth from "../../hooks/useAuth";
import "../../style/comment.css";
import swal from "sweetalert";
const DisplayPost = ({ post, id, socket }) => {
  const axiosPrivate = useAxiosPrivate();
  const [report, setReport] = useState([]);
  const location = useLocation();
  const [activeComment, setActiveComment] = useState(null);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [votes, setVote] = useState("");
  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const getComments = async () => {
      const response = await axiosPrivate.get(`p/${id}/comment`);
      isMounted && setComments(response.data);
      setLoading(false);
    };
    getComments();
    return () => (isMounted = false);
  }, [id, loading]);

  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        setComments([msg, ...comments]);
        setLoading(true);
      });
      return () => socket.off("sendCommentToClient");
    }
  }, [socket, comments]);
  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const getVotes = async () => {
      const response = await axiosPrivate.get(`p/post/${id}`);
      isMounted && setVote(response.data[0].post_vote);
      setLoading(false);
    };
    getVotes();
    return () => (isMounted = false);
  }, [id, loading]);
  const rootComments = comments.filter(
    (rootComment) => rootComment.commentRoot === null
  );
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.commentRoot === commentId);
  };
  const addComment = async (body, rootComment, replyUser) => {
    if (!auth?.user) return;
    socket.emit("create_comment", {
      postId: id,
      userId: auth.user.id,
      body,
      rootComment,
      replyUser,
    });
    if (!replyUser) {
      if (auth?.user?.id === post[0].userId) {
        return;
      } else {
        socket.emit("sendNotification", {
          entityId: id,
          type: "comment",
          message: ` ${auth?.user?.fullName} đã bình luận bài viết của bạn`,
          notifierId: post[0].userId,
        });
      }
    } else {
      if (auth?.user?.id === replyUser) {
        return;
      } else {
        socket.emit("sendNotification", {
          entityId: id,
          type: "replies",
          message: ` ${auth?.user?.fullName} trả lời bình luận của bạn`,
          notifierId: replyUser,
        });
      }
    }
    setActiveComment(null);
  };

  const deleteComment = async (commentId) => {
    swal({
      title: "Bạn chắc mốn xóa?",
      text: "Một khi đã xóa thì không thể khôi phục lại",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosPrivate.delete(`comment/${commentId}`);
        const updateComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updateComments);
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

  const updateComment = async (body, commentId) => {
    await axiosPrivate
      .post(`comment/${commentId}`, { content: body })
      .then(() => {
        const updateComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content: body };
          }
          return comment;
        });
        setComments(updateComments);
        setActiveComment(null);
      });
  };

  const handelReport = (commentId) => {
    setModal(commentId);
  };
  const handleVote = async () => {
    if (!auth?.acessToken) return;
    await axiosPrivate.post("likes", { postId: post[0].post_id });
    setLoading(true);
  };
  const handelPostReport = async (postId) => {
    if(!auth.acessToken){
        navigate("/login")
    }
    try {
        await axiosPrivate
            .post("/reports/create-post-report", {
                postId: postId,
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
    <div className="pb-2">
      <h2 className="text-center my-3 ">{post[0].title}</h2>

      <div
        className="text-end fst-italic my-4"
        style={{
          color: "darkblue",
          display: "flex",
          justifyContent: "left",
        }}
      >
        <a href={`http://localhost:3000/profile/${post[0].userId}`}>
          Người viết: {post[0].user_fullName}
        </a>

        <small className="ms-2">
          {new Date(post[0].createdAt).toLocaleString()}
        </small>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: post[0].content,
        }}
      />
      <hr className="my-1" />
      <i
        className="fas fa-heart text-danger"
        style={{ fontSize: "25px" }}
        title="lượt thích"
        onClick={() => handleVote()}
      >
        {votes}
      </i>
      {auth?.user?.id !== post[0].userId && auth?.acessToken && (
      <i
        className="fas fa-flag text-info ml-3"
        style={{ fontSize: "25px" }}
        title="Báo cáo bài viết"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal23"
      ></i>
      )}
      <hr className="my-2" />
      <h5 className="my-4"> Bình luận</h5>

      {auth.user ? (
        <Input submitLabel="Viết bình luận" callback={addComment} />
      ) : (
        <h5>
          <span
            className="text-info"
            onClick={() =>
              navigate(
                "/login",
                { state: { from: location } },
                { replace: "true" }
              )
            }
          >
            Đăng nhập
          </span>
          để viết bình luận.
        </h5>
      )}
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            modal={modal}
            activeComment={activeComment}
            handelReport={handelReport}
            setActiveComment={setActiveComment}
          />
        ))}
      </div>
      <div
        className="modal fade"
        id="exampleModal23"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Báo cáo bài viết
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
                    onChange={(e) => setReport(e.target.value)}
                  />

                  <label className="form-check-label">
                    Nội dung rác hoặc nội dung quảng cáo không mong muốn
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baocao"
                    id="flexRadioDefault2"
                    value="Tài liệu khiêu dâm hoặc phim khiêu dâm"
                    onChange={(e) => setReport(e.target.value)}
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
                    onChange={(e) => setReport(e.target.value)}
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
                    onChange={(e) => setReport(e.target.value)}
                  />

                  <label className="form-check-label">Thông tin sai lệch</label>
                </div>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baocao"
                    id="flexRadioDefault2"
                    value="Nội dung quấy rối hoặc bắt nạt"
                    onChange={(e) => setReport(e.target.value)}
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
                    onChange={(e) => setReport(e.target.value)}
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
                onClick={() => handelPostReport(id)}
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

export default DisplayPost;
