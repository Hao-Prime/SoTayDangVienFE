import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

import { lazy } from 'react';
import Loadable from 'app/components/Loadable';
import ThongKe1Page from './views/thongke/tonghop/ThongKe1Page';
import ThongKe2Page from './views/thongke/tonghop/ThongKe2Page';
import ThongKe3Page from './views/thongke/tonghop/ThongKe3Page';
import ThongKe4Page from './views/thongke/tonghop/ThongKe4Page';
import ThongKe5Page from './views/thongke/tonghop/ThongKe5Page';
import ThongKe6Page from './views/thongke/tonghop/ThongKe6Page';
import ThongKe7Page from './views/thongke/tonghop/ThongKe7Page';
import CoCauToChucTable from './views/cocautochuc/CoCauToChucTable';
import SinhHoatCapUyTable from './views/congtacdang/shinhhoatcapuy/SinhHoatCapUyTable';
import SinhHoatThuongKyTable from './views/congtacdang/sinhhoatthuongky/SinhHoatThuongKyTable';
import Buoc0Table from './views/congtacdang/sinhhoatthuongky/Buoc0Table';
import Buoc1Table from './views/congtacdang/sinhhoatthuongky/Buoc1Table';
import Buoc2Table from './views/congtacdang/sinhhoatthuongky/Buoc2Table';
import Buoc31Table from './views/congtacdang/sinhhoatthuongky/Buoc31Table';
import Buoc32Table from './views/congtacdang/sinhhoatthuongky/Buoc32Table';
import Buoc33Table from './views/congtacdang/sinhhoatthuongky/Buoc33Table';
import Buoc34Table from './views/congtacdang/sinhhoatthuongky/Buoc34Table';
import Buoc35Table from './views/congtacdang/sinhhoatthuongky/Buoc35Table';
import Buoc36Table from './views/congtacdang/sinhhoatthuongky/Buoc36Table';
import Buoc4Table from './views/congtacdang/sinhhoatthuongky/Buoc4Table';
import Buoc5Table from './views/congtacdang/sinhhoatthuongky/Buoc5Table';
import SinhHoatChuyenDeTable from './views/congtacdang/sinhhoatchuyende/SinhHoatChuyenDeTable';
import NhiemVuCuaToiTable from './views/congtacdang/nhiemvucuatoi/NhiemVuCuaToiTable';
import TongHopNhiemVuTable from './views/congtacdang/tonghopnhiemvu/TongHopNhiemVuTable';
import TinTucTable from './views/tintuc/TinTucTable';
import VanKienTuLieuTable from './views/vankientulieu/VanKienTuLieuTable';
import ThongBaoTable from './views/thongbao/ThongBaoTable';
import ThongBaoNoiBoTable from './views/thongbaonoibo/ThongBaoNoiBoTable';
import HocTapNghiQuyetTable from './views/hoctapnghiquyet/HocTapNghiQuyetTable';
import LichCongTacTable from './views/lichcongtac/LichCongTacTable';
import GuiVanBanTable from './views/guinhanvanban/GuiVanBanTable';
import NhanVanBanTable from './views/guinhanvanban/NhanVanBanTable';

const BaoCaoKetQuaDanhGiaTable = Loadable(lazy(() => import('./views/thongke/dangvien/baocaoketquadanhgia/BaoCaoKetQuaDanhGiaTable')));
const DangVienXuatSacTable = Loadable(lazy(() => import('./views/thongke/dangvien/theodoidangvienxuatsac/DangVienXuatSacTable')));
const LichSuTable = Loadable(lazy(() => import('./views/lichsu/LichSuTable')));
const DangVienChiBoTable = Loadable(lazy(() => import('./views/thongke/chibo/dangvien/DangVienChiBoTable')));
const XepLoaiChiBoTable = Loadable(lazy(() => import('./views/thongke/chibo/danhgia/XepLoaiChiBoTable')));
const CongViecTable = Loadable(lazy(() => import('./views/congviec/CongViecTable')));
const VanBanTable = Loadable(lazy(() => import('./views/vanban/VanBanTable')));
const QCUTTable = Loadable(lazy(() => import('./views/quanchunguutu/QCUTTable')));
const DangVienTable = Loadable(lazy(() => import('./views/dangvien/DangVienTable')));
const ChiBoTable = Loadable(lazy(() => import('./views/chibo/ChiBoTable')));
const routes = [
  {
    element: (
      <AuthGuard >
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      { path: '/quanly/dangvien', element: <DangVienTable /> },
      { path: '/quanly/chibo', element: <ChiBoTable /> },
      { path: '/quanly/quanchunguutu', element: <QCUTTable /> },
      { path: '/quanly/vanban/*', element: <VanBanTable /> },
      { path: '/quanly/congviec/*', element: <CongViecTable /> },

      { path: '/quanly/thongke/chibo/danhgia', element: <XepLoaiChiBoTable /> },
      { path: '/quanly/thongke/chibo/dangvien', element: <DangVienChiBoTable /> },
      { path: '/quanly/thongke/dangvien/xuatsac', element: <DangVienXuatSacTable /> },
      { path: '/quanly/thongke/dangvien/baocaoketqua', element: <BaoCaoKetQuaDanhGiaTable /> },
      { path: '/quanly/lichsu', element: <LichSuTable /> },
      { path: '/quanly/thongke/tonghop/thongke1', element: <ThongKe1Page /> },
      { path: '/quanly/thongke/tonghop/thongke2', element: <ThongKe2Page /> },
      { path: '/quanly/thongke/tonghop/thongke3', element: <ThongKe3Page /> },
      { path: '/quanly/thongke/tonghop/thongke4', element: <ThongKe4Page /> },
      { path: '/quanly/thongke/tonghop/thongke5', element: <ThongKe5Page /> },
      { path: '/quanly/thongke/tonghop/thongke6', element: <ThongKe6Page /> },
      { path: '/quanly/thongke/tonghop/thongke7', element: <ThongKe7Page /> },

      { path: '/quanly/cocautochuc', element: <CoCauToChucTable /> },
      { path: '/quanly/congtacdamg/shcapuy', element: <SinhHoatCapUyTable /> },
      { path: '/quanly/congtacdamg/shthuongky', element: <SinhHoatThuongKyTable /> },
      { path: '/quanly/congtacdamg/shthuongky/chitiet', element: <Buoc0Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc1', element: <Buoc1Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc2', element: <Buoc2Table /> },

      { path: '/quanly/congtacdamg/shthuongky/buoc31', element: <Buoc31Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc32', element: <Buoc32Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc33', element: <Buoc33Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc34', element: <Buoc34Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc35', element: <Buoc35Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc36', element: <Buoc36Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc4', element: <Buoc4Table /> },
      { path: '/quanly/congtacdamg/shthuongky/buoc5', element: <Buoc5Table /> },

      { path: '/quanly/congtacdamg/shchuyende', element: <SinhHoatChuyenDeTable /> },
      { path: '/quanly/congtacdamg/nvcuatoi', element: <NhiemVuCuaToiTable /> },
      { path: '/quanly/congtacdamg/tonghopnhiemvu', element: <TongHopNhiemVuTable /> },

      { path: '/quanly/tintuc', element: <TinTucTable /> },
      { path: '/quanly/vankien', element: <VanKienTuLieuTable /> },
      { path: '/quanly/thongbao', element: <ThongBaoTable /> },
      { path: '/quanly/tinnoibo', element: <ThongBaoNoiBoTable /> },
      { path: '/quanly/hoctapnghiquyet', element: <HocTapNghiQuyetTable /> },
      { path: '/quanly/lichcongtac', element: <LichCongTacTable /> },
      { path: '/quanly/vanban/guivanban', element: <GuiVanBanTable /> },
      { path: '/quanly/vanban/nhanvanban', element: <NhanVanBanTable /> },
      ...dashboardRoutes,
      // ...chartsRoute, 
      // ...materialRoutes
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
