import { Route, Routes } from "react-router-dom";
import React from "react";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.min.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAdmin from "./components/auth/RequireAdmin";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import Profile from "./components/profile/Profile";
import CategoryManagement from "./components/admin/CategoryManagement";
import PostByCategory from "./components/post_info/PostByCategory";
import PostDetail from "./components/post_info/PostDetail";
import UpdatePost from "./components/post_info/UpdatePost";
import Users from "./components/admin/Users";
import Posts from "./components/admin/Posts";
import Statistical from "./components/admin/Statistical";
import Active from "./components/auth/Active";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import AdminHeader from "./components/admin/AdminHeader";
import useAuth from "./hooks/useAuth";
import Reports from "./components/admin/Reports";
import Rules from "./components/Rules";
import Guide from "./components/Guide";
import Footer from "./components/Footer";
import Forum from "./components/Forum";
import Notification from "./components/Notification";
import { useEffect, useContext } from "react";
import { DataContext } from "./context/GlobalContext";

function App() {
  const { auth } = useAuth();
  const { socket } = useContext(DataContext);
  const userId = auth?.user?.id;
  useEffect(() => {
    if (socket) {
      socket.emit("newUser", userId);
    }
  }, [socket, userId]);
  return (
    <div>
      {auth?.user?.role === "admin" ? <AdminHeader /> : <Navbar />}
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/rules" element={<Rules />}></Route>
        <Route exact path="/guide" element={<Guide />}></Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/forum" element={<Forum />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/forgot-password/:token"
          element={<ChangePassword />}
        />
        <Route exact path="/active/:token" element={<Active />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route exact path="/p/:categoryName" element={<PostByCategory />} />
        <Route exact path="/post/:id" element={<PostDetail />} />
        <Route element={<RequireAuth />}>
          <Route element={<PersistLogin />}>
            <Route exact path="/notification" element={<Notification />} />
            <Route exact path="/updatePost/:id" element={<UpdatePost />} />
            <Route exact path="/p/create" element={<CreatePost />} />
          </Route>
          </Route>
          <Route element={<RequireAdmin />}>
            <Route element={<PersistLogin />}>
              <Route
                exact
                path="admin/category"
                element={<CategoryManagement />}
              />
              <Route exact path="/admin/allUser" element={<UserList />} />
              <Route exact path="/admin/users" element={<Users />} />
              <Route exact path="/admin/posts" element={<Posts />} />
              <Route exact path="/admin/reports" element={<Reports />} />
              <Route exact path="/admin/statis" element={<Statistical />} />
            </Route>
          </Route>

      </Routes>
      {auth?.user?.role !== "admin" && <Footer />}
    </div>
  );
}

export default App;
