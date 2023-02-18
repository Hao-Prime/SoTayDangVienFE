import axios from "axios";

function getBanThan() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/taikhoan/banthan");
};
function doiMatKhau(nhanVien) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/taikhoan/doimatkhau", nhanVien);
};
const dangNhap = (soDienThoai, matKhau) => {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/taikhoan/dangnhap", {
    "soDienThoai": soDienThoai,
    "password": matKhau
  })
};

const taiKhoanService = {
  dangNhap,
  getBanThan,
  doiMatKhau,
};
export default taiKhoanService;