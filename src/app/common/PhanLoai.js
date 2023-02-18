import React from "react";


function getPhanLoaiXepLoai(key) {
    switch (key) {
        case 1:
            return "Xuất sắc"
        case 2:
            return "Hoàn thành tốt"
        case 31:
            return "Hoàn thành - Mục a"
        case 32:
            return "Hoàn thành - Mục b"
        case 33:
            return "Hoàn thành - Mục c"
        case 41:
            return "Không hoàn thành - Mục a"
        case 42:
            return "Không hoàn thành - Mục b"
        case 43:
            return "Không hoàn thành - Mục c"
        case 44:
            return "Không hoàn thành - Mục d"
        case 45:
            return "Không hoàn thành - Mục đ"
        case 5:
            return "Miễn sinh hoạt"
        default:
            return "Chưa đánh giá"
    }
}
function getPhanLoaiXepLoaiKyHieu(key) {
    switch (key) {
        case 1:
            return "HTXSNV"
        case 2:
            return "HTTNV"
        case 31:
            return "HTNV-a"
        case 32:
            return "HTNV-b"
        case 33:
            return "HTNV-c"
        case 41:
            return "KHTNV-a"
        case 42:
            return "KHTNV-b"
        case 43:
            return "KHTNV-c"
        case 44:
            return "KHTNV-d"
        case 45:
            return "KHTNV-đ"
        case 5:
            return "Miễn sinh hoạt"
        default:
            return "Chưa đánh giá"
    }
}
function getSelectPhanLoaiXepLoai() {
    return [
        { value: 1, label: "Xuất sắc" },
        { value: 2, label: "Hoàn thành tốt" },
        { value: 31, label: "Hoàn thành - Mục a" },
        { value: 32, label: "Hoàn thành - Mục b" },
        { value: 33, label: "Hoàn thành - Mục c" },
        { value: 41, label: "Không hoàn thành - Mục a" },
        { value: 42, label: "Không hoàn thành - Mục b" },
        { value: 43, label: "Không hoàn thành - Mục c" },
        { value: 44, label: "Không hoàn thành - Mục d" },
        { value: 45, label: "Không hoàn thành - Mục đ" },
        { value: 5, label: "Miễn sinh hoạt" },

    ]
}
function getPhanLoaiVanBan(key) {
    switch (key) {
        case 1:
            return "QĐ chuẩn y Ban Chấp hành"
        case 2:
            return "Ủy ban Kiểm tra"
        case 3:
            return "QĐ khen thưởng"
        default:
            return "Không rõ phân loại"
    }
}
function getSelectPhanLoaiVanBan() {
    return [
        { value: 1, label: "QĐ chuẩn y Ban Chấp hành" },
        { value: 2, label: "Ủy ban Kiểm tra" },
        { value: 3, label: "QĐ khen thưởng" },
    ]
}
function getPhanLoaiCongViec(key) {
    switch (key) {
        case 1:
            return "Loại cv 1"
        case 2:
            return "Công việc 2"
        default:
            return "Không rõ phân loại"
    }
}
function getSelectPhanLoaiCongViec() {
    return [
        { value: 1, label: "Loại cv 1" },
        { value: 2, label: "Công việc 2" },

    ]
}

function getXepLoaiCongViec(key) {
    switch (key) {
        case 1:
            return "Xuất sắc"
        case 2:
            return "Hoàn thành tốt"
        case 3:
            return "Hoàn thành"
        case 4:
            return "Không hoàn thành"

        default:
            return "Chưa đánh giá"
    }
}
function getSelectXepLoaiCongViec() {
    return [
        { value: 1, label: "Xuất sắc" },
        { value: 2, label: "Hoàn thành tốt" },
        { value: 3, label: "Hoàn thành" },
        { value: 4, label: "Không hoàn thành" },


    ]
}
function getTrangThaiCV(key) {
    switch (key) {
        case 0:
            return "Đang xử lý"
        case 1:
            return "Đã xử lý"
        default:
            return "Không rõ phân loại"
    }
}
function getTrangThaiDV(key) {
    switch (key) {
        case 0:
            return "Ngừng quản lý"
        case 1:
            return "Hoạt động"
        default:
            return "Không rõ"
    }
}
export default {
    getTrangThaiCV,
    getXepLoaiCongViec,
    getSelectXepLoaiCongViec,
    getSelectPhanLoaiCongViec,
    getPhanLoaiCongViec,
    getPhanLoaiXepLoai,
    getSelectPhanLoaiXepLoai,
    getPhanLoaiVanBan,
    getSelectPhanLoaiVanBan,
    getTrangThaiDV,
    getPhanLoaiXepLoaiKyHieu
};