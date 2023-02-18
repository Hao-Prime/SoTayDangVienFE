import axios from "axios";

function themFileVanBan(files) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/par/files/vanban", files);
};
function xoaFileVanBan(ids) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/par/files?id=" + ids);
};

const FileService = {
  themFileVanBan,
  xoaFileVanBan,
};
export default FileService;
