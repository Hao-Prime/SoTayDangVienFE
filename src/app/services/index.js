
import TaiKhoanService from "./taikhoan.service"
import DangVienService from "./dangvien.service"
import ChiBoService from "./chibo.service"
import ChucVuChuyenMonService from "./chucvuchuyenmon.service"
import ChucVuDangService from "./chucvudang.service"
import TrinhDoChinhTriService from "./trinhdochinhtri.service"
import TrinhDoChuyenMonService from "./trinhdochuyenmon.service"
import QuaTrinhSinhHoatService from "./quatrinhsinhoat.service"
import DanhGiaDVService from "./danhgiadangvien.service"
import DanhGiaCBService from "./danhgiachibo.service"
import DangBoService from "./dangbo.service"
import QCUTService from "./quanchunguutu.service"
import VanBanService from "./vanban.service"
import CongViecService from "./congviec.service"
import FileService from "./file.service"
import ThongKeService from "./thongke.service"
import LichSuService from "./lichsu.service"
function getLichSuService() { return LichSuService }
function getThongKeService() { return ThongKeService }
function getFileService() { return FileService }
function getCongViecService() { return CongViecService }
function getVanBanService() { return VanBanService }
function getQCUTService() { return QCUTService }
function getDangBoService() { return DangBoService }
function getDanhGiaCBService() { return DanhGiaCBService }
function getDanhGiaDVService() { return DanhGiaDVService }
function getTaiKhoanService() { return TaiKhoanService }
function getDangVienService() { return DangVienService }
function getChiBoService() { return ChiBoService }
function getChucVuChuyenMonService() { return ChucVuChuyenMonService }
function getChucVuDangService() { return ChucVuDangService }
function getTrinhDoChinhTriService() { return TrinhDoChinhTriService }
function getTrinhDoChuyenMonService() { return TrinhDoChuyenMonService }
function getQuaTrinhSinhHoatService() { return QuaTrinhSinhHoatService }
const Services = {
    getLichSuService,
    getThongKeService,
    getFileService,
    getCongViecService,
    getVanBanService,
    getQCUTService,
    getDangBoService,
    getDanhGiaCBService,
    getDanhGiaDVService,
    getTaiKhoanService,
    getDangVienService,
    getChiBoService,
    getChucVuChuyenMonService,
    getChucVuDangService,
    getTrinhDoChinhTriService,
    getTrinhDoChuyenMonService,
    getQuaTrinhSinhHoatService
}

export default Services