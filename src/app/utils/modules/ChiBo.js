import FormatDate from "app/common/FormatDate";
const chiBo = {
    "id": null,
    "ten": null,
    "ngayThanhLap": null,
    "moTa": null,
    "dangBo": null
}

function getChiBoThem() {
    return {
        "ten": null,
        "ngayThanhLap": null,
        "moTa": null,
        "dangBo": null
    };
};
function getChiBo() {
    return chiBo;
}
function kiemTaChiBo(chiBo) {
    return "";
}
const chiBoUtil = {
    getChiBoThem,
    getChiBo,
    kiemTaChiBo

};
export default chiBoUtil;