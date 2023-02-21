export const navigations = [
    { name: 'Trang chủ', path: '/dashboard/default', icon: 'dashboard' },
    { name: 'Lịch công tác', path: '/quanly/lichcongtac', icon: 'event_available' },
    { name: 'Tin tức', path: '/quanly/tintuc', icon: 'featured_play_list' },
    // { label: 'QUẢN LÝ', type: 'label' },
    {
        name: 'Công tác Đảng',
        icon: 'work_history',
        children: [
            { name: 'Sinh hoạt cấp ủy', iconText: 'TC', path: '/quanly/congtacdamg/shcapuy' },
            { name: 'Sinh hoạt thường kỳ', iconText: 'XL', path: '/quanly/congtacdamg/shthuongky' },
            { name: 'Sinh hoạt chuyên đề', iconText: 'HT', path: '/quanly/congtacdamg/shchuyende' },
            { name: 'Nhiệm vụ của tôi', iconText: 'HT', path: '/quanly/congtacdamg/nvcuatoi' },
            { name: 'Tổng hợp nhiệm vụ', iconText: 'HT', path: '/quanly/congtacdamg/tonghopnhiemvu' },
        ],
    },
    { name: 'Thông báo', path: '/quanly/thongbao', icon: 'volume_down' },
    { name: 'Học tập nghị quyết', path: '/quanly/hoctapnghiquyet', icon: 'account_balance_wallet' },
    { name: 'Bản tin thông báo nội bộ', path: '/quanly/tinnoibo', icon: 'local_play' },
    { name: 'Văn kiên - Tự liệu', path: '/quanly/vankien', icon: 'folder_open' },
    { name: 'Cơ cấu tổ chức', icon: 'account_balance', path: '/quanly/cocautochuc', },
    {
        name: 'Gửi nhận văn bản',
        icon: 'present_to_all',
        children: [
            { name: 'Gửi văn bản', iconText: 'TC', path: '/quanly/vanban/guivanban' },
            { name: 'Nhân văn bản', iconText: 'XL', path: '/quanly/vanban/nhanvanban' }
        ],
    },
    { name: 'Văn bản mới', path: '/dashboard/default7', icon: 'library_books' },
    { name: 'Lưu trữ yêu thích', path: '/dashboard/default8', icon: 'star_border' },


    { name: 'Xếp hạng', path: '/dashboard/default10', icon: 'rate_review' },
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
    // {
    //     name: 'Đảng phí',
    //     icon: 'attach_money',
    //     path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },

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
        icon: 'timeline',
        path: '/material/table',
        children: [
            { name: 'Phân loại đảng viên', iconText: 'TC', path: '/quanly/thongke/chibo/dangvien' },
            { name: 'Phân loại đánh giá', iconText: 'XL', path: '/quanly/thongke/chibo/danhgia' },
        ],

    },
    // {
    //     name: 'Thống kê công tác Đảng',
    //     icon: 'assignment',
    //     path: '/material/table',
    //     children: [
    //         { name: 'Học tập nghị quyết', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke1' },
    //         { name: 'Sinh hoạt đảng', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke1' },
    //     ],
    // },
    {
        name: 'Thống kê tổng hợp',
        icon: 'assessment',
        path: '/material/table',
        children: [

            { name: '1. Tăng giảm Đảng viên', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke1' },
            { name: '2. Đảng viên mới kết nạp', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke2' },
            { name: '3. Đảng viên theo dân tộc', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke3' },
            { name: '4. Đội ngũ Đảng viên', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke4' },
            { name: '5. Tổ chức Đảng, Đảng viên', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke5' },
            { name: '6. Xếp loại Cơ sở Đảng', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke6' },
            { name: '7. Xếp loại Đảng viên', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke7' },

        ],

    },


    { label: 'HỆ THỐNG', type: 'label' },
    {
        name: 'Quản trị',
        icon: 'settings_applications',
        path: '/material/table',
        children: [

            { name: 'Ban biên tập', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke11' },
            { name: 'Tin tức', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke21' },
            { name: 'Học tập nghị quyết', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke31' },
            { name: 'Thông báo nội bộ', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke41' },
            { name: 'Hướng dẫn sử dụng', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke51' },
            { name: 'Nhóm Đảng viên', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke61' },
            { name: 'Phân quyền', iconText: 'XL', path: '/quanly/thongke/tonghop/thongke71' },
            { name: 'Nhật ký', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke111' },
            { name: 'Cài đặt', iconText: 'TC', path: '/quanly/thongke/tonghop/thongke1111' },
        ],

    },
    { label: 'HƯỚNG DẪN', type: 'label' },
    {
        name: 'Tài liệu',
        icon: 'insert_drive_file',
        // type: 'extLink',
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
