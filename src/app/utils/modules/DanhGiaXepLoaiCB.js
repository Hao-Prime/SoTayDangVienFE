import FormatDate from "app/common/FormatDate";
const danhGiaXepLoaiCB = {
    "id": null,
    "phanLoai": null,
    "moTa": null,
    "nam": null,
    "chiBo": null,
}

function getDanhGiaXepLoaiCBThem(chiBo) {
    return {
        "phanLoai": null,
        "moTa": null,
        "nam": null,
        "chiBo": chiBo,
    };
};
function getDanhGiaXepLoaiCB() {
    return danhGiaXepLoaiCB;
}
function kiemTaDanhGiaXepLoaiCB(danhGiaXepLoaiCB) {
    return "";

}
const danhGiaXepLoaiCBUtil = {
    getDanhGiaXepLoaiCBThem,
    getDanhGiaXepLoaiCB,
    kiemTaDanhGiaXepLoaiCB

};
export default danhGiaXepLoaiCBUtil;