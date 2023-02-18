//to HTML
function formatDate(Stringngay) {
    if (Stringngay == undefined || Stringngay == "") {
        Stringngay = "";
        return "Chưa xác định"
    }
    // tăng lên 7h
    let m = new Date(Stringngay);
    // let m1=new Date(m).setHours(m.getHours()+7);
    // let m2 =  new Date(m1);

    var dateString =
        <span>
            <span>{
                ("0" + (m.getHours())).slice(-2) + ":" +
                ("0" + m.getMinutes()).slice(-2) + ", "
            }</span>
            {
                ("0" + (m.getDate())).slice(-2) + "/" +
                ("0" + (m.getMonth() + 1)).slice(-2) + "/" +
                m.getFullYear()}
        </span>



    return dateString;
}
// to String 10:00 24/03
function formatDateString(Stringngay) {
    if (Stringngay == undefined) {
        Stringngay = "";
        return "Chưa xác định"
    }
    let m = new Date(Stringngay);
    var dateString =
        ("0" + (m.getHours())).slice(-2) + ":" +
        ("0" + m.getMinutes()).slice(-2) + " " +
        ("0" + (m.getDate())).slice(-2) + "/" +
        ("0" + (m.getMonth() + 1)).slice(-2)
    // + "/"  +m.getFullYear();
    return dateString;
}
// to String 10:00 24/03
function formatDateToDDMM(Stringngay) {
    if (Stringngay == undefined) {
        Stringngay = "";
        return "Chưa xác định"
    }
    let m = new Date(Stringngay);
    var dateString =
        ("0" + (m.getDate())).slice(-2) + "/" +
        ("0" + (m.getMonth() + 1)).slice(-2)
    // + "/"  +m.getFullYear();
    return dateString;
}
// to String 24/03/2012
function formatDateDDMMYYY(Stringngay) {
    if (Stringngay == undefined || Stringngay == "") {
        Stringngay = "";
        return "Chưa xác định"
    }
    let m = new Date(Stringngay);
    var dateString =
        ("0" + (m.getDate())).slice(-2) + "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) + "/" +
        m.getFullYear()
    // + "/"  +m.getFullYear();
    return dateString;
}
//trả về label (ngay hien tai ko can setTimezone Date.now() thoi ) vì trong so sánh Date now sẽ đc gán thành UTC 7
function hienThiTrangThai(hientai, ngayKT, ngayKTT, tiepnhan) {
    if (tiepnhan == "Chưa tiếp nhận" || tiepnhan == undefined || tiepnhan == "") {
        return <label className="badge badge-dark">Chưa tiếp nhận</label>
    }
    if (ngayKTT == undefined) {
        if (ngayKT == undefined) {
            return <label className="badge badge-dark">Chưa lên lịch</label>
        }
        let rs = soSachNgay(hientai, ngayKT);
        if (rs == 1) {
            return <label className="badge badge-danger">Đang trễ hẹn</label>
        }
        else return <label className="badge badge-info">Đang thực hiện</label>
    }
    let rs = soSachNgay(ngayKTT, ngayKT);
    if (rs == -1 || rs == 0 || ngayKT == undefined) {
        return <label className="badge badge-success">Đúng hẹn</label>
    }
    else return <label className="badge badge-warning">Đã trễ hẹn</label>
}
//trả về int
function hienThiTrangThai1(hientai, ngayKT, ngayKTT) {
    if (ngayKTT == undefined) {
        if (ngayKT == undefined) {//chưa lên
            return 3
        }
        let rs = soSachNgay(hientai, ngayKT);
        if (rs == 1) {
            return 1//đang trễ
        }
        else return 2 //đang làm
    }
    let rs = soSachNgay(ngayKTT, ngayKT);
    if (rs == -1 || rs == 0 || ngayKT == undefined) {
        return 4// đúng hẹn
    }
    else return 5 //đã trễ
}
//trả về html , nhưng cho dashbord
function hienThiTrangThai2(hientai, ngayKT, ngayKTT, tiepnhan) {
    if (tiepnhan == "Chưa tiếp nhận" || tiepnhan == undefined) {
        return <label className="badge badge-dark pt-1 pb-1 mt-1 mb-1">Chưa tiếp nhận</label>
    }
    if (ngayKTT == undefined) {
        if (ngayKT == undefined) {
            return <label className="badge badge-dark pt-1 pb-1 mt-1 mb-1">Chưa lên lịch</label>
        }
        let rs = soSachNgay(hientai, ngayKT);
        if (rs == 1) {
            return <label className="badge badge-danger pt-1 pb-1 mt-1 mb-1">Đang trễ hẹn</label>
        }
        else return <label className="badge badge-info pt-1 pb-1 mt-1 mb-1">Đang thực hiện</label>
    }
    let rs = soSachNgay(ngayKTT, ngayKT);
    if (rs == -1 || rs == 0 || ngayKT == undefined) {
        return <label className="badge badge-success pt-1 pb-1 mt-1 mb-1">Đúng hẹn</label>
    }
    else return <label className="badge badge-warning pt-1 pb-1 mt-1 mb-1">Đã trễ hẹn</label>
}
function kiemTraNgayTrongThang(ngay, namThang) {
    if (ngay == undefined) {
        return false;
    } else {
        if (soSachNgay(ngay, namThang + "-01T00:00:00") >= 0 && soSachNgay(ngay, namThang + "-" + getNgayCuaThang(namThang) + "T23:59:00") <= 0) {
            return true

        } else {
            return false
        }
    }
}
function kiemTraOGiua2Ngay(ngay, ngayBD, ngayKT) {

    if (ngay == undefined) {
        return false;
    } else {
        if (soSachNgay(ngay + "T23:59:00", ngayBD) >= 0 && soSachNgay(ngay + "T00:00:00", ngayKT) <= 0) {
            return true

        } else {
            return false
        }
    }
}
function kiemTraOGiua2Ngay2(ngay, ngayBD, ngayKT) {

    if (ngay == undefined) {
        return false;
    } else {
        if (soSachNgay(ngay, ngayBD) >= 0 && soSachNgay(ngay, ngayKT) <= 0) {
            return true

        } else {
            return false
        }
    }
}


//trả về 1 nếu ngày A > ngày B ,-1 nếu A<B,0 nếu a=b (15/3 >14/3)=>1
function soSachNgay(ngay1, ngay2) {

    const date1 = new Date(ngay1);
    const date2 = new Date(ngay2);
    if (date1 > date2) {
        return 1;
    } else if (date1 < date2) {
        return -1;
    } else return 0;
}

function setTimeZoneUTC7(inputValue) {
    let m = new Date(inputValue);
    let m1 = new Date(m).setTime(m.getTime() + 7 * 60 * 60 * 1000);
    let m2 = new Date(m1);

    return m2.toJSON();
}
//để vào mongo query
function setUTC7toUTC0(inputValue) {
    let m = new Date(inputValue);
    let m1 = new Date(m).setTime(m.getTime());
    let m2 = new Date(m1);
    return m2.toJSON();
}
function setUTC7toUTC0Date(inputValue) {
    let m = new Date(inputValue);
    let m1 = new Date(m).setTime(m.getTime());
    let m2 = new Date(m1);
    return m2
}
const tinhKhoangCach = (d1, d2) => {
    let ms1 = new Date(d1.substring(0, 10)).getTime();
    let ms2 = new Date(d2.substring(0, 10) + "T23:59:00").getTime();
    // console.log(d1.substring(0,10)+":"+d2.substring(0,10)+"T23:59:00"+"="+Math.ceil((ms2 - ms1) / (24*60*60*1000)))
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));

}
function tangNgay(ngay, songaytang) {
    let m = new Date(setTimeZoneUTC7(ngay))
    // m.setDate(m.getDate() + songaytang);

    // return m.toJSON();
    let m1 = new Date(m).setTime(m.getTime() + songaytang * 24 * 60 * 60 * 1000);
    let m2 = new Date(m1);
    return m2.toJSON();
}
function giamNgay(ngay, songaygiam) {
    let m = new Date(setTimeZoneUTC7(ngay));
    let m1 = new Date(m).setTime(m.getTime() - songaygiam * 24 * 60 * 60 * 1000);
    let m2 = new Date(m1);
    return m2.toJSON();
}
function getThangHienTai() {

    let m = new Date(Date.now());
    let dateString =
        m.getFullYear() + "-" + ("0" + (m.getMonth() + 1)).slice(-2)

    return dateString;
}
function getNgayHienTai() {

    let m = new Date(Date.now());
    return m.toJSON().substring(0, 10);
}
function getNgayGioHienTai() {
    let m = new Date(Date.now());
    return setTimeZoneUTC7(m.toJSON()).substring(0, 19);
}
function getNgayCuaThang(year_month) {//2022-02
    let year = year_month.substring(0, 4);
    let month = year_month.substring(5, 7);

    return new Date(year, month, 0).getDate();
}
function getThuCuaNgay(date) {//2022-01-15 2022-04-1

    var current_day = (new Date(date)).getDay();

    // Biến lưu tên của thứ
    var day_name = '';

    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = "CN";
            return day_name;
        case 1:
            day_name = "T2";
            return day_name;
        case 2:
            day_name = "T3";
            return day_name;
        case 3:
            day_name = "T4";
            return day_name;
        case 4:
            day_name = "T5";
            return day_name;
        case 5:
            day_name = "T6";
            return day_name;
        case 6:
            day_name = "T7";
            return day_name;
    }


}
function getThuCuaTuan(date) {//2022-01-15 2022-04-1

    var current_day = (new Date(date)).getDay();

    // Biến lưu tên của thứ
    var day_name = '';

    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = "Chủ nhật";
            return day_name;
        case 1:
            day_name = "Thứ hai";
            return day_name;
        case 2:
            day_name = "Thứ ba";
            return day_name;
        case 3:
            day_name = "Thứ tư";
            return day_name;
        case 4:
            day_name = "Thứ năm";
            return day_name;
        case 5:
            day_name = "Thứ sáu";
            return day_name;
        case 6:
            day_name = "Thứ bảy";
            return day_name;
    }


}
function getDauTuan(date) {//2022-02-05 nó ra ngày UTC 0
    let curr
    if (getThuCuaNgay(date) == "CN") {
        curr = new Date(tangNNgay(date, -2));
    } else curr = new Date(tangNNgay(date, 0));

    let firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));

    return setUTC7toUTC0(firstday.toJSON()?.substring(0, 10) + "T00:00:00");
};
function getCuoiTuan(date) {//2022-02-05 nó ra ngày UTC 0

    let curr
    if (getThuCuaNgay(date) == "CN") {
        curr = new Date(tangNNgay(date, -2));
    } else curr = new Date(tangNNgay(date, 0));
    let lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));

    return setUTC7toUTC0(lastday.toJSON()?.substring(0, 10) + "T23:59:00");
};
function getDauTuanUTC7(date) {//2022-02-05 nó ra ngày UTC 7

    let curr
    if (getThuCuaNgay(date) == "CN") {
        curr = new Date(tangNNgay(date, -2));
    } else curr = new Date(tangNNgay(date, 0));

    let firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));

    return firstday.toJSON().substring(0, 10) + "T00:00:00";
};
function getCuoiTuanUTC7(date) {//2022-02-05 nó ra ngày UTC 7

    let curr
    if (getThuCuaNgay(date) == "CN") {
        curr = new Date(tangNNgay(date, -2));
    } else curr = new Date(tangNNgay(date, 0));
    let lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));

    return lastday.toJSON().substring(0, 10) + "T23:59:00";
};
function tang7Ngay(date) {//2022-02-05
    let curr = new Date(date);
    let lastday = new Date(curr.setDate(curr.getDate() + 7));
    return lastday.toJSON().substring(0, 10);
};

function giam7Ngay(date) {//2022-02-05
    let curr = new Date(date);
    let firstday = new Date(curr.setDate(curr.getDate() - 7));

    return firstday.toJSON().substring(0, 10);
};
function tangNNgay(date, soNgay) {//2022-02-05 mún giảm 1 ngày thì so ngày =-2
    let curr = new Date(date.substring(0, 10));
    let lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1 + soNgay));
    return lastday.toJSON()?.substring(0, 10);
};
function thayDoiSoNgay(date, soNgay) {//Thay đổi nên xài hàm này đừng xài hàm Tăng N ngày ở trên sai lum la -> out 2022-10-20
    let curr = new Date(date.substring(0, 10));
    let rs = new Date(curr.setDate(curr.getDate() + soNgay));
    return rs.toJSON().substring(0, 10);
};
function convertDDMMYYYY(date) { //2022-02-05 to 05-02-2022
    if (date == null || date == undefined) {
        return "Chưa xác định"
    }
    if (date.length < 10) {
        return ""
    }
    date = (new Date(date)).toJSON()
    return date.substring(8, 10) + "-" + date.substring(5, 7) + "-" + date.substring(0, 4)
}
function buoiSang(date) { // nếu buôi sáng true. input string 2022-02-05T23:59:00
    if (date == "" || date == null) {
        return false;
    }
    if (soSachNgay(date, date.substring(0, 10) + "T11:30:00") > 0) {
        return false;
    }
    else return true;
}
function tangNThang(date, n) {//2022-02-05
    let curr = new Date(date);
    let lastday = new Date(curr.setMonth(curr.getMonth() + n));
    return lastday.toJSON().substring(0, 7);
};

function giamNThang(date, n) {//2022-02-05
    let curr = new Date(date);
    let lastday = new Date(curr.setMonth(curr.getMonth() - n));

    return lastday.toJSON().substring(0, 7);
};
function getDSThangTrongKhoang(d1, d2) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    let list = []
    while (d1 <= d2) {
        list.push(d1.toJSON().substring(0, 7))
        d1 = new Date(d1.setMonth(d1.getMonth() + 1));
    }
    return list;

}
function exportArrayMonth(d1, d2) {

    d1 = new Date(d1.substring(0, 7));
    d2 = new Date(d2.substring(0, 7));
    let list = [];
    while (d1 <= d2) {
        list.push(d1.toJSON().substring(0, 7));
        d1 = new Date(d1.setMonth(d1.getMonth() + 1));
    }
    return list
}
function exportArrayYear(d1, d2) {
    d1 = new Date(d1.substring(0, 4));
    d2 = new Date(d2.substring(0, 4));
    let list = [];
    while (d1 <= d2) {
        list.push(Number(d1.toJSON().substring(0, 4)));
        d1 = new Date(d1.setYear(d1.getFullYear() + 1));
    }
    return list
}
//2022-01-01T00:00
function getDauNamRQ(ngay) {
    return ngay.substring(0, 4) + "-01-01T00:00:00.000Z"
}
function getCuoiNamRQ(ngay) {
    return ngay.substring(0, 4) + "-12-31T23:59:00.000Z"
}
// 1 2 3 4
function getQuyCuaNgay(day) {
    let d = new Date(day);
    return Math.floor(d.getMonth() / 3) + 1;
}
//in 1 2 3 4,2022-01-01  out {ngayBD:2022-01-01T00:00:00.000Z, ngayKT:2022-01-01T00:00:00.000Z}
function getNgayBDKTCuaQuy(quy, ngayHT) {

    let ngayBD, ngayKT
    switch (quy) {
        case 1:
            ngayBD = ngayHT.substring(0, 4) + "-01-01T00:00:00.000Z"
            ngayKT = ngayHT.substring(0, 4) + "-03-31T23:59:00.000Z"
            break;
        case 2:
            ngayBD = ngayHT.substring(0, 4) + "-04-01T00:00:00.000Z"
            ngayKT = ngayHT.substring(0, 4) + "-06-30T23:59:00.000Z"
            break;
        case 3:
            ngayBD = ngayHT.substring(0, 4) + "-07-01T00:00:00.000Z"
            ngayKT = ngayHT.substring(0, 4) + "-09-30T23:59:00.000Z"
            break;
        case 4:
            ngayBD = ngayHT.substring(0, 4) + "-10-01T00:00:00.000Z"
            ngayKT = ngayHT.substring(0, 4) + "-12-31T23:59:00.000Z"
            break;
    }
    return { "ngayBD": ngayBD, "ngayKT": ngayKT }
}
export default {
    getNgayBDKTCuaQuy,
    getQuyCuaNgay,
    getDauNamRQ,
    getCuoiNamRQ,
    thayDoiSoNgay,
    formatDate,
    formatDateString,
    setTimeZoneUTC7,
    getThangHienTai,
    getNgayCuaThang,
    getThuCuaNgay,
    soSachNgay,
    tinhKhoangCach,
    tangNgay,
    giamNgay,
    hienThiTrangThai,
    hienThiTrangThai1,
    hienThiTrangThai2,
    kiemTraNgayTrongThang,
    kiemTraOGiua2Ngay,
    kiemTraOGiua2Ngay2,
    getNgayHienTai,
    setUTC7toUTC0,
    getDauTuan,
    getCuoiTuan,
    getDauTuanUTC7,
    getCuoiTuanUTC7,
    tang7Ngay,
    giam7Ngay,
    tangNNgay,
    convertDDMMYYYY,
    getThuCuaTuan,
    buoiSang,
    getNgayGioHienTai,
    tangNThang,
    giamNThang,
    formatDateDDMMYYY,
    getDSThangTrongKhoang,
    formatDateToDDMM,
    exportArrayMonth,
    exportArrayYear,
    setUTC7toUTC0Date

}