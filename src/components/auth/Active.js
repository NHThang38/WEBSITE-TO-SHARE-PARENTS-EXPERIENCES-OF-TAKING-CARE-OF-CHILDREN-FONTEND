import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
const Active = () => {
    document.title ="kích hoạt tài khoản"
    const [sucess, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const { token } = useParams();
    useEffect(() => {
        if (token) {
            axios
                .post("auth/active", { activeToken: token })
                .then((res) => setMessage(res.data.msg), setSuccess(true))
                .catch(
                    (error) => setMessage(error.response.data.message),
                    setSuccess(false)
                );
        }
    }, [token]);
    return (
        <div>
            {message && (
                <div style={{marginBottom:"360px"}}>
                    <div
                        className={
                            sucess
                                ? "alert alert-success"
                                : "alert alert-danger"
                        }
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Active;
