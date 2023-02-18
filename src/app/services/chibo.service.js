import axios from "axios";

function them(chiBo) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/chibo", chiBo);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/chibo");
};
function getSelect() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/chibo/select");
};
function capNhat(chiBo) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/chibo", chiBo);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/chibo?id=" + ids);
};
function getChiTietChiBo(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/chibo/detail?id=" + id);
};
const ChiBoService = {
  them,
  getAll,
  getSelect,
  capNhat,
  xoa,
  getChiTietChiBo

};
export default ChiBoService;
