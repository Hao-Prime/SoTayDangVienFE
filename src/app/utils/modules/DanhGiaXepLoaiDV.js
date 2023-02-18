import FormatDate from "app/common/FormatDate";
const danhGiaXepLoaiDV = {
    "id": null,
    "phanLoai": null,
    "moTa": null,
    "nam": null,
    "dangVien": null,
}

function getDanhGiaXepLoaiDVThem(dangVien) {
    return {
        "phanLoai": null,
        "moTa": null,
        "nam": null,
        "dangVien": dangVien,
    };
};
function getDanhGiaXepLoaiDV() {
    return danhGiaXepLoaiDV;
}
function kiemTaDanhGiaXepLoaiDV(danhGiaXepLoaiDV) {
    // if (danhGiaXepLoaiDV.hoTen == null || danhGiaXepLoaiDV.hoTen == "") {
    //     return "Tên Đảng viên không được để trống"

    // } else if (danhGiaXepLoaiDV.soCMND != null) {
    //     if (!danhGiaXepLoaiDV.soCMND?.match(/^\[0-9]{9}$/) && !danhGiaXepLoaiDV.soCMND?.match(/^\[0-9]{12}$/)) {
    //         return "Số CMND không hợp lệ"

    //     }
    // } else if (!danhGiaXepLoaiDV.soDienThoai?.match(/^\(?([0]{1})\)?([0-9]{9})$/)) {
    //     return "Số điện thoại không hợp lệ"

    // }
    // else if (danhGiaXepLoaiDV.chiBo == null) {
    //     return "Cần chọn đơn vị"

    // }

    // if (danhGiaXepLoaiDV.ngaySinh != null) {
    //     if (FormatDate.soSachNgay(danhGiaXepLoaiDV.ngaySinh, "2008-01-01") > 0) {
    //         return "Ngày sinh quá nhỏ"
    //     }
    // }

    // }
    return "";

}
const danhGiaXepLoaiDVUtil = {
    getDanhGiaXepLoaiDVThem,
    getDanhGiaXepLoaiDV,
    kiemTaDanhGiaXepLoaiDV

};
export default danhGiaXepLoaiDVUtil;