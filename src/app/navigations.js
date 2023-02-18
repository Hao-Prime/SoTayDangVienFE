export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'QUẢN LÝ', type: 'label' },
  {
    name: 'Văn bản',
    icon: 'file_present',
    badge: { value: null, color: '#ffffff' },
    children: [
      { name: 'Tất cả ', iconText: 'TC', path: '/quanly/vanban/tatca' },
      { name: 'Văn bản đang xử lý', iconText: 'XL', path: '/quanly/vanban/dangxuly?loai=1', badge: { value: null, color: '#ffffff' }, },
      { name: 'Văn bản đã xử lý', iconText: 'HT', path: '/quanly/vanban/daxuly?loai=2' },

    ],
  },
  {
    name: 'Công việc',
    icon: 'work_history',
    badge: { value: null, color: '#ffffff' },
    children: [
      { name: 'Tất cả ', iconText: 'TC', path: '/quanly/congviec/tatca' },
      { name: 'Công việc đang xử lý', iconText: 'XL', path: '/quanly/congviec/dangxuly?loai=1', badge: { value: null, color: '#ffffff' }, },
      { name: 'Công việc chờ đánh giá', iconText: 'HT', path: '/quanly/congviec/chodanhgia?loai=2' },
      { name: 'Công việc đã hoàn thành', iconText: 'HT', path: '/quanly/congviec/dahoanthanh?loai=3' },

    ],
  },
  {

    name: 'Đảng viên',
    icon: 'badge',
    path: '/quanly/dangvien',
  },

  {
    name: 'Chi bộ',
    icon: 'local_police',
    path: '/quanly/chibo',
  },
  {
    name: 'Quần chúng ưu tú',
    icon: 'groups2',
    path: '/quanly/quanchunguutu',
  },
  {
    name: 'Đảng phí',
    icon: 'attach_money',
    path: 'http://demos.ui-lib.com/matx-react-doc/',
  },
  { label: 'THỐNG KÊ', type: 'label' },
  // {
  //   name: 'Thống kê đảng viên',
  //   icon: 'leaderboard',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  //   children: [
  //     { name: 'Phân loại đảng viên', iconText: 'TC', path: '/material/checkbox' },
  //     { name: 'Phân loại đánh giá', iconText: 'XL', path: '/material/form' },
  //   ],
  // },
  {
    name: 'Thống kê đảng viên',
    icon: 'equalizer',
    path: '/material/table',
    children: [
      { name: 'Đảng viên xuất sắc', iconText: 'DV', path: '/quanly/thongke/dangvien/xuatsac' },
      { name: 'Báo cáo kết quả đánh giá', iconText: 'BC', path: '/quanly/thongke/dangvien/baocaoketqua' }
    ],

  },
  {
    name: 'Thống kê chi bộ',
    icon: 'equalizer',
    path: '/material/table',
    children: [
      { name: 'Phân loại đảng viên', iconText: 'TC', path: '/quanly/thongke/chibo/dangvien' },
      { name: 'Phân loại đánh giá', iconText: 'XL', path: '/quanly/thongke/chibo/danhgia' },
    ],

  },

  { label: 'HỆ THỐNG', type: 'label' },
  {
    name: 'Lịch sử thao tác',
    icon: 'settings_backup_restore',
    path: '/quanly/lichsu',
  },
  { label: 'HƯỚNG DẪN', type: 'label' },
  {
    name: 'Tài liệu',
    icon: 'launch',
    type: 'extLink',
    path: 'https://drive.google.com/drive/folders/1xpjPaXrvQH_XODwcGnMiuWaHI6HwhSpY?usp=sharing',
  },
  { label: 'Trung tâm CNTT VNPT Long An', type: 'label' },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
