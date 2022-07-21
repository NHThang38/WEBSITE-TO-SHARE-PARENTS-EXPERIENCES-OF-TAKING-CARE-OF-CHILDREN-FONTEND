 /* eslint-disable */
import { useState, useRef, useEffect } from "react";
import CreateForm from "./card/CreateForm";
import Preview from "./card/Preview";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import QuillEditor from "./editor/ReactQuill";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/createPost.css";
import { validPost, shallowEqual, validUserPost } from "../utils/ValidInput";
import { imageUpload } from "../utils/ImageUpload";
import swal from "sweetalert";
import moment from 'moment'
const CreatePost = ({ id }) => {
    document.title = "Tạo bài viết";
    toast.configure();
    const [text, setText] = useState("");
    const { auth } = useAuth();
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const initState = {
        title: "",
        thumbnail: "",
        description: "",
        category: "",
        content: "",
        user: auth?.user.id,
        createdAt: date,
    };
    const divRef = useRef(null);
    const [post, setPost] = useState(initState);
    const [body, setBody] = useState("");
    const [oldData, setOldData] = useState(initState);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) return;
        let isMounted = true;
        const getPost = async () => {
            const response = await axiosPrivate.get(`p/post/${id}`);
            isMounted && setPost(response.data[0]);
            isMounted && setBody(response.data[0].content);
            isMounted && setOldData(response.data[0]);
        };
        getPost();
        return () => {
            isMounted = false;
            setPost(initState);
            setBody("");
            setOldData(initState);
        };
    }, []);
    useEffect(() => {
        const div = divRef.current;
        if (!div) return;

        const text = div?.innerText;
        setText(text);
    }, [body]);

    const handleSubmit = async () => {
        let url = "";
        let check = "";
        if (auth?.user?.role === "parent" || auth?.user?.role ==='admin') {
            check = validUserPost({ ...post, content: text });
        } else {
            check = validPost({ ...post, content: text });
        }
        if (check.errLength !== 0) {
            const errBody = check.errMsg.map((data, index) => (
                <div key={index}>{data}</div>
            ));
            return toast.error(<>{errBody}</>, {
                osition: toast.POSITION.TOP_RIGHT,
            });
        }
        if (auth?.user?.role === "parent" || auth?.user.role === "admin") {
            url = auth?.user?.avatar;
        } else {
            if (typeof post.thumbnail !== "string") {
                const photo = await imageUpload(post.thumbnail);
                url = photo.url;
            } else {
                url = post.thumbnail;
            }
        }
        const categoryId = parseInt(post.category);
        const newPost = {
            ...post,
            thumbnail: url,
            content: body,
            category: categoryId,
        };
        if (id) {
            console.log(oldData);
            console.log(newPost);
            const result = shallowEqual(oldData, newPost);
            if (result) {
                return toast.error(
                    "Cập nhập không thành công, bài viết chưa chỉnh sửa",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    }
                );
            } else {
                try {
                    const response = await axiosPrivate.post(`p/post/${id}`, {
                        title: newPost.title,
                        thumbnail: newPost.thumbnail,
                        description: newPost.description,
                        categoryId: newPost.category,
                        content: newPost.content,
                        user: newPost.user,
                        createdAt: newPost.createdAt,
                    });
                    swal({
                        title: "Cập nhật bài viết thành công.",
                        text: "Bấm Ok trở về trang cá nhân",
                        icon: "success",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            return navigate(`/profile/${auth?.user?.id}`);
                        } else {
                        }
                    });
                } catch (error) {
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.msg
                    ) {
                        return toast.error("Cập nhập không thành công", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                        });
                    }
                }
            }
        } else {
            try {
                const response = await axiosPrivate.post("p/create-post", {
                    title: newPost.title,
                    thumbnail: newPost.thumbnail,
                    description: newPost.description,
                    categoryId: newPost.category,
                    content: newPost.content,
                    user: newPost.user,
                    createdAt: newPost.createdAt,
                });
                swal({
                    title: "Thêm bài viết thành công.",
                    text: "Bấm Ok trở về trang cá nhân",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        return navigate(`/profile/${auth?.user?.id}`);
                    } else {
                    }
                });
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    return toast.error("Thêm bài viết không thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });
                }
            }
        }
    };
    return (
        <div className="my-4 create_post">
            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Tạo bài viết</h5>
                    <CreateForm post={post} setPost={setPost} />
                </div>
                <div className="col-md-6">
                    <h5>Xem trước</h5>
                    <Preview post={post} />
                </div>
            </div>
            <QuillEditor setBody={setBody} body={body} />
            <div
                ref={divRef}
                dangerouslySetInnerHTML={{
                    __html: body,
                }}
                style={{ display: "none" }}
            />

            <small>{text.length}</small>
            <button
                className="btn- btn-primary mt-3 d-block mx-auto"
                onClick={handleSubmit}
            >
                {id ? "Cập nhập" : "Tạo bài viết"}
            </button>
        </div>
    );
};

export default CreatePost;
