import axios from "axios";

function them(danhGiaCB) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/danggiacb", danhGiaCB);
};

function themList(listDanhGiaCB) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/danggiacb/savelist", listDanhGiaCB);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/danggiacb");
};
function capNhat(danhGiaCB) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/danggiacb", danhGiaCB);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/danggiacb?id=" + ids);
};

const DanhGiaCBService = {
  themList,
  them,
  getAll,
  capNhat,
  xoa,
};
export default DanhGiaCBService;
