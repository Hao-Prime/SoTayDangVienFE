import { useEffect, useState } from 'react';
import { Icon, Grid, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, DatePicker, TagPicker, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink, useNavigate } from "react-router-dom";
import SunEditor, { buttonList } from "suneditor-react";
import MoreIcon from '@rsuite/icons/legacy/More';
import 'suneditor/dist/css/suneditor.min.css';

import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
import { Paragraph } from 'app/components/Typography';
import { Steps } from 'rsuite';
import PencilSquareIcon from '@rsuite/icons/legacy/PencilSquare';
import BookIcon from '@rsuite/icons/legacy/Book';
import ConversionIcon from '@rsuite/icons/Conversion';
import ListIcon from '@rsuite/icons/List';
import TaskIcon from '@rsuite/icons/Task';
import SpeakerIcon from '@rsuite/icons/Speaker';
import { Radio, RadioGroup, Form } from 'rsuite';
import { Nav, Modal } from 'rsuite';
const Navbar = ({ active, onSelect, ...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 9 }}>
            <Nav.Item eventKey="home">Tài liệu TW</Nav.Item>
            <Nav.Item eventKey="news">Tài liệu Đảng bộ tỉnh Long An</Nav.Item>
            <Nav.Item eventKey="newsx">Nghiệp vụ công tác Đảng </Nav.Item>
            <Nav.Item eventKey="newsxx">Nghiệp vụ công tác Đảng </Nav.Item>
        </Nav>
    );
};
export default function VanKienTuLieuTable() {
    const [active, setActive] = useState('home');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);

    const [loading, setLoading] = useState(false);

    const [listDangVien, setListDangVien] = useState([
        { "value0": 1, "value1": "Lưu trữ tài liệu chính trị", "value2": "15/02/2023 " },
        { "value0": 1, "value1": "Lưu trữ tài liệu luận cương", "value2": "18/02/2023" },
    ]);
    const [listDangVien2, setListDangVien2] = useState([
        { "value0": 1, "value1": "BÀI GIẢNG NQ 19. NÔNG NGHIỆP NÔNG DÂN NÔNG THÔN. TB KT TƯ", "value2": "15/02/2023 " },
        { "value0": 1, "value1": "Test tài liệu", "value2": "21/02/2023" },
    ]);
    const [listDangVienMD, setListDangVienMD] = useState([]);
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
                        // setDangVienUp({ id: rowData.id })
                        // setOpenDangVienModal(true)
                        break;

                    case 4:
                        // if (window.confirm("Bạn có chắc muốn xóa đảng viên này")) {
                        //     Services.getDangVienService().xoa(rowData.id).then(
                        //         (response) => {
                        //             if (response.data?.tenLoi != undefined) {
                        //                 alert(response.data?.noiDung)
                        //             } else {
                        //                 reloadList()
                        //             }

                        //         }
                        //     )
                        // }
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
    return (
        <Container>
            <Breadcrumb routeSegments={[{ name: "Văn kiện tư liệu", path: "/par/dangvien" }]} />
            <SimpleCard >
                <Navbar appearance="tabs" active={active} onSelect={setActive} />
                <Grid container spacing={1} className=" mt-2">

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Stack wrap className="table-toolbar form-cus-36" justifyContent="space-between">
                            <Stack wrap spacing={6}>
                                <Button color='red' appearance="primary" className='div-flex' size="md" >
                                    <Icon className="icon icon-search">add</Icon> Thêm thư mục
                                </Button>
                            </Stack>


                            <Stack spacing={6}>
                                <Paragraph className='td-right'>Tổng số:</Paragraph>
                                <Paragraph className='red border-input'><b>2</b></Paragraph>
                            </Stack>
                        </Stack>
                        <Table wordWrap="break-word" autoHeight={true} data={listDangVien} id="table" className='table table-pointer' loading={loading} headerHeight={38} rowHeight={50} shouldUpdateScroll={false}>

                            <Column minWidth={60} flexGrow={1} align="center" verticalAlign="middle">
                                <CustomHeaderCell2>STT</CustomHeaderCell2>
                                <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                            </Column>
                            <Column minWidth={350} flexGrow={3} verticalAlign="middle">
                                <CustomHeaderCell2 >Thư mục con</CustomHeaderCell2>
                                <CustomCell>{(rowData, rowIndex) => (<div className='div-flex'><Icon className='me-1'>folder_open</Icon>{rowData.value1}</div>)}</CustomCell>
                            </Column>
                            <Column minWidth={180} flexGrow={1} resizable verticalAlign="middle" >
                                <CustomHeaderCell2 align="center">Ngày tạo</CustomHeaderCell2>
                                <CustomCell dataKey="value2" align="center" />
                            </Column>

                            <Column width={120} verticalAlign="middle" fixed={windowScreen ? "right" : false}>
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

                                maxButtons={3}
                                size="xs"
                                layout={['-', 'pager']}
                                total={listDangVien.length}
                                limitOptions={[10, 20, 70, 100]}
                                limit={limit}
                                activePage={page}
                                onChangePage={setPage}
                            // onChangeLimit={handleChangeLimit}
                            />
                        </div>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Divider />
                        <h3 className='red'>Danh sách tài liệu</h3>
                        <Stack wrap className="table-toolbar form-cus-36" justifyContent="space-between">
                            <Stack wrap spacing={6}>
                                <Button color='red' appearance="primary" className='div-flex' size="md" >
                                    <Icon className="icon icon-search">add</Icon> Thêm tài liệu
                                </Button>
                            </Stack>


                            <Stack spacing={6}>
                                <Paragraph className='td-right'>Tổng số:</Paragraph>
                                <Paragraph className='red border-input'><b>2</b></Paragraph>
                            </Stack>
                        </Stack>
                        <Table autoHeight={true} data={listDangVien2} id="tablexxx" className='table table-pointer' loading={loading} headerHeight={38} rowHeight={50} shouldUpdateScroll={false}>

                            <Column minWidth={60} flexGrow={1} align="center" verticalAlign="middle">
                                <CustomHeaderCell2>STT</CustomHeaderCell2>
                                <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                            </Column>
                            <Column minWidth={350} flexGrow={3} verticalAlign="middle">
                                <CustomHeaderCell2 >Tên tài liệu</CustomHeaderCell2>
                                <CustomCell>{(rowData, rowIndex) => (<div className='div-flex'><Icon className='me-1'>attach_file</Icon>{rowData.value1}</div>)}</CustomCell>
                            </Column>
                            <Column minWidth={180} flexGrow={1} resizable verticalAlign="middle" >
                                <CustomHeaderCell2 align="center">Ngày ban hành</CustomHeaderCell2>
                                <CustomCell dataKey="value2" align="center" />
                            </Column>

                            <Column width={120} verticalAlign="middle" fixed={windowScreen ? "right" : false}>
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
                                total={listDangVien.length}
                                limitOptions={[10, 20, 70, 100]}
                                limit={limit}
                                activePage={page}
                                onChangePage={setPage}
                            // onChangeLimit={handleChangeLimit}
                            />
                        </div>
                    </Grid>
                </Grid>

                <div style={{ padding: "20px" }}>
                </div>
            </SimpleCard>
            <div style={{ padding: "10px" }}>

            </div>
        </Container >
    );
};

