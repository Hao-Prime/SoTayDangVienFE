import FormatDate from "app/common/FormatDate";
const vanBan = {
    "id": null,
    "ten": null,
    "soEOFFICE": null,
    "soKyHieu": null,
    "ngayTao": null,
    "noiDung": null,
    "phanLoai": null,
    "listCongViec": [],
    "listDangVien": [],
    "trangThai": 0,
    "listFileVanBan": [],
    "listVBDV": []
}

function getVanBanThem() {
    return {
        "ten": null,
        "soEOFFICE": null,
        "soKyHieu": null,
        "ngayTao": FormatDate.getNgayHienTai(),
        "noiDung": null,
        "phanLoai": null,
        "listCongViec": [],
        "listDangVien": [],
        "trangThai": 0,
        "listFileVanBan": [],
        "listVBDV": []
    };
};
function getVanBan() {
    return vanBan;
}
function kiemTaVanBan(vanBan) {
    return "";
}
const vanBanUtil = {
    getVanBanThem,
    getVanBan,
    kiemTaVanBan

};
export default vanBanUtil;