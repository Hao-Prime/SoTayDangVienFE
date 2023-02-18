import axios from "axios";


function getPage(page, limit) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/par/lichsu/getpage?page=" + page + "&size=" + limit + "");
};


const LichSuService = {
  getPage,
};
export default LichSuService;
