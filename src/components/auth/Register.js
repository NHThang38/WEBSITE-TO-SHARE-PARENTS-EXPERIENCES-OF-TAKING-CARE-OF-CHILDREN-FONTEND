import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { axiosPrivate } from "../../api/axios";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">Trường bắt buộc nhập</div>
        );
    }
};
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                Email không đúng định dạng
            </div>
        );
    }
};
const vpassword = (value) => {
    if (value.length < 8) {
        return (
            <div className="invalid-feedback d-block">
                Mật khẩu tối thiểu 8 ký tự
            </div>
        );
    }
};

const Register = () => {
    document.title = "Đăng ký";
    const form = useRef();
    const checkBtn = useRef();
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [confPassword, setConfPassword] = useState("");
    const [agree, setAgree] = useState(true);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const onChangeFullName = (e) => {
        const fullName = e.target.value;
        setfullName(fullName);
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
    const onChangeConfPassword = (e) => {
        const confPassword = e.target.value;
        setConfPassword(confPassword);
    };
    const checkBoxHandle = () => {
        setAgree(!agree);
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        if (checkBtn.current.context._errors.length === 0) {
            try {
                if (!agree) {
                    setMessage(
                        "Bạn chưa đồng ý qui định - điều khoản sử dụng diễn đàn"
                    );
                    setSuccessful(false);
                } else {
                    await axiosPrivate
                        .post("auth/register", {
                            fullName: fullName,
                            email: email,
                            password: password,
                            confPassword: confPassword,
                        })
                        .then((response) => {
                            setMessage(response.data.msg);
                            setSuccessful(true);
                            setTimeout(() => {
                                navigate("/login");
                            }, 2000);
                        });
                }
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    setMessage(error.response.data.msg);
                    setSuccessful(false);
                }
            }
        }
    };
    return (
        <section
            className=""
            style={{ backgroundColor: "#eee", height: "731px" }}
        >
            <div className="container ">
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col-lg-12 col-xl-11">
                        <div
                            className="card text-black"
                            style={{ borderradius: "25px" }}
                        >
                            <div className="card-body p-md-3">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 ">
                                            Đăng ký
                                        </p>

                                        <Form
                                            className="mx-1 mx-md-4"
                                            onSubmit={handleRegister}
                                            ref={form}
                                        >
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
                                            {!successful && (
                                                <div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fa fa-user fa-lg me-3 mt-4 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="form3Example1c"
                                                            >
                                                                Họ và tên
                                                            </label>
                                                            <Input
                                                                type="text"
                                                                name="fullName"
                                                                id="form3Example1c"
                                                                className="form-control"
                                                                value={fullName}
                                                                onChange={
                                                                    onChangeFullName
                                                                }
                                                                validations={[
                                                                    required,
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-2">
                                                        <i className="fa fa-envelope fa-lg me-3 mt-4 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="form3Example3c"
                                                            >
                                                                Email
                                                            </label>
                                                            <Input
                                                                type="email"
                                                                id="form3Example3c"
                                                                className="form-control"
                                                                value={email}
                                                                onChange={
                                                                    onChangeEmail
                                                                }
                                                                validations={[
                                                                    required,
                                                                    validEmail,
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="form3Example4c"
                                                            >
                                                                Mật khẩu
                                                            </label>
                                                            <Input
                                                                type={
                                                                    passwordShown
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                id="form3Example4c"
                                                                className="form-control"
                                                                value={password}
                                                                onChange={
                                                                    onChangePassword
                                                                }
                                                                validations={[
                                                                    required,
                                                                    vpassword,
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fa fa-key fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="form3Example4cd"
                                                            >
                                                                Nhập lại mật
                                                                khẩu
                                                            </label>
                                                            <Input
                                                                type={
                                                                    passwordShown
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                id="form3Example4cd"
                                                                className="form-control"
                                                                value={
                                                                    confPassword
                                                                }
                                                                onChange={
                                                                    onChangeConfPassword
                                                                }
                                                                validations={[
                                                                    required,
                                                                ]}
                                                            />

                                                            <small
                                                                onClick={
                                                                    showPassword
                                                                }
                                                            >
                                                                {passwordShown
                                                                    ? "hide"
                                                                    : "show"}
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <Input
                                                            className="form-check-input me-2"
                                                            type="checkbox"
                                                            checked={agree}
                                                            id="agree"
                                                            onChange={
                                                                checkBoxHandle
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="agree"
                                                        >
                                                            Tôi đồng ý với tất
                                                            cả{" "}
                                                            <Link to={"/rules"}>
                                                                Thoả Thuận Về
                                                                Điều Khoản và
                                                                Điều Kiện Sử
                                                                Dụng
                                                            </Link>
                                                        </label>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button className="btn btn-primary btn-lg">
                                                            Đăng ký
                                                        </button>
                                                        <Link
                                                            to="/login"
                                                            className="btn btn-primary btn-lg"
                                                            style={{
                                                                marginLeft:
                                                                    "10px",
                                                            }}
                                                        >
                                                            Cancel
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                            <CheckButton
                                                disabled={!agree}
                                                style={{ display: "none" }}
                                                ref={checkBtn}
                                            />
                                        </Form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://i.pinimg.com/736x/f8/b9/5d/f8b95dc68a962e181a0bb98d2ef39cbb--family-rules-happy-family.jpg"
                                            alt="profile-img"
                                            width={"600px"}
                                            height={"500px"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Register;
