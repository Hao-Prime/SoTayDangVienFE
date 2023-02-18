import FormatDate from "./FormatDate";

//sắp xếp theo 1 atr return lisobject 1 là tăng -1 là giảm
function sapXepTheoObjectAtr(list, atr, loai) {
    list?.sort(function (a, b) {
        if (a[atr] < b[atr]) return -1 * loai;
        if (a[atr] > b[atr]) return 1 * loai;
        return 0;
    });
    return list;
}
//sắp xếp theo 2 atr return lisobject 1 là tăng -1 là giảm
function sapXepTheoObject2Atr(list, atr, atr1, loai) {
    list?.sort(function (a, b) {
        // console.log(a[atr]+"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        if (a[atr] == undefined || b[atr] == undefined) {
            return 1;
        }
        if (a[atr][atr1] < b[atr][atr1]) return -1 * loai;
        if (a[atr][atr1] > b[atr][atr1]) return 1 * loai;
        return 0;
    });
    return list;
}
function sapXepTheoObject3Atr(list, atr, atr1, atr2, loai) {
    list?.sort(function (a, b) {
        if (a[atr] == undefined || b[atr] == undefined) {
            return 1;
        }
        if (a[atr][atr1] == undefined || b[atr][atr1] == undefined) {
            return 1;
        }
        if (a[atr][atr1][atr2] < b[atr][atr1][atr2]) return -1 * loai;
        if (a[atr][atr1][atr2] > b[atr][atr1][atr2]) return 1 * loai;
        return 0;
    });
    return list;
}
function sapXepTheoObjectAtrVaAtr(list, atr,atr2, loai,loai2) {
    list?.sort(function (a, b) {
        if (a[atr] < b[atr]) return -1 * loai;
        if (a[atr] == b[atr]) {
            if (a[atr2] < b[atr2]) return -1 * loai2;
            if (a[atr2] > b[atr2]) return 1 * loai2;
        }
        if (a[atr] > b[atr]) return 1 * loai;
        return 0;
    });
    return list;
}
function sapXepTheoTenNV(list, atr, atr1, loai) { 
    list?.sort(function (a, b) {
        if (a[atr] == undefined || b[atr] == undefined) {
            return 1;
        }
        // console.log(a[atr][atr1].split(' ').slice(-1).join(' ')+"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        if (
            a[atr][atr1].split(" ").slice(-1).join(" ") <
            b[atr][atr1].split(" ").slice(-1).join(" ")
        )
            return -1 * loai;
        if (
            a[atr][atr1].split(" ").slice(-1).join(" ") >
            b[atr][atr1].split(" ").slice(-1).join(" ")
        )
            return 1 * loai;
        return 0;
    });
    return list;
}
//Sắp xếp theo Họ tên lấy từ Tên như Võ Anh .H.ào >A .K.iên
function sapXepTenNV(list, atr, loai) { 
    list?.sort(function (a, b) {

        if (
            a[atr].split(" ").slice(-1).join(" ") <
            b[atr].split(" ").slice(-1).join(" ")
        )
            return -1 * loai;
        if (
            a[atr].split(" ").slice(-1).join(" ") >
            b[atr].split(" ").slice(-1).join(" ")
        )
            return 1 * loai;
        return 0;
    });
    return list;
}
//sắp xếp theo ngay
function sapXepTheoNgay(list, atr, loai) {
    list?.sort(function (a, b) {
        if (FormatDate.soSachNgay(a[atr],b[atr])>0) return -1 * loai;
        if (FormatDate.soSachNgay(a[atr],b[atr])<0) return 1 * loai;
        return 0;
    });
    return list;
}
//sắp xếp theo trạng thái
function sapXepTheoTrangThai(list, atrngayKT, atrngayKTTT, loai) {
    list?.sort(function (a, b) {
        if (
            FormatDate.hienThiTrangThai1(
                Date.now(),
                a[atrngayKT],
                a[atrngayKTTT]
            ) <
            FormatDate.hienThiTrangThai1(
                Date.now(),
                b[atrngayKT],
                b[atrngayKTTT]
            )
        )
            return -1 * loai;
        if (
            FormatDate.hienThiTrangThai1(
                Date.now(),
                a[atrngayKT],
                a[atrngayKTTT]
            ) >
            FormatDate.hienThiTrangThai1(
                Date.now(),
                b[atrngayKT],
                b[atrngayKTTT]
            )
        )
            return 1 * loai;
        return 0;
    });
    return list;
}
export default {
    sapXepTheoObjectAtrVaAtr,
    sapXepTheoObjectAtr,
    sapXepTheoNgay,
    sapXepTheoObject2Atr,
    sapXepTheoObject3Atr,
    sapXepTheoTenNV,
    sapXepTheoTrangThai,
    sapXepTenNV
};
