 /* eslint-disable */
import { useState,useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Form from "react-validation/build/form";
import "../../style/profile.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
const UserProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth,setLoading } = useAuth();
  const form = useRef();
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatar, setAvatar] = useState("");
  toast.configure();
  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setfullName(fullName);
  };
  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
console.log(gender);
  };
  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };
  const onChangeDoB = (e) => {
    const dateOfBirth = e.target.value;
    setDateOfBirth(dateOfBirth);
  };
  const onChangeAvatar = (e) => {
    const files = e.target.files;
    if(files){
      const file =files[0];
      setAvatar(file);
    }
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handleUpdate = async (e) =>{
    e.preventDefault();
    let image_url ="";
   try {
    setLoading(true)
     if(avatar){
       const check =checkImage(avatar)
       if(check){
        return toast.error(check,{osition: toast.POSITION.TOP_RIGHT, autoClose: 2000})
       }
       const photo = await imageUpload(avatar); 
       image_url=photo.url 
     } 
     await axiosPrivate.post('/user/profile',{
       fullName:fullName ? fullName: auth.user.fullName,
       gender: gender ? gender: auth.user.gender,
       phoneNumber: phoneNumber ? phoneNumber: auth.user.phoneNumber,
       avatar: image_url ? image_url: auth.user.avatar,
       dateOfBirth: dateOfBirth ? dateOfBirth: auth.user.dateOfBirth
     }).then(
      toast.success("Cập nhập thành công",{position: toast.POSITION.TOP_RIGHT, autoClose: 2000}), 
      setLoading(false)
     )
   } catch (error) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg, { position: toast.POSITION.TOP_LEFT, autoClose: 5000 })
    }
   }
  }
  return (
    <Form className="profile_info " onSubmit={handleUpdate} ref={form}>
       <h4 >Thông tin cá nhân: </h4>
      <div className="info_avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar}
          alt="avatar"
        />
        <span>
          <i className="fa fa-camera" />
          <p>Change</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={onChangeAvatar}
          />
        </span>
      </div>
      <div className="form-group my-3">
        <label htmlFor="fullName">Họ và tên</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          defaultValue={auth.user.fullName}
          className="form-control"
          onChange={onChangeFullName}
        />
      </div>
      <div className="form-group my-3">
        <input
          className="ml-2"
          type="radio"
          name="gender"
          id="gender"
          value="Nam"
         defaultChecked ={auth.user.gender==="Nam"}
          onClick={onChangeGender}
        />
        Nam
        <input
          type="radio"
          className="ml-2 "
          name="gender"
          id="gender"
          value="Nữ"
          defaultChecked ={auth.user.gender === "Nữ"}
          onClick={onChangeGender}
        />
        Nữ
        <input
          type="radio"
          name="gender"
          className="ml-2 "
          id="gender"
          value="Khác"
          defaultChecked ={auth.user.gender ==="Khác"}
          onClick={onChangeGender}
        />
        Khác
      </div>
      <div className="form-group my-3">
        <label htmlFor="fullName">Số điện thoại</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          defaultValue={auth.user.phoneNumber}
          className="form-control"
          onChange={onChangePhoneNumber}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-control"
          defaultValue={auth.user.email}
          disabled={true}
          onChange ={onChangeEmail}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          className="form-control"
          id="dateOfBirth"
          defaultValue={auth.user.dateOfBirth}
          onChange={onChangeDoB}
        />
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Update
      </button>
    </Form>
  );
};

export default UserProfile;
