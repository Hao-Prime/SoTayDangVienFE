import axios from "axios";

function them(dangVien) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/dangvien", dangVien);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/dangvien");
};
function capNhat(dangVien) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/dangvien", dangVien);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/dangvien?id=" + ids);
};
function getChiTietDangVien(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/dangvien/detail?id=" + id);
};
function getListVanBan(idDV) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/dangvien/vanbandangvien?id=" + idDV);
};
function getSelect() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/dangvien/select");
};
const DangVienService = {
  getListVanBan,
  them,
  getAll,
  capNhat,
  xoa,
  getChiTietDangVien,
  getSelect

};
export default DangVienService;
