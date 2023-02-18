import FormatDate from "app/common/FormatDate";
const quaTrinhSinhHoat = {
    "id": null,
    "phanLoai": null,
    "noiDung": null,
    "ngayChuyen": null,
    "chuyenTu": null,
    "chuyenDen": null,
    "dangVien": null,
}

function getQuaTrinhSinhHoatThem(dangVien) {
    return {
        "phanLoai": null,
        "noiDung": null,
        "ngayChuyen": null,
        "chuyenTu": null,
        "chuyenDen": null,
        "dangVien": dangVien,
    };
};
function getQuaTrinhSinhHoat() {
    return quaTrinhSinhHoat;
}
function kiemTaQuaTrinhSinhHoat(quaTrinhSinhHoat) {
    // if (quaTrinhSinhHoat.hoTen == null || quaTrinhSinhHoat.hoTen == "") {
    //     return "Tên Đảng viên không được để trống"

    // } else if (quaTrinhSinhHoat.soCMND != null) {
    //     if (!quaTrinhSinhHoat.soCMND?.match(/^\[0-9]{9}$/) && !quaTrinhSinhHoat.soCMND?.match(/^\[0-9]{12}$/)) {
    //         return "Số CMND không hợp lệ"

    //     }
    // } else if (!quaTrinhSinhHoat.soDienThoai?.match(/^\(?([0]{1})\)?([0-9]{9})$/)) {
    //     return "Số điện thoại không hợp lệ"

    // }
    // else if (quaTrinhSinhHoat.chiBo == null) {
    //     return "Cần chọn đơn vị"

    // }

    // if (quaTrinhSinhHoat.ngaySinh != null) {
    //     if (FormatDate.soSachNgay(quaTrinhSinhHoat.ngaySinh, "2008-01-01") > 0) {
    //         return "Ngày sinh quá nhỏ"
    //     }
    // }

    // }
    return "";

}
const quaTrinhSinhHoatUtil = {
    getQuaTrinhSinhHoatThem,
    getQuaTrinhSinhHoat,
    kiemTaQuaTrinhSinhHoat

};
export default quaTrinhSinhHoatUtil;