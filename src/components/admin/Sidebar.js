 /* eslint-disable */
import React from 'react'
import {  NavLink } from "react-router-dom"
import "../../style/sidebarAdmin.css"
const Sidebar = () => {

  return (
    <div className="col-2" style={{ padding: "0px", with: "80px" }}>
    <div className="sidebar  ">
   
        <ul style={{ padding: 0 }}>
            <li
                style={{
                    background:
                        "linear-gradient(45deg, #47cebe, #ef4a82)",
                }}
            >
                <h2
                    style={{
                        color: "#130f40",
                        fontWeight: "700",
                        padding: "20px 0",
                    }}
                >
                    Trang quản lý
                </h2>
            </li>
            <li>
            <NavLink className="link" to="/admin/statis">
                    <i className="fa fa-signal"></i>
                    <div className="title">Thống kê</div>
                </NavLink>
           
            </li>

            <li >
                <NavLink className="link" to="/admin/users">
                    <i className="fas fa-user"></i>
                    <div className="title">Quản lý người dùng </div>
                </NavLink>
            </li>

            <li>
                <NavLink className="link" to="/admin/posts">
                    <i className="fab fa-leanpub"></i>
                    <div className="title">Quản lý bài viết</div>
                </NavLink>
            </li>
            
            <li>
                <NavLink className="link" to="/admin/reports">
                    <i className="fab fa-leanpub"></i>
                    <div className="title">Quản lý báo cáo</div>
                </NavLink>
            </li>
            <li>
                <NavLink className="link" to="/admin/category">
               <i className="fa fa-align-center"></i>
                    <div className="title">Quản danh mục</div>
                </NavLink>
            </li>

        </ul>
    </div>
</div>
  )
}

export default Sidebar