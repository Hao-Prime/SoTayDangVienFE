import axios from "axios";

function them(congViec) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/congviec", congViec);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/congviec");
};
function getDangXuLy() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/congviec/dangxuly");
};
function getChoDanhGia() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/congviec/chodanhgia");
};
function getDaXuLy() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/congviec/daxuly");
};
function capNhat(congViec) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/congviec", congViec);
};
function capNhatNhieuCongViec(listCongViec) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/congviec/capnhatnhieu", listCongViec);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/congviec?id=" + ids);
};
function getChiTietCongViec(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/congviec/detail?id=" + id);
};
const CongViecService = {
  them,
  getAll,
  getDangXuLy,
  getChoDanhGia,
  getDaXuLy,
  capNhat,
  xoa,
  getChiTietCongViec,
  capNhatNhieuCongViec

};
export default CongViecService;
