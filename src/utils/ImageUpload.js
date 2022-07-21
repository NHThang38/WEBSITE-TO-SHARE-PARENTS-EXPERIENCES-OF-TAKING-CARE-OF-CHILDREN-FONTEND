import axios from "axios";

export const checkImage = (file) => {
  let err = "";
  const types = ['image/png', 'image/jpeg','image/jpg','image/gif']
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "kích thước tối đa là 1mb";
    if(!types.includes(file.type))
    err = "Vui lòng chọn lại đúng tệp định dạng hình ảnh"
  return err;
};
export const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "zgabqwpw");
  formData.append("cloud_name", "dcmfr2ldt");
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dcmfr2ldt/upload",
    formData
  );
  const data = res.data;
  return { public_id: data.public_id, url: data.secure_url };
};
