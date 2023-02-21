import { useEffect, useState } from 'react';
import { Icon } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import Services from 'app/services';
import dangVienUtil from 'app/utils/modules/DangVien';
import FormatDate from 'app/common/FormatDate';
import { Paragraph } from 'app/components/Typography';
import { Nav } from 'rsuite';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';

const Navbar = ({ active, onSelect, ...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 9 }}>
            <Nav.Item eventKey="home">
                Đơn vị
            </Nav.Item>
            <Nav.Item eventKey="news">Là khách mời</Nav.Item>

        </Nav>
    );
};
export default function ThongBaoTable() {
    const [active, setActive] = useState('home');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);

    const [loading, setLoading] = useState(false);
    const [listDangVienMD, setListDangVienMD] = useState([
        { "value0": 1, "value2": "Trần Hoàng Sơn", "value21": "Đã đánh giá", "value3": "15/02/2023 12:15 ", "value4": " 15/02/2023 14:45", "value1": "Thực hiện nhiệm vụ tháng 5/2022", },
        { "value0": 1, "value2": "Huỳnh Chí Tường", "value21": "Đã đánh giá", "value3": "13/02/2023 08:15 ", "value4": " 13/02/2023 11:45", "value1": "Thực hiện thủ tục gói thầu VNPT HIS", },
        { "value0": 1, "value2": "Phạm Phú Quý", "value21": "Đã đánh giá", "value3": "12/02/2023 07:15 ", "value4": " 12/02/2023 10:45", "value1": "Hoàn thiện KH CĐS gửi lại UBND Cần Đước", }
    ]);
    const data = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'].map(
        item => ({ label: item, value: item })
    );
    const data2 = ['Năm 2023', 'Năm 2022', 'Năm 2021'].map(
        item => ({ label: item, value: item })
    );

    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [listDangVien, setListDangVien] = useState([]);
    const [openDangVienModal, setOpenDangVienModal] = useState(false);
    const [dangVienUp, setDangVienUp] = useState(dangVienUtil.getDangVienThem());
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();

        return () => { isMounted = false; };
    }, []);
    useEffect(() => {
        let data = listDangVienMD.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        setListDangVien(data);
    }, [page, limit]);
    function reloadList(click) {
        if (click != undefined) {
            // setNamXepLoai(FormatDate.getNgayHienTai().substring(0, 4))

        }
        // setLoading(true);
        // setSearchKeyword('')
        // setCheckedKeys([])

    }
    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleThemDangVien = () => {
        setDangVienUp(dangVienUtil.getDangVienThem())
        // setOpenDangVienModal(true)
    };

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        // setDangVienUp({ id: rowData.id })
                        // setOpenChiTietDangVienModal(true)

                        break;
                    case 2:
                        setDangVienUp({ id: rowData.id })
                        // setOpenDangVienModal(true)
                        break;

                    case 4:
                        if (window.confirm("Bạn có chắc muốn xóa đảng viên này")) {
                            Services.getDangVienService().xoa(rowData.id).then(
                                (response) => {
                                    if (response.data?.tenLoi != undefined) {
                                        alert(response.data?.noiDung)
                                    } else {
                                        reloadList()
                                    }

                                }
                            )
                        }
                        break;
                    default:
                        break;
                }
            };
            return (
                <Popover ref={ref} className={className} style={{ left, top }} >
                    <Dropdown.Menu onSelect={handleSelect}>
                        {/* <Dropdown.Item eventKey={1}>Xem chi tiết</Dropdown.Item> */}
                        <Dropdown.Item eventKey={2}>Cập nhật</Dropdown.Item>
                        {/* <Dropdown.Item eventKey={3}>Đánh giá</Dropdown.Item> */}
                        <Dropdown.Item eventKey={4}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            );
        };
        return (
            <CustomCell {...props} className="link-group">
                <Whisper placement="auto" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon />} style={{ height: 10, padding: '3px 10px 20px' }} />
                </Whisper>
            </CustomCell>
        );
    };

    // function timKiem(key) {
    //     if (key != "") {
    //         setListDangVien([]);
    //         listDangVienMD.forEach((dv) => {
    //             if (dv.hoTen?.toUpperCase().includes(key.toUpperCase()) || dv.email?.toUpperCase().includes(key.toUpperCase()) || dv.soDienThoai?.toUpperCase().includes(key.toUpperCase()) || dv.soTheDang?.toUpperCase().includes(key.toUpperCase())) {
    //                 setListDangVien((listDangVien) => [...listDangVien, dv])
    //             }
    //         })

    //     } else {
    //         reloadList();
    //     }

    // }
    return (
        <Container>
            {/* <DangVienModal dangVienUp={dangVienUp} open={openDangVienModal} setOpen={setOpenDangVienModal} reloadList={reloadList} />
            <DanhGiaModal listDangVien={listDangVienSelect} namXepLoai={namXepLoai} open={openDanhGiaModal} setOpen={setOpenDanhGiaModal} reloadList={reloadList} />
            <ChiTietDangVienModal dangVienID={dangVienUp.id} open={openChiTietDangVienModal} setOpen={setOpenChiTietDangVienModal} /> */}
            <Breadcrumb routeSegments={[{ name: "Thông báo", path: "/par/dangvien" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                {/* <Navbar appearance="tabs" active={active} onSelect={setActive} /> */}
                <Stack wrap className="table-toolbar form-cus-36" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button appearance="primary" className='div-flex' size="md" onClick={handleThemDangVien}>
                            <Icon className="icon icon-search">add</Icon> Thêm mới
                        </Button>
                        {/* <SelectPicker size="sm" data={data} style={{ width: 110 }} placeholder="Tháng 2" cleanable={false} />
                        <SelectPicker size="sm" data={data2} style={{ width: 110 }} placeholder="Năm 2023" cleanable={false} /> */}
                    </Stack>


                    <Stack spacing={6}>
                        <Paragraph className='td-right'>Tổng số:</Paragraph>
                        <Paragraph className='red border-input'><b>3</b></Paragraph>
                    </Stack>
                </Stack>
                <Table autoHeight={true} data={listDangVien} id="table" className='table table-pointer' loading={loading} headerHeight={38} rowHeight={50} shouldUpdateScroll={false}>

                    <Column width={50} align="center" verticalAlign="middle">
                        <CustomHeaderCell2>STT</CustomHeaderCell2>
                        <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                    </Column>
                    <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                        <CustomHeaderCell2 align="center">Tiêu đề</CustomHeaderCell2>
                        <CustomCell dataKey="value1" />
                    </Column>

                    <Column minWidth={250} flexGrow={3} verticalAlign="middle">
                        <CustomHeaderCell2 align="center">Nội dung thông báo</CustomHeaderCell2>
                        <CustomCell dataKey="value7" />
                    </Column>
                    <Column width={180} verticalAlign="middle">
                        <CustomHeaderCell2 align="center">Người gửi</CustomHeaderCell2>
                        <CustomCell dataKey="value2" align="center" />
                    </Column>
                    <Column width={180} resizable verticalAlign="middle" >
                        <CustomHeaderCell2 align="center">Thời gian</CustomHeaderCell2>
                        <CustomCell align="center">15/02/2023 </CustomCell>
                    </Column>
                    <Column width={200} verticalAlign="middle">
                        <CustomHeaderCell2 align="center">Tổng người nhận</CustomHeaderCell2>
                        <CustomCell align="center">200</CustomCell>
                    </Column>

                    <Column width={80} verticalAlign="middle" fixed={windowScreen ? "right" : false}>
                        <CustomHeaderCell2>
                            Thao tác
                        </CustomHeaderCell2>
                        <ActionCell dataKey="id" />
                    </Column>
                </Table>
                <div style={{ padding: "7px" }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        maxButtons={3}
                        size="xs"
                        layout={['-', 'limit', '|', 'pager']}
                        total={listDangVienMD.length}
                        limitOptions={[30, 50, 70, 100]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
                {/* </div> */}
            </SimpleCard>
        </Container >
    );
};

