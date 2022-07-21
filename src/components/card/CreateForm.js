import Form from "react-validation/build/form";
import { useRef, useEffect, useState } from "react";
import axios from "../../api/axios";
import { checkImage } from "../../utils/ImageUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
const CreateForm = ({ post, setPost }) => {
    toast.configure();
    const { auth } = useAuth();
    const form = useRef();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const getCategories = async () => {
            const response = await axios.get("/category");
            isMounted && setCategories(response.data.categories);
        };
        getCategories();
        return () => (isMounted = false);
    }, []);
    const handelChangeInput = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };
    const handleChangeThumbnail = (e) => {
        const target = e.target;
        const files = target.files;
        if (files) {
            const file = files[0];
            const check = checkImage(file);
            if (check) {
                return toast.error(check, {
                    osition: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            }
            setPost({ ...post, thumbnail: file });
        }
    };
    return (
        <Form ref={form}>
            <div className="form-group position-relative">
                <label htmlFor="name">Tiều đề</label>
                <input
                    type="text"
                    className="form-control"
                    value={post.title}
                    name="title"
                    onChange={handelChangeInput}
                />
                <small
                    className="text-muted position-absolute"
                    style={{ bottom: 0, right: "3px" }}
                >
                    {post.title.length}/200
                </small>
            </div>
            {auth?.user?.role === "doctor" && (
                <>
                    <div className="form-group my-3">
                        <label htmlFor="thumbnail">Ảnh tiêu đề</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            name="thumbnail"
                            onChange={handleChangeThumbnail}
                        />
                    </div>
                    <div className="form-group position-relative">
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows={3}
                            value={post.description}
                            onChange={handelChangeInput}
                            style={{ resize: "none" }}
                        />
                        <small
                            className="text-muted position-absolute"
                            style={{ bottom: 0, right: "3px" }}
                        >
                            {post.description.length}/500
                        </small>
                    </div>
                </>
            )}
            <div className="form-group">
                <select
                    className="form-control text-capitalize"
                    name="category"
                    value={post.category}
                    onChange={handelChangeInput}
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </Form>
    );
};

export default CreateForm;
