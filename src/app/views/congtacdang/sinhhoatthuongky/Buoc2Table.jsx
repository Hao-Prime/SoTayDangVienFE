import { useEffect, useState } from 'react';
import { Icon, Grid, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, DatePicker, TagPicker, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink } from 'react-router-dom';
import SunEditor, { buttonList } from "suneditor-react";
import MoreIcon from '@rsuite/icons/legacy/More';
import 'suneditor/dist/css/suneditor.min.css';
import FileTable from './FileTable';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
import { Paragraph } from 'app/components/Typography';

export default function Buoc2Table() {
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(false);
    const [listDangVien, setListDangVien] = useState([
        { value0: 0, value1: "Nguyễn Minh Triết", value2: "Hoàn thiện KH CĐS gửi lại UBND Cần Đước" },
        { value0: 1, value1: "Trần Hoàng Sơn", value2: "Khai trương và vận hành chính thức trung tâm điều hành" },

    ]);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const data2 = ['Tất cả kiến nghị', 'Kiến nghị của tôi'].map(
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
            <Breadcrumb routeSegments={[{ name: "Sinh hoạt thường kỳ", path: "/par/dangvien" }]} />
            <SimpleCard >
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <NavLink to="/quanly/congtacdamg/shthuongky/chitiet" ><Icon className="icon icon-search pointer ">arrow_back</Icon></NavLink>
                        <p style={{ marginBottom: "5px" }}>Sinh hoạt Chi bộ III - Khối văn phòng tháng 2/2023 <b>/ Bước 2: Tiếp nhận ý kiến kiến nghị</b></p>
                    </Stack>
                    <Stack spacing={6}>
                    </Stack>
                </Stack>
                <br />
                <Divider />
                <br />
                <Grid container spacing={2} >
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Grid container spacing={1} className="div-form">
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <Stack wrap className="table-toolbar" justifyContent="space-between">
                                    <Stack wrap spacing={6}>
                                        <Button appearance="primary" className='div-flex bor-ra-3' size="md" >
                                            <Icon className="icon icon-search">add</Icon> Thêm mới
                                        </Button>

                                        <SelectPicker className='bor-ra-3' size="md" data={data2} style={{ width: 200 }} placeholder="Tất cả kiến nghị" cleanable={false} />
                                    </Stack>


                                    <Stack spacing={6}>
                                        <Paragraph className='td-right'>Tổng số:</Paragraph>
                                        <Paragraph className='red border-input'><b>2</b></Paragraph>
                                    </Stack>
                                </Stack>
                                <Table wordWrap="break-word" height={300} data={listDangVien} id="table" className='table table-thongke-cus' loading={loading} headerHeight={38} rowHeight={45} shouldUpdateScroll={false}>

                                    <Column width={45} align="center" verticalAlign="middle">
                                        <CustomHeaderCell2>STT</CustomHeaderCell2>
                                        <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                                    </Column>
                                    <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                                        <CustomHeaderCell2 align="center">Người gửi</CustomHeaderCell2>
                                        <CustomCell dataKey="value1" />

                                    </Column>

                                    <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                                        <CustomHeaderCell2 align="center">Nội dung</CustomHeaderCell2>
                                        <CustomCell dataKey="value2" />
                                    </Column>

                                    <Column minWidth={300} flexGrow={1} verticalAlign="middle">
                                        <CustomHeaderCell2 align="center">	Tài liệu đính kèm</CustomHeaderCell2>
                                        <CustomCell>{rowData => <p className={"bg-red01"}>{"Xem tệp tin"}</p>}</CustomCell>
                                    </Column>
                                    <Column width={80} verticalAlign="middle" fixed={windowScreen ? "right" : false}>
                                        <CustomHeaderCell2>
                                            Thao tác
                                        </CustomHeaderCell2>
                                        <ActionCell dataKey="id" />
                                    </Column>
                                </Table>
                                <p className='pb-2 pt-2'>Ghi chú</p>
                                <Input placeholder="" className='input-formx' as="textarea" />
                                <div className='displayflexcenter pt-4'>
                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc1" >
                                        <Button className='div-flex bor-ra-3 w-110' size="md" >
                                            <Icon className="icon icon-search pointer ">arrow_back</Icon> Quay về
                                        </Button>
                                    </NavLink>
                                    <Button color="red" appearance="primary" className='div-flex bor-ra-3 w-130' size="md">
                                        <Icon className="icon icon-search-2">save</Icon> Lưu ghi chú
                                    </Button>
                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc31" >
                                        <Button className='div-flex bor-ra-3 w-110' size="md" >
                                            <Icon className="icon icon-search pointer ">arrow_forward</Icon> Tiếp tục
                                        </Button>
                                    </NavLink>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <div style={{ padding: "20px" }}>

                </div>
            </SimpleCard>
            <div style={{ padding: "70px" }}>

            </div>
        </Container >
    );
};

