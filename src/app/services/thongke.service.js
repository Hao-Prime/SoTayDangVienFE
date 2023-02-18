import axios from "axios";

function getTongSoLuongDashboard() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/soluongchung");
};
function getTiLeChucVuDangVien() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/soluongchucvu");
};
function getSoLuongChiTiet() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/soluongchitiet");
};
function getThongKeDanhGiaChiBo() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/chibo/danhgia");
};
function getThongKeThongTinDangVienChiBo() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/chibo/dangvien");
};
function getThongKeDangVienXuatSac() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/dangvien/xuatsac");
};
function getBaoCaoKetQuaDanhGia(nam) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/thongke/dangvien/baocaketquadanhgia?nam=" + nam);
};
const ThongKeService = {
  getTongSoLuongDashboard,
  getThongKeThongTinDangVienChiBo,
  getTiLeChucVuDangVien,
  getSoLuongChiTiet,
  getThongKeDanhGiaChiBo,
  getThongKeDangVienXuatSac,
  getBaoCaoKetQuaDanhGia
};
export default ThongKeService;
