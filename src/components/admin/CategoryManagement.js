 /* eslint-disable */
import { useState, useRef, useEffect } from "react";
import "../../style/categoryAdmin.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Form from "react-validation/build/form";
import Sidebar from "../admin/Sidebar";
import swal from "sweetalert";
const Category = () => {
    document.title = "Quản lý danh mục";
    const form = useRef();
    const axiosPrivate = useAxiosPrivate();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [edit, setEdit] = useState("");
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const getCategories = async () => {
            const response = await axiosPrivate.get("/category");
            isMounted && setCategories(response.data.categories);
            setIsLoading(false);
        };
        getCategories();
        return () => (isMounted = false);
    }, [isLoading]);
    useEffect(() => {
        let isMounted = true;
        const getPosts = async () => {
            const response = await axiosPrivate.get("/p");
            isMounted && setPosts(response.data);
        };
        getPosts();
        return () => (isMounted = false);
    }, []);
    useEffect(() => {
        if (edit) {
            setName(edit.name);
            setDesc(edit.description);
        }
    }, [edit]);
    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage("");
        if (edit) {
            if (edit.name === name && edit.description === desc) return;
            try {
                const id = edit.id;
                const response = await axiosPrivate.post(`/category/${id}`, {
                    name: name,
                    description: desc,
                });
                setName("");
                setDesc("");
                setEdit("");
                setSuccessful(true);
                setIsLoading(true);
                swal("Cập nhật danh mục thành công!", {
                    icon: "success",
                });
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    setSuccessful(false);
                    setIsLoading(false);
                    setMessage(error.response.data.msg);
                }
            }
        } else {
            try {
                const response = await axiosPrivate.post("/category", {
                    name: name,
                    description: desc,
                });
                setSuccessful(true);
                setIsLoading(true);
                swal("Thêm danh mục thành công!", {
                    icon: "success",
                });
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    setSuccessful(false);
                    setIsLoading(false);
                    setMessage(error.response.data.msg);
                }
            }
        }
        setTimeout(() => {
            setMessage("");
        }, 8000);
    };
    const handleCancel = () => {
        setName("");
        setDesc("");
        setEdit("");
    };
    const handleDelete = async (id, path) => {
                    
        
        try {
            let flag = false;
            for (let i = 0; i < posts.length; i++) {
                if (id === posts[i].category_id) {
                    flag = true;
                }
            }
            if (flag == true) {
                setSuccessful(false);
                setMessage("Không thể xóa do danh mục chứa bài viết");
            } else {
                swal({
                    title: "Bạn chắc mốn xóa?",
                    text: "Một khi đã xóa thì không thể khôi phục lại",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                         axiosPrivate.delete(`/category/${id}`);
                         setIsLoading(true);
                        swal("Xóa thành công!", {
                            icon: "success",
                        });
                    } else {
                        swal("Hủy xóa!", {
                            icon: "success",
                        });
                    }
                });
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.msg
            ) {
                setSuccessful(false);
                setIsLoading(false);
                setMessage(error.response.data.msg);
            }
        }
    };
    return (
        <div style={{ margin: "0", padding: "0" }}>
            <Sidebar className="w-20" style={{ overflow: "none" }}></Sidebar>
            <div className="category row">
                <h2
                    className=" mt-2"
                    style={{
                        color: "#0984e3",
                        fontSize: "34px",
                        fontWeight: "600",
                    }}
                >
                    Danh mục
                </h2>
                <Form onSubmit={handleCreate} ref={form}>
                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="category_name">Tên danh mục</label>
                        <input
                            type="text"
                            name="category_name"
                            id="category_name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_desc">Mô tả</label>
                        <textarea
                            name="category_desc"
                            id="category_desc"
                            className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100 " type="submit">
                        {edit ? "Cập nhập" : "Thêm"}
                    </button>
                </Form>
                <div>
                    <button
                        className="btn btn-dark w-100 mb-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    {categories.map((category) => (
                        <div className="category_row" key={category.id}>
                            <p className="m-0 text-capitalize">
                                {category.name}
                            </p>
                            <p
                                className="m-0 text-capitalize"
                                style={{ display: "none" }}
                            >
                                {category.description}
                            </p>
                            <div>
                                <i
                                    className="fas fa-edit mx-2"
                                    onClick={() => setEdit(category)}
                                />
                                <i
                                    className="fas fa-trash-alt"
                                    onClick={() =>
                                        handleDelete(category.id, category.path)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
