/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import axios from "axios";
import "../style/UserList.css";
export const UserList = () => {
  const [users, setUsers] = useState();
  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () =>{
       try {
         const response = await axios.get("user/getAllUser",{
           signal: controller.signal
         });
         isMounted && setUsers(response.data);
       } catch (error) {
         console.error(error)
       }
    }
    getUsers();
    return () =>{
      isMounted = false;
      controller.abort();
    }
  },[])

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="col-lg-12">
          <div className="main-box no-header clearfix">
            <div className="main-box-body clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th>
                        <span>User</span>
                      </th>
                      <th>
                        <span>Created</span>
                      </th>
                      <th className="text-center">
                        <span>Status</span>
                      </th>
                      <th>
                        <span>Email</span>
                      </th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map(user =>
                    <tr key={user?.id}>
                      <td>
                        <img
                          src={user.avatar}
                          alt=""
                        />
                        <a href="#top" className="user-link" >
                         {user.fullName}
                        </a>
                        <span className="user-subhead">{user.role}</span>
                      </td>
                      <td>{user.createAt}</td>
                      <td className="text-center">
                        <span className="label label-default">{user.status}</span>
                      </td>
                      <td>
                        <p href="#top">{user.email}</p>
                      </td>
                      <td style={{width : '20%'}}>
                        <a href="#top"  className="table-link  text-warning">
                          <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>
                        <a href="#top" className="table-link text-info">
                          <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>
                        <a href="#top" className="table-link danger">
                          <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserList;