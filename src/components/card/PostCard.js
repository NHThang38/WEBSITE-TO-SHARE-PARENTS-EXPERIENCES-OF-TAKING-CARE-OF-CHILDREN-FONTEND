 /* eslint-disable */
import { React } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../style/postCard.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import swal from "sweetalert";
import { FacebookShareButton } from "react-share";
const PostCard = ({ post, setLoad }) => {
    toast.configure();
    const { auth, setLike } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const handleDelete = async (postId) => {
        swal({
            title: "Bạn chắc mốn xóa?",
            text: "Một khi đã xóa thì không thể khôi phục lại",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosPrivate.delete(`p/post/${postId}`).then(
         
                    swal("Xóa thành công!", {
                        icon: "success",
                    })
                );
                setLoad(true)
            } else {
                swal("Hủy xóa!", {
                    icon: "success",
                });
            }
        });
    };
    const handleVotes = async (postId) => {
        if (!auth?.acessToken) return;
        await axiosPrivate.post("likes", { postId: postId });
        setLike(true);
    };
    return (
        <div className="wrap_postCard">
            <div className="row gy-2 mr-1 news_block" style={{ margin: "0" }}>
                <>
                    <div className="col-md-4 mb-4">
                        <Link to={`/post/${post.id}`}>
                            <div
                                className="bg-image hover-overlay ripple shadow-2-strong rounded-2 product-image"
                                data-mdb-ripple-color="light"
                            >
                                {typeof post.thumbnail === "string" && (
                                    <img
                                        src={post.thumbnail}
                                        style={{ borderRadius: "10px" }}
                                        className="img-fluid"
                                        //    width="260px"
                                        //    height="200px"
                                    />
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-7 mb-2">
                        <h5 className="card-title">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h5>
                        <p
                            className=" card-text"
                            style={{ color: "#1e272e", fontSize: "16px" }}
                        >
                            {post.description.slice(0, 250) + "..."}
                        </p>
                        <p className="card-text d-flex justify-content-between">
                            <small
                                className="text-muted text capitalize"
                                style={{ fontSize: "16px" }}
                            >
                                {typeof post.user !== "string" &&
                                    (post.user.role === "doctor" ? (
                                        <Link to={`/profile/${post.user.id}`}>
                                            Đăng bởi: Dr. {post.user.username}
                                        </Link>
                                    ) : (
                                        <Link to={`/profile/${post.user.id}`}>
                                            Đăng bởi: {post.user.username}
                                        </Link>
                                    ))}
                            </small>
                            <small
                                className="text-muted"
                                style={{ fontSize: "16px" }}
                            >
                                {new Date(post.createdAt).toLocaleString([], {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </small>
                        </p>
                        <span className="card-text d-flex justify-content-between">
                            <small>
                                {/* sua xoa bai viet */}
                                {auth?.user?.id === post.user.id && (
                                    <div>
                                        <Link to={`/updatePost/${post.id}`}>
                                            <i
                                                className="fas fa-edit mr-3 mb-3"
                                                title="Cập nhập"
                                            />
                                        </Link>
                                        <i
                                            className="fas fa-trash text-danger"
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                            title="Xóa"
                                        />
                                    </div>
                                )}
                                <div>
                                    <i
                                        className="fas fa-heart text-danger mr-1"
                                        title="lượt thích"
                                        onClick={() => handleVotes(post.id)}
                                    >
                                        {post.totalLikes}
                                    </i>
                                    <i
                                        className="fas fa-comment text-info ml-2 "
                                        title="bình luận"
                                    >
                                        {post.totalComment}
                                    </i>
                                    {/* http://localhost:3000/post/120 */}
                                    <FacebookShareButton
                                        url=" https://www.webtretho.com/f/mang-thai-chuan-bi-sinh/c-sui-bo-sung-chat-gi-cho-ba-bau-trong-c-sui-co-bao-nhieu-vitamin-c"
                                        quote="{Website chia sẻ kinh nghiệm chăm sóc con trẻ}"
                                        hashtag="#Family"
                                    >
                                        <i
                                        title="chia sẻ"
                                            className="fa fa-share-square"
                                            style={{
                                                color: "#341f97",
                                                fontSize: "16px",
                                                paddingLeft: "20px",
                                            }}
                                        ></i>
                                    </FacebookShareButton>
                                </div>
                            </small>
                        </span>
                    </div>
                </>
            </div>
        </div>
    );
};

export default PostCard;
