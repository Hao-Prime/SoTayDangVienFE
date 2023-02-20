import { useEffect, useState } from 'react';
import { Icon, Grid, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, DatePicker, TagPicker, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink, useNavigate } from "react-router-dom";
import SunEditor, { buttonList } from "suneditor-react";
import MoreIcon from '@rsuite/icons/legacy/More';
import 'suneditor/dist/css/suneditor.min.css';
import FileTable from './FileTable';
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
export default function Buoc35Table() {
    const navigate = useNavigate();
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(false);
    const [listDangVien, setListDangVien] = useState([
        { value0: 0, value1: "Công tác chuẩn bị cho buổi sinh hoạt Đảng", value2: "0.0 / 5" },
        { value0: 1, value1: "Quá trình diễn biến của buổi sinh hoạt Đảng", value2: "0.0 / 5" },
        { value0: 1, value1: "Công tác thực hiện các nhiệm vụ được giao của Chi bộ", value2: "0.0 / 5" },

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
                        <p style={{ marginBottom: "5px" }}>Sinh hoạt Chi bộ III - Khối văn phòng tháng 2/2023 <b>/ Bước 3: Diễn biến cuộc họp</b></p>
                    </Stack>
                    <Stack spacing={6}>
                    </Stack>
                </Stack>
                <br />
                <Divider />
                <br />
                <Steps current={4} className="pointer">
                    <Steps.Item title="Điểm danh" onClick={() => navigate("/quanly/congtacdamg/shthuongky/buoc31")} icon={<PencilSquareIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Diễn biến cuộc họp" onClick={() => navigate("/quanly/congtacdamg/shthuongky/buoc32")} icon={<ConversionIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Biên bản cuộc họp" onClick={() => navigate("/quanly/congtacdamg/shthuongky/buoc33")} icon={<BookIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Giao nhiệm vụ" onClick={() => navigate("/quanly/congtacdamg/shthuongky/buoc34")} icon={<ListIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Chấm điểm" onClick={() => navigate("/quanly/congtacdamg/shthuongky/buoc35")} icon={<TaskIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Tổng kết" onClick={() => navigate("/quanly/congtacdamg/shthuongky/buoc36")} icon={<SpeakerIcon style={{ fontSize: 20 }} />} />
                </Steps>
                <br />

                <Grid container spacing={2} >
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Grid container spacing={1} >
                            <Grid item lg={12} md={12} sm={12} xs={12} >

                                <Stack wrap className="table-toolbar" justifyContent="space-between">
                                    <Stack wrap spacing={6}>
                                        <Stack wrap spacing={6}>
                                            <div>
                                                <p><b> Kết quả đảng viên đánh giá</b></p>
                                                <p className='pb-2 pt-2'>Đã đánh giá: 0<br />
                                                    Chưa đánh giá: 0</p>
                                            </div>

                                        </Stack>

                                    </Stack>


                                    <Stack spacing={6}>
                                        <p >Trạng thái: <span className='green'>Đã kết thúc chấm điểm</span></p>
                                    </Stack>
                                </Stack>
                                <div>
                                    <Table autoHeight={true} data={listDangVien} id="table" className='table' loading={loading} bordered={true} cellBordered={true} headerHeight={38} rowHeight={45} shouldUpdateScroll={false}>
                                        <Column width={150} align="center" verticalAlign="middle">
                                            <CustomHeaderCell2>STT</CustomHeaderCell2>
                                            <CustomCell>{(rowData, rowIndex) => ((rowIndex + 1))}</CustomCell>
                                        </Column>
                                        <Column minWidth={300} flexGrow={1} verticalAlign="middle">
                                            <CustomHeaderCell2 align="center">Nội dung</CustomHeaderCell2>

                                            <CustomCell dataKey="value1" />
                                        </Column>
                                        <Column width={200} flexGrow={1} verticalAlign="middle" align="center">
                                            <CustomHeaderCell2>Điểm trung bình</CustomHeaderCell2>
                                            <CustomCell dataKey="value2" />
                                        </Column>

                                    </Table>

                                </div>
                                <div className='displayflexcenter pt-4'>
                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc34" >
                                        <Button className='div-flex bor-ra-3 w-110' size="md" >
                                            <Icon className="icon icon-search pointer ">arrow_back</Icon> Quay về
                                        </Button>
                                    </NavLink>
                                    <Button color="red" appearance="primary" className='div-flex bor-ra-3 w-180' size="md">
                                        <Icon className="icon icon-search-2">save</Icon> Chấm điểm cuộc họp
                                    </Button>

                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc36" >
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

