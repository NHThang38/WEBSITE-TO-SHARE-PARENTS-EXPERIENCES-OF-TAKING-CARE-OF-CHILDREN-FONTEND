export const validPost = ({
  title,
  thumbnail,
  description,
  content,
  category,
}) => {
  const err = [];
  let swear = [
    "asshole",
    "bastard",
    "bitch",
    "bollocks",
    "bugger",
    "bullshit",
    "crap",
    "frigger",
    "fuck",
    "fuckyou",
    "địt",
    "đéo",
    "cặc",
    "nứng",
    "loz",
    "đĩ",
    "điếm",
    "duma",
    "dume",
    "chịch",
    "đụ má",
    "đụ mẹ",
    "tổ cha mày",
    "con gái mẹ mày",
    "thằng cha mày",
  ];
  const foundSwear = swear.filter(
    (word) =>
      title.toLowerCase().includes(word.toLowerCase()) ||
      content.toLowerCase().includes(word.toLowerCase())
  );
  if (title.trim().length < 10) {
    err.push("tiêu đề phải chứa ít nhất 10 ký tự");
  } else if (title.trim().length > 200) {
    err.push("tiêu đề không vượt quá 200 ký tự");
  }
  if (content.trim().length > 6000) {
    err.push("Nội dung không vượt quá 6000 ký tự");
  } else if(content.trim().length < 20){
    err.push("Nội dung phải chứa ít nhất 20 ký tự");
  }
  if (description.trim().length < 10) {
    err.push("Mô tả phải chứa ít nhất 10 ký tự");
  } else if (description.trim().length > 500) {
    err.push("Mô tả không vượt quá 300 ký tự");
  }
  if (!thumbnail) {
    err.push("Ảnh mô tả không được để trống");
  }
  if (!category) {
    err.push("Danh mục không được để trống");
  }
  if (foundSwear.length) {
    err.push("Bài viết không được chứa ngôn từ thô tục");
  }
  return {
    errMsg: err,
    errLength: err.length,
  };
};
export const validUserPost = ({
  title,
  content,
  category,
}) => {
  const err = [];
  let swear = [
    "arse",
    "ass",
    "asshole",
    "bastard",
    "bitch",
    "bollocks",
    "bugger",
    "bullshit",
    "crap",
    "damn",
    "frigger",
    "fuck",
    "fuckyou",
    "địt",
    "đụ",
    "đù",
    "đéo",
    "cặc",
    "lồn",
    "nứng",
    "dcm",
    "dm",
    "dcmm",
    "vcl",
    "vc",
    "cc",
    "loz",
    "cl",
    "đĩ",
    "điếm",
    "vl",
    "duma",
    "dume",
    "chịch",
    "cái l",
    "đụ má",
    "đụ mẹ",
    "tổ cha mày",
    "con gái mẹ mày",
    "thằng cha mày",
  ];
  const foundSwear = swear.filter(
    (word) =>
      title.toLowerCase().includes(word.toLowerCase()) ||
      content.toLowerCase().includes(word.toLowerCase())
  );
  if (title.trim().length < 10) {
    err.push("tiêu đề phải chứa ít nhất 10 ký tự");
  } else if (title.trim().length > 200) {
    err.push("tiêu đề không vượt quá 200 ký tự");
  }
  if (content.trim().length > 6000) {
    err.push("Nội dung không vượt quá 6000 ký tự");
  } else if(content.trim().length < 20){
    err.push("Nội dung phải chứa ít nhất 20 ký tự");
  }
  if (!category) {
    err.push("Danh mục không được để trống");
  }
  if (foundSwear.length) {
    err.push("Bài viết không được chứa ngôn từ thô tục");
  }
  return {
    errMsg: err,
    errLength: err.length,
  };
};
export const shallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};
