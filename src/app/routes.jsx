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
