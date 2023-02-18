import axios from "axios";

function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/cvd");
};
const ChucVuDangService = {
  getAll,
};
export default ChucVuDangService;
