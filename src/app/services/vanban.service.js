import axios from "axios";

function them(vanBan) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/vanban", vanBan);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/vanban");
};
function getDangXuLy() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/vanban/dangxuly");
};
function getDaXuLy() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/vanban/daxuly");
};
function capNhat(vanBan) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/vanban", vanBan);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/vanban?id=" + ids);
};
function getChiTietVanBan(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/vanban/detail?id=" + id);
};
function getListDangVien(idVB) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/vanban/vanbandangvien?id=" + idVB);
};
function getListCongViec(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/vanban/vanbancongviec?id=" + id);
};
const VanBanService = {
  getListDangVien,
  getListCongViec,
  them,
  getAll,
  getDangXuLy,
  getDaXuLy,
  capNhat,
  xoa,
  getChiTietVanBan

};
export default VanBanService;
