import axios from "axios";

function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/tdcm");
};
const TrinhDoChuyenMonService = {
  getAll,
};
export default TrinhDoChuyenMonService;
