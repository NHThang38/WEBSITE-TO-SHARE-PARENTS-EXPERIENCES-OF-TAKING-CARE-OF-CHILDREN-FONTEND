/* eslint-disable */ 
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">Trường bắt buộc nhập</div>
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
const ChangePassword = () => {
    document.title ="Đổi mật khẩu"
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [typePass, setTypePass] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("auth/reset-password", {
                    password: password,
                    repassword: repassword,
                    activeToken: token,
                })
                .then((response) => {
                    setMessage(response.data.msg);
                    setSuccessful(true);
                });
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
    };
    return (
        <div className="auth_page container padding" style={{ paddingBottom:"100px"}}>
            {message && (
                <div className="form-group">
                    <div style={{ marginBottom:"237px"}}
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
                <Form className="auth_box" onSubmit={handleSubmit}>
                    <h3 className="text-uppercase text-center mb-4">
                        Đổi mật khẩu
                    </h3>

                    <div className="form-group my-2">
                        <label htmlFor="password" className="form-label">
                           Mật khẩu
                        </label>
                        <div className="pass">
                            <Input
                                type={typePass ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                validations={[required, vpassword]}
                            />
                            <small onClick={() => setTypePass(!typePass)}>
                                {typePass ? "Hide" : "Show"}
                            </small>
                        </div>
                    </div>

                    <div className="form-group my-2">
                        <label htmlFor="password" className="form-label">
                            Xác nhận mật khẩu
                        </label>
                        <div className="pass">
                            <Input
                                type={typePass ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={repassword}
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                            <small onClick={() => setTypePass(!typePass)}>
                                {typePass ? "Hide" : "Show"}
                            </small>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 mt-2">
                        Đổi mật khẩu
                    </button>
                </Form>
            )}
        </div>
    );
};

export default ChangePassword;
