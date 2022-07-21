 /* eslint-disable */
import { React, useState, useRef, useEffect } from "react";
import "../../style/adminUser.css";
import Form from "react-validation/build/form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import swal from "sweetalert";

const Users = () => {
    document.title = "Quản lý người dùng"
    toast.configure();
    const axiosPrivate = useAxiosPrivate();
    const form = useRef();
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Nam");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [edit, setEdit] = useState("");
    const [users, setUsers] = useState([]);
    const [duyet, setDuyet] = useState(1);
    const [dsChame, setDsChame] = useState([]);
    const [dsBacsi, setDsBacsi] = useState([]);
    const [dsAdmin, setDsAdmin] = useState([]);
    const [search, setSearch] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    let listChaMe = [];
    let listBacSi = [];
    let listAdmin = [];

    useEffect(() => {
        let isMounted = true;
        const getUsers = async () => {
            const respone = await axiosPrivate.get("/user");
            isMounted && setUsers(respone.data.users);
            console.log(respone.data.users);
        
     

            for (let i = 0; i < respone.data.users.length; i++) {
                if (respone.data.users[i].role === "parent") {
                    listChaMe.push(respone.data.users[i]);
                } else if (respone.data.users[i].role === "doctor") {
                    listBacSi.push(respone.data.users[i]);
                } else if (respone.data.users[i].role === "admin") {
                    listAdmin.push(respone.data.users[i]);
                }

            }

            // console.log(listChaMe);
            isMounted && setDsChame(listChaMe);
            isMounted && setDsBacsi(listBacSi);
            isMounted && setDsAdmin(listAdmin);
            // console.log("Tổng có " + count);
            setLoading(false);
        };
        getUsers();
        return () => (isMounted = false);
    }, [loading]);

    const onChangeFullName = (e) => {
        const fullName = e.target.value;
        setfullName(fullName);
    };
    const onChangeGender = (e) => {
        const gender = e.target.value;
        console.log(gender);
        setGender(gender);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const showPassword = () => {
        setPasswordShown(!passwordShown);
    };
    const onChangeRole = (e) => {
        const role = e.target.value;
        setRole(role);
    };

    //truyen
    useEffect(() => {
        if (edit) {
            setfullName(edit.fullName);
            setEmail(edit.email);
            setPassword(edit.password);
            setRole(edit.role);
        }
    }, [edit]);

    const handleChangeList = (e) => {
        // console.log(e);
        setDuyet(e);
    };


    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage("");
        if (edit) {
            if (
                edit.fullName === fullName &&
                edit.email === email &&
                edit.password === password &&
                edit.role === role
            )
                return;
            try {
                const id = edit.id;
                const response = await axiosPrivate.post(`/user/${id}`, {
                    fullName: fullName,
                    email: email,
                    password: password,
                    role: role,
                });

                setEdit("");
                setSuccessful(true);
                setLoading(true);
                setMessage(response.data.msg);
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    setSuccessful(false);
                    setLoading(false);
                    setMessage(error.response.data.msg);
                }
            }
        } else {
            try {
                const response = await axiosPrivate.post("/user", {
                    fullName: fullName,
                    email: email,
                    password: password,
                    gender: gender,
                    role: role,
                });
                setfullName("");
                setEmail("");
                setPassword("");
                setRole("");
                swal("Thêm người đùng thành công!", {
                    icon: "success",
                });
                setLoading(true);
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    // console.log(password);
                    setMessage(error.response.data.msg);
                    setSuccessful(false);
                }
            }
        }
    };
    const handleCancel = () => {
        setEdit("");
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
                axiosPrivate.delete(`/user/${id}`);
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
    const handleSreach = (rows) => {
        return rows.filter(
            (row) =>
                row.fullName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.email.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
    };

    return (
        <div className="d-flex">
            <Sidebar style={{ overflow: "none" }}></Sidebar>
            <div className="Users_content row mt-4 ml-1 ">
                <div className="createUser col-md-3 pr-4">
                    <div className="heading">
                        <h2
                            style={{
                                color: "#2d3436",
                                fontSize: "30px",
                                fontWeight: "600",
                                marginBottom: "30px",
                                marginLeft:"40px"
                            }}
                        >
                            Tác vụ
                        </h2>
                    </div>
                    <div className="action_content">
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
                        <Form ref={form} onSubmit={handleCreate}>
                            <div className="form-group">
                                <label htmlFor="category_name">Họ Tên</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    className="form-control"
                                    value={fullName}
                                    onChange={onChangeFullName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_name">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_name">Mật khẩu</label>
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control form-control"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                                <small onClick={showPassword}>
                                    {passwordShown ? "hide" : "show"}
                                </small>
                            </div>

                            <div className="form-group my-3">
                                <input
                                    className="ml-2"
                                    type="radio"
                                    name="gender"
                                    id="gender"
                                    value="Nam"
                                    defaultChecked={gender === "Nam"}
                                    onChange={onChangeGender}
                                />
                                Nam
                                <input
                                    type="radio"
                                    className="ml-2 "
                                    name="gender"
                                    id="gender"
                                    value="Nữ"
                                    onChange={onChangeGender}
                                    defaultChecked={gender === "Nữ"}
                                />
                                Nữ
                                <input
                                    type="radio"
                                    name="gender"
                                    className="ml-2 "
                                    id="gender"
                                    value="Khác"
                                    onChange={onChangeGender}
                                    defaultChecked={gender === "Khác"}
                                />
                                Khác
                            </div>
                            <div>
                                <select
                                    style={{
                                        width: "200px",
                                        height: "30px",
                                        marginBottom: "20px",
                                        marginTop: "6px",
                                    }}
                                    onChange={onChangeRole}
                                    value={role}
                                >
                                    <option value="01">Lựa chọn chức vụ</option>
                                    <option value="doctor" name="doctor">
                                        Bác sĩ
                                    </option>
                                    <option value="admin" name="role">
                                        Quản lý{" "}
                                    </option>
                                </select>
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="category_name">Chức vụ</label>
                                <input
                                    type="text"
                                    name="role"
                                    id="role"
                                    className="form-control"
                                    value={role}
                                    onChange={onChangeRole}
                                />
                            </div> */}
                            <div>
                                <button
                                    className="btn btn-primary "
                                    type="submit"
                                >
                                    Thêm
                                </button>
                                {/* <button
                                    className="btn btn-primary "
                                    type="submit"
                                >
                                    {edit ? "Cập nhập" : "Thêm"}
                                </button> */}
                            </div>
                        </Form>
                        <button
                            className="btn btn-dark my-2 "
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="list_user col-md-9">
                    <h2
                        style={{
                            color: "#0984e3",
                            fontSize: "30px",
                            fontWeight: "500",
                            marginBottom: "20px",
                        }}
                    >
                        Danh sách tài khoản người đùng
                    </h2>

                    <div
                        className="form_check_all d-flex my-2"
                        style={{ paddingLeft: "230px" }}
                    >
                        <h5>Lựa chọn chức vụ: </h5>

                        <div className="form-check ml-2">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="nguoidung"
                                id="flexRadioDefault1"
                                onClick={() => handleChangeList(1)}
                                defaultChecked={duyet === 1}
                            />

                            <label className="form-check-label">Cha mẹ</label>
                        </div>
                        <div className="form-check ml-2">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="nguoidung"
                                id="flexRadioDefault2"
                                // onClick={handleChange}
                                onClick={() => handleChangeList(2)}
                                defaultChecked={duyet === 2}
                            />

                            <label className="form-check-label">Bác sĩ </label>
                        </div>
                        <div className="form-check ml-2">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="nguoidung"
                                id="flexRadioDefault3"
                                onClick={() => handleChangeList(3)}
                                defaultChecked={duyet === 3}

                                // onClick={handleChangeList}
                                // onClick={handleChange}
                            />

                            <label className="form-check-label">Quản lý </label>
                        </div>
                    </div>
                    <form
                        className="d-flex my-2"
                        style={{ paddingLeft: "230px" }}
                    >
                        <label className="form-label" htmlFor="form3Example4cd" style={{fontSize:"19px", fontWeight:"600", paddingTop:"2px", paddingRight:"10px"}}>
                            Tìm kiếm người dùng:
                        </label>
                        <input
                        id="form3Example4cd"
                            className="form-control form-control-md col-4 mr-3"
                            type="search"
                            placeholder="anh@gmail.com"
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
                    <div className="list_user_content">
                        <table
                            className="table_group  "
                            style={{ backgroundColor: "#e8f5f9d4" }}
                        >
                            <thead style={{ backgroundColor: "#3498db" }}>
                                <tr>
                                    <td>STT</td>
                                    <td>Họ tên</td>
                                    <td>Hình ảnh</td>
                                    <td>Email</td>
                                    <td>Giới tính</td>
                                    <td>Ngày đăng ký</td>
                                    <td>Hành động</td>
                                </tr>
                            </thead>

                            <tbody>
                                {duyet === 3 ? (
                                    <>
                                        {/* Duyet DS Admin */}
                                        {handleSreach(dsAdmin).map(
                                            (user, index) => (
                                                <tr key={user.id}>
                                                    <td>{index+1}</td>
                                                    <td>
                                                        {" "}
                                                        <Link
                                                            to={`/profile/${user.id}`}
                                                            className="card-title"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            {user.fullName}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={user.avatar}
                                                            alt=""
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                borderRadius:
                                                                    "50%",
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>{user.gender}</td>
                                                    <td>
                                                        {new Date(
                                                            user.createAt
                                                        ).toLocaleString([], {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </td>
                                                    <td>
                                                        {/* <i
                                                        className="far fa-edit"
                                                        onClick={() =>
                                                            setEdit(user)
                                                        }
                                                    ></i> */}
                                                        <i
                                                        title="Khóa tài khoản"
                                                            className="far fa-trash-alt"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id
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
                                        {duyet === 1 ? (
                                            <>
                                                {/* Duyet DS Cha mẹ */}
                                                {handleSreach(dsChame).map(
                                                    (user, index) => (
                                                        <tr key={user.id}>
                                                            <td>{index+1}</td>
                                                            <td>
                                                                {" "}
                                                                <Link
                                                                    to={`/profile/${user.id}`}
                                                                    className="card-title"
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {
                                                                        user.fullName
                                                                    }
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={
                                                                        user.avatar
                                                                    }
                                                                    alt=""
                                                                    style={{
                                                                        width: "50px",
                                                                        height: "50px",
                                                                        borderRadius:
                                                                            "50%",
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {user.email}
                                                            </td>
                                                            <td>
                                                                {user.gender}
                                                            </td>
                                                            <td>
                                                                {new Date(
                                                                    user.createAt
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
                                                                {/* <i
                                                                className="far fa-edit"
                                                                onClick={() =>
                                                                    setEdit(
                                                                        user
                                                                    )
                                                                }
                                                            ></i> */}
                                                            {user.isBanned === 0 ?(
                                                                           <i
                                                                           className="far fa-trash-alt"
                                                                           title="Khóa tài khoản"
                                                                           onClick={() =>
                                                                               handleDelete(
                                                                                   user.id
                                                                               )
                                                                           }
                                                                       ></i>
                                                            ): (
                                                                <i
                                                                className="far fa-trash-alt"
                                                                title="Tài khoản đã khóa"
                                                                style={{cursor:"text", color:"#ea8685"}}
                                                    
                                                            ></i>
                                                            )}
                                                     
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {/* Duyet DS Bac si */}
                                                {handleSreach(dsBacsi).map(
                                                    (user, index) => (
                                                        <tr key={user.id}>
                                                          <td>{index+1}</td>
                                                            <td>
                                                                {" "}
                                                                <Link
                                                                    to={`/profile/${user.id}`}
                                                                    className="card-title"
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {
                                                                        user.fullName
                                                                    }
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={
                                                                        user.avatar
                                                                    }
                                                                    alt=""
                                                                    style={{
                                                                        width: "50px",
                                                                        height: "50px",
                                                                        borderRadius:
                                                                            "50%",
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {user.email}
                                                            </td>
                                                            <td>
                                                                {user.gender}
                                                            </td>
                                                            <td>
                                                                {new Date(
                                                                    user.createAt
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
                                                                {/* <i
                                                                className="far fa-edit"
                                                                onClick={() =>
                                                                    setEdit(
                                                                        user
                                                                    )
                                                                }
                                                            ></i> */}
                                                                <i
                                                                 title="Khóa tài khoản"
                                                                    className="far fa-trash-alt"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            user.id
                                                                        )
                                                                    }
                                                                ></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
