import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "../../style/login.css";
import CheckButton from "react-validation/build/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">Trường bắt buộc nhập!</div>
    );
  }
};
const Login = () => {
  document.title ="Đăng nhập"
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (checkBtn.current.context._errors.length === 0) {
      try {
        const response = await axiosPrivate.post("auth/login", {
          email: email,
          password: password,
        });
        const from = location?.state?.from?.pathname || "/";
        const user = response.data.user[0];
        const acessToken = response.data.acessToken;
        
        setAuth({ user, acessToken });
        if(user.role==='admin'){
          navigate('/admin/statis')
        }else{
          navigate(from, { replace: true });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          setMessage(error.response.data.msg);
        }
      }
    }
  };
  return (
    <section className="">
      <div className="container pt-5 ">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
             src="https://i.pinimg.com/736x/f8/b9/5d/f8b95dc68a962e181a0bb98d2ef39cbb--family-rules-happy-family.jpg"
              className="img-fluid"
              alt="Phone "
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <p
              className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
              style={{ color: "black" }}
            >
              ĐĂNG NHẬP
            </p>
            <Form onSubmit={handleLogin} ref={form}>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <div className="form-outline mb-2">
                <Input
                  type="text"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                />
                <label
                  className="form-label"
                  htmlFor="form1Example13"
                  style={{ color: "black" }}
                >
                  Email
                </label>
              </div>
              <div className="form-outline mb-4">
                <Input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
                <label
                  className="form-label"
                  htmlFor="form1Example23"
                  style={{ color: "black" }}
                >
                  Mật khẩu
                </label>
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                <Link to="/forgot-password">Quên mật khẩu?</Link>
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                <p style={{ color: "black" }}>
                  Chưa có tài khoản ?<Link to="/register">Đăng ký ngay</Link>
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Đăng nhập
              </button>


              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
