import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
const OtherProfile = ({ id }) => {
  const [other, setOther] = useState("");
  useEffect(() => {
    let isMounted = true;
    const getOtherInfor = async () => {
      const response = await axios.get(`user/${id}`);
      isMounted && setOther(response.data.user[0]);
    };
    getOtherInfor();
    return () => (isMounted = false);
  }, [id]);
  
  return (
  
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={other.avatar} alt="avatar" />
      </div>
      <div className="mt-3">
        <h4>{other.fullName}</h4>
        <div>
          Email:
          <span className="text-info ml-2 font-size-sm">{other.email}</span>
        </div>
        {other.phoneNumber && (
          <div className="my-2">
            Số điện thoại:
            <span className="text-info ml-2 font-size-sm">{other.phoneNumber}</span>
          </div>
        )}
        {
          other.role ==='doctor' && (
            <div className="my-2">
            Chức vụ
            <span className="text-info ml-2 font-size-sm">Bác sĩ</span>
          </div>
          )
        }
         {
          other.role ==='admin' && (
            <div className="my-2">
            Chức vụ
            <span className="text-info ml-2 font-size-sm">admin</span>
          </div>
          )
        }
          {
          other.isBanned === 1 && (
            <div className="my-2">
            Trạng thái
            <span className="text-danger ml-2 font-size-sm">Bị khóa</span>
          </div>
          )
        }
        <div className="my-1">
          Giới tính:
          <span className="text-info ml-2 font-size-sm ">{other.gender}</span>
        </div>
        <div>
          Ngày tham gia:
          <span style={{ color: "#ffc107" }}>
            {new Date(other.createAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
