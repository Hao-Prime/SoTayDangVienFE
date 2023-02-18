import FormatDate from "app/common/FormatDate";
const qCUT = {
    "id": null,
    "hoTen": null,
    "soCMND": null,
    "soDienThoai": null,
    "gioiTinh": null,
    "ngaySinh": null,
    "queQuan": null,
    "ngayDuaVao": null,
    "trangThai": null,
    "dangVienGiupDo": null,
    "chucVuChuyenMon": null,
    "trinhDoChuyenMon": null,
    "chiBo": null
}

function getQCUTThem() {
    return {
        "hoTen": null,
        "soCMND": null,
        "soDienThoai": null,
        "gioiTinh": null,
        "ngaySinh": null,
        "queQuan": null,
        "ngayDuaVao": null,
        "trangThai": null,
        "dangVienGiupDo": null,
        "chucVuChuyenMon": null,
        "trinhDoChuyenMon": null,
        "chiBo": null
    };
};
function getQCUT() {
    return qCUT;
}
function kiemTaQCUT(qCUT) {
    return "";

}
const qCUTUtil = {
    getQCUTThem,
    getQCUT,
    kiemTaQCUT

};
export default qCUTUtil;