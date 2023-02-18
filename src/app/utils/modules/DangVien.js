import FormatDate from "app/common/FormatDate";
const dangVien = {
    "id": null,
    "hoTen": null,
    "soCMND": null,
    "soDienThoai": null,
    "gioiTinh": null,
    "ngaySinh": null,
    "queQuan": null,
    "ngayVaoDang": null,
    "soTheDang": null,
    "noiCongTac": null,
    "trangThaiDangVien": null,
    "chucVuDang": null,
    "trinhDoChinhTri": null,
    "chucVuChuyenMon": null,
    "trinhDoChuyenMon": null,
    "chiBo": null,
    "listQTSH": null

}

function getDangVienThem() {
    return {
        "hoTen": null,
        "soCMND": null,
        "soDienThoai": null,
        "gioiTinh": null,
        "ngaySinh": null,
        "queQuan": null,
        "ngayVaoDang": null,
        "soTheDang": null,
        "noiCongTac": null,
        "trangThaiDangVien": null,
        "chucVuDang": null,
        "trinhDoChinhTri": null,
        "chucVuChuyenMon": null,
        "trinhDoChuyenMon": null,
        "chiBo": null,
        "listQTSH": null
    };
};
function getDangVien() {
    return dangVien;
}
function kiemTaDangVien(dangVien) {
    // if (dangVien.hoTen == null || dangVien.hoTen == "") {
    //     return "Tên Đảng viên không được để trống"

    // } else if (dangVien.soCMND != null) {
    //     if (!dangVien.soCMND?.match(/^\[0-9]{9}$/) && !dangVien.soCMND?.match(/^\[0-9]{12}$/)) {
    //         return "Số CMND không hợp lệ"

    //     }
    // } else if (!dangVien.soDienThoai?.match(/^\(?([0]{1})\)?([0-9]{9})$/)) {
    //     return "Số điện thoại không hợp lệ"

    // }
    // else if (dangVien.chiBo == null) {
    //     return "Cần chọn đơn vị"

    // }

    // if (dangVien.ngaySinh != null) {
    //     if (FormatDate.soSachNgay(dangVien.ngaySinh, "2008-01-01") > 0) {
    //         return "Ngày sinh quá nhỏ"
    //     }
    // }

    // }
    return "";

}
const dangVienUtil = {
    getDangVienThem,
    getDangVien,
    kiemTaDangVien

};
export default dangVienUtil;