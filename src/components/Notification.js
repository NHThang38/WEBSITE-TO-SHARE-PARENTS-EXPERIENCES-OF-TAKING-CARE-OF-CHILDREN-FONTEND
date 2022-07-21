/* eslint-disable */ 
import React from "react";
import { useEffect, useState,useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../style/Notification.css";
import { DataContext } from "../context/GlobalContext";
import useAuth from "../hooks/useAuth";
import moment from 'moment'
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const {auth} = useAuth();
  const {isReaded, setIsReaded } = useContext(DataContext);
  const [readed,setReaded] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const isActiveTab = (tab) => {
    if (tab === readed) return "active";
    return "";
  };
  useEffect(() => {
    let isMounted = true;
    const getNotification = async () => {
      const response = await axiosPrivate.get(
        `/notification/${auth?.user?.id}?readed=${readed}`
      );
      isMounted && setNotification(response.data);
      isMounted && setIsReaded(false);
    };
    getNotification();
    return () => (isMounted = false);
  }, [auth?.user?.id, isReaded,readed]);
  const handleReaded = async (id) => {
    await axiosPrivate.post("/notification/read", { id });
    setIsReaded(true);
};
const handleDelete = async (id) => {
  await axiosPrivate.delete(`/notification/${id}`);
  setIsReaded(true);
};
  return (
    <div>
      <section className="section-50">
        <div className="container">
          <h3 className="m-b-50 heading-line">
            Thông báo <i className="fa fa-bell text-muted"></i>
          </h3>
          <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li
              className="nav-item"
              role="presentation"
              onClick={() => setReaded(1)}
              style={{ cursor: "default" }}
            >
              <span
                className={`nav-link ${isActiveTab(1)}`}
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected={`${isActiveTab(1)}`}
              >
                Đã xem
              </span>
            </li>
            <li
              className="nav-item"
              role="presentation"
              onClick={() => setReaded(0)}
              style={{ cursor: "default" }}
            >
              <span
                className={`nav-link ${isActiveTab(0)}`}
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-2"
              >
                Chưa xem
              </span>
            </li>
          </ul>

          <div className="notification-ui_dd-content">
            {
              notification.length ===0 &&(
                <div className="notification-list notification-list--unread">
                  Không có thông báo
                </div>

              )
            }
            {notification.map((notification,index)=>(         
            <div key={index} className="notification-list notification-list--unread">
              <div className="notification-list_content">
                <div className="notification-list_detail">
                  <p>
                    {notification.message}
                  </p>
                  <p className="text-muted">
                    <small>{moment(notification.createdAt).fromNow()}</small>
                  </p>
                </div>
              </div>
    
              <div className="notification-list_options mt-2 mr-4">
                {notification.readed===0&& (
                <i className="fa fa-check text-info" title="Đã xem" onClick={()=>handleReaded(notification.id)}/>
                )}
                <i className="fa fa-times text-danger ml-2" title="Xóa thông báo" onClick={()=>handleDelete(notification.id)}/>
              </div>
        
            </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notification;
