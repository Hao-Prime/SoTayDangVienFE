import axios from "axios";

function them(quaTrinhSinhHoat) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/qtsh", quaTrinhSinhHoat);
};
function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/qtsh");
};
function capNhat(quaTrinhSinhHoat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/par/qtsh", quaTrinhSinhHoat);
};
function xoa(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/qtsh?id=" + ids);
};

const QuaTrinhSinhHoatService = {
  them,
  getAll,
  capNhat,
  xoa

};
export default QuaTrinhSinhHoatService;
