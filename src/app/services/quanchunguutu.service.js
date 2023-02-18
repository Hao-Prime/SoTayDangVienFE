import axios from "axios";

function them(qCUT) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/qcut", qCUT);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/qcut");
};
function capNhat(qCUT) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/qcut", qCUT);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/qcut?id=" + ids);
};
function getChiTietQCUT(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/qcut/detail?id=" + id);
};
const QCUTService = {
  them,
  getAll,
  capNhat,
  xoa,
  getChiTietQCUT

};
export default QCUTService;
