import axios from "axios";

function them(danhGiaDV) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/danggiadv", danhGiaDV);
};

function themList(listDanhGiaDV) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/danggiadv/savelist", listDanhGiaDV);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/danggiadv");
};
function capNhat(danhGiaDV) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/danggiadv", danhGiaDV);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/danggiadv?id=" + ids);
};

const DanhGiaDVService = {
  themList,
  them,
  getAll,
  capNhat,
  xoa,
};
export default DanhGiaDVService;
