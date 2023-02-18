import axios from "axios";

function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/dangbo");
};
const DangBoService = {
  getAll,
};
export default DangBoService;
