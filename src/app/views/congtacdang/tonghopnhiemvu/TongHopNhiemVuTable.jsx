import { useEffect, useState } from 'react';
import { Icon, Grid, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, DatePicker, TagPicker, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink } from 'react-router-dom';
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
import NhiemVuModal from '../sinhhoatthuongky/NhiemVuModal';


export default function TongHopNhiemVuTable() {
    const [openDangVienModal, setOpenDangVienModal] = useState(false);
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(false);
    const [listDangVien, setListDangVien] = useState([
        { value0: 0, value01: 0, value1: "Huỳnh Quang Cường", value2: "Tiếp tục chuyển đổi hóa đơn điện tử theo TT78" },
        { value0: 0, value01: 0, value1: "Trần Hoàng Sơn", value2: "Thực hiện thủ tục gói thầu VNPT HIS cho BVĐK khu vực Cần Giuộc." },
        { value0: 1, value01: 1, value1: "Phạm Phú Quý", value2: "Tiếp tục theo dõi thu hồi cáp đồng tại các TTVT: ĐHE, TTTH, CTTT." },
        { value0: 1, value01: 0, value5: "Hoàn thành", value1: "Huỳnh Chí Tường", value2: "Hoàn thiện KH CĐS gửi lại UBND Cần Đước" },
        { value0: 1, value01: 0, value5: "Hoàn thành", value1: "Trần Hoàng Sơn", value2: "Khai trương và vận hành chính thức trung tâm điều hành thông minh (IOC)." },
    ]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const data = ['Tất cả nhiệm vụ', 'Chưa thực hiện', 'Đã thực hiện', "Đang thực hiện", "Đã hoàn thành"].map(
        item => ({ label: item, value: item })
    );

    const data1 = ['Huỳnh Chí Tường', 'Trần Hoàng Sơn', 'Huỳnh Quang Cường', "Nguyễn Thanh Khiêm", 'Nguyễn Minh Triết', 'Vũ Quang Huy', 'Nguyễn Phát Tài'].map(
        item => ({ label: item, value: item })
    );
    var isMounted = true;
    useEffect(() => {
        isMounted = true;


        return () => { isMounted = false; };
    }, []);
    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {

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
            <NhiemVuModal open={openDangVienModal} setOpen={setOpenDangVienModal}></NhiemVuModal>
            <Breadcrumb routeSegments={[{ name: "Tổng hợp nhiệm vụ", path: "/par/dangvien" }]} />
            <SimpleCard >



                <Grid container spacing={2} >
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Grid container spacing={1} >
                            <Grid item lg={12} md={12} sm={12} xs={12} >

                                <Stack wrap className="table-toolbar form-cus-36" justifyContent="space-between">
                                    <Stack wrap spacing={6}>
                                        <Stack wrap spacing={6}>

                                            <Button appearance="primary" className='div-flex' size="sm" onClick={() => setOpenDangVienModal(true)}>
                                                <Icon className="icon icon-search">add</Icon> Thêm mới
                                            </Button>
                                            <SelectPicker size="sm" data={data} style={{ width: 220 }} placeholder="Tất cả nhiệm vụ" cleanable={false} />
                                        </Stack>

                                    </Stack>


                                    <Stack spacing={6}>
                                        <Paragraph className='td-right'>Tổng số:</Paragraph>
                                        <Paragraph className='red border-input'><b>5</b></Paragraph>
                                    </Stack>
                                </Stack>
                                <div>
                                    <Table wordWrap="break-word" autoHeight={true} data={listDangVien} id="table" className='table table-thongke-cus' loading={loading} headerHeight={38} rowHeight={45} shouldUpdateScroll={false}>

                                        <Column width={45} align="center" verticalAlign="middle">
                                            <CustomHeaderCell2>STT</CustomHeaderCell2>
                                            <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                                        </Column>
                                        <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Đảng viên nhận</CustomHeaderCell2>
                                            <CustomCell dataKey="value1" />

                                        </Column>

                                        <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Nhiệm vụ</CustomHeaderCell2>
                                            <CustomCell dataKey="value2" />
                                        </Column>
                                        <Column width={130} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Ngày giao</CustomHeaderCell2>
                                            <CustomCell align="center">16:45 18/02/2023</CustomCell>
                                        </Column>
                                        <Column width={140} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Thời gian thực hiện	</CustomHeaderCell2>
                                            <CustomCell align="center">22/02/2023 14:07 <br /> - 22/02/2023 14:15</CustomCell>
                                        </Column>

                                        <Column width={150} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Ngày hoàn thành</CustomHeaderCell2>
                                            <CustomCell align="center">{rowData =>
                                                rowData.value0 == 0 ? <p className="bg-tim1">Chưa cập nhật</p>
                                                    : <span className="bg-timx0">22/02/2023 14:07</span>}
                                            </CustomCell>
                                        </Column>
                                        <Column width={150} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Trạng thái</CustomHeaderCell2>
                                            <CustomCell align="center">{rowData =>
                                                rowData.value0 == 0 ? <p className="bg-tim1">Chưa thực hiện</p>
                                                    : <span className="bg-timx0">Hoàn thành</span>}
                                            </CustomCell>
                                        </Column>
                                        <Column width={150} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Đánh giá</CustomHeaderCell2>
                                            <CustomCell dataKey="value5" align="center" />
                                        </Column>
                                        <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Ghi chú</CustomHeaderCell2>
                                            <CustomCell dataKey="value2" />
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
                                            total={2}
                                            limitOptions={[10, 30, 70, 100]}
                                            limit={limit}
                                            activePage={page}
                                            onChangePage={setPage}
                                        />
                                    </div>
                                </div>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
            <div style={{ padding: "50px" }}>

            </div>
        </Container >
    );
};

