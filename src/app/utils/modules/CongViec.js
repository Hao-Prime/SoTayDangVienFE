import FormatDate from "app/common/FormatDate";
const congViec = {
    "id": null,
    "ten": null,
    "thoiHan": null,
    "noiDung": null,
    "ngayHoanThanh": null,
    "phanLoaiDG": null,
    "noiDungDG": null,
    "vanBan": null,
    "chiBo": null,
    "trangThai": 0,
    "listChiBo": [],

}

function getCongViecThem() {
    return {
        "ten": null,
        "ten": null,
        "thoiHan": null,
        "noiDung": null,
        "ngayHoanThanh": null,
        "phanLoaiDG": null,
        "noiDungDG": null,
        "vanBan": null,
        "chiBo": null,
        "trangThai": 0,
        "listChiBo": [],
    };
};
function getCongViec() {
    return congViec;
}
function kiemTaCongViec(congViec) {
    if (!(congViec.listChiBo?.length > 0)) {
        return "Cần chọn chi bộ thực hiện"
    } else if (!congViec.ten?.length > 0) {
        return "Cần nhập tên công việc"
    } else return "";
}
function kiemTaCongViecCapNhat(congViec) {
    if (!congViec.ten?.length > 0) {
        return "Cần nhập tên công việc"
    } else return "";
}
const congViecUtil = {
    getCongViecThem,
    getCongViec,
    kiemTaCongViec,
    kiemTaCongViecCapNhat

};
export default congViecUtil;