import React, { useState } from "react";
import axios from "../api/axios";
const ForgotPassword = () => {
    document.title ="Quên mật khẩu"
    const [account, setAccount] = useState("");
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("auth/forgot-password", {
                    email: account,
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
        <div className="my-4 container padding" style={{ maxWidth: "500px" , height:"370px"}}>
            <h2>Quên mật khẩu?</h2>
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
                <form className="form-group" onSubmit={handleSubmit}>
                    <label htmlFor="account">Nhập Email </label>

                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            id="account"
                            name="account"
                            onChange={(e) => setAccount(e.target.value)}
                        />

                        <button
                            className="btn btn-primary mx-2 d-flex align-items-center"
                            type="submit"
                        >
                            <i className="fas fa-paper-plane me-2" /> Gửi
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
