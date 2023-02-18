import axios from "axios";

function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/cvcm");
};
const ChucVuChuyenMonService = {
  getAll,
};
export default ChucVuChuyenMonService;
