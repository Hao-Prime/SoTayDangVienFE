import { useEffect, useState } from 'react';
import { Icon, Grid, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, DatePicker, TagPicker, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink, useNavigate } from "react-router-dom";
import SunEditor, { buttonList } from "suneditor-react";
import { Steps } from 'rsuite';
import PencilSquareIcon from '@rsuite/icons/legacy/PencilSquare';
import BookIcon from '@rsuite/icons/legacy/Book';
import ConversionIcon from '@rsuite/icons/Conversion';
import ListIcon from '@rsuite/icons/List';
import TaskIcon from '@rsuite/icons/Task';
import SpeakerIcon from '@rsuite/icons/Speaker';
import 'suneditor/dist/css/suneditor.min.css';
import FileTable from './FileTable';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';

export default function Buoc36Table() {
    const navigate = useNavigate();
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(false);
    const [listDangVien, setListDangVien] = useState([
        { value1: 0, value3: "Bước 1: Chuẩn bị tài liệu họp", value2: "Đã thực hiện", value4: "/quanly/congtacdamg/shthuongky/buoc1" },
        { value1: 1, value3: "Bước 2: Tiếp nhận ý kiến kiến nghị", value2: "Không có kiến nghị", value4: "/quanly/congtacdamg/shthuongky/buoc2" },
        { value1: 1, value3: "Bước 3: Diễn biến cuộc họp", value2: "Chưa hoàn thiện", value4: "/quanly/congtacdamg/shthuongky/buoc3" },
        { value1: 1, value3: "Bước 4: Ra nghị quyết", value2: "Không có nghị quyết nào được ban hành", value4: "/quanly/congtacdamg/shthuongky/buoc4" },
        { value1: 1, value3: "Bước 5: Theo dõi nhiệm vụ", value2: "Không có nhiệm vụ được giao", value4: "/quanly/congtacdamg/shthuongky/buoc5" },
    ]);



    const data1 = ['Huỳnh Chí Tường', 'Trần Hoàng Sơn', 'Huỳnh Quang Cường', "Nguyễn Thanh Khiêm", 'Nguyễn Minh Triết', 'Vũ Quang Huy', 'Nguyễn Phát Tài'].map(
        item => ({ label: item, value: item })
    );
    var isMounted = true;
    useEffect(() => {
        isMounted = true;


        return () => { isMounted = false; };
    }, []);
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
                <Steps current={5} className="pointer">
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
                        <Grid container spacing={1} className="div-form">
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <p className='t-center'>ĐẢNG BỘ VIỄN THÔNG LONG AN<br />
                                    <b>CHI BỘ III - KHỐI VĂN PHÒNG</b><br />
                                    *
                                </p>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <p className='t-center'><u><b>ĐẢNG CỘNG SẢN VIỆT NAM</b></u><br />
                                    <i>Đảng bộ tỉnh Long An, ngày 03 tháng 02 năm 2023</i></p>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <div className='t-center pb-2'>
                                    <h2 className=' '><b>BIÊN BẢN HỌP CHI BỘ</b></h2>
                                    <h4><u><i>Tháng 2 / 2023</i></u></h4>
                                </div>
                                <div><p><b>Thông tin chung</b></p></div>
                                <p className='pb-2 pt-2'>Cuộc họp bắt đầu vào lúc: 08 giờ 00 phút ngày 03/02/2023</p>
                                <p className='pb-2 pt-2'>Địa điểm: tại TT</p>
                                <p className='pb-2 pt-2'>Thành phần tham dự: Toàn bộ đảng viên trong đơn vị</p>
                                <p className='pb-2 pt-2'>Chủ trì: Huỳnh Chí Tường </p>
                                <p className='pb-2 pt-2'>Thư ký: Trần Hoàng Sơn</p>
                                <p className='pb-2 pt-2'><b>Thông tin điểm danh</b></p>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">

                                <p className='pb-2 pt-2'>Tổng số đảng viên: đồng chí</p>
                                <p className='pb-2 pt-2'>Số lượng đảng viên vắng có phép: đồng chí</p>
                                <p className='pb-2 pt-2'>Số lượng đảng viên miễn sinh hoạt: đồng chí</p>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <p className='pb-2 pt-2'>Số lượng đảng viên có mặt: đồng chí</p>
                                <p className='pb-2 pt-2'> Số lượng đảng viên vắng không phép: đồng chí</p>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <div className='t-center pb-2'>
                                    <h2 className=' '><b>NỘI DUNG CUỘC HỌP</b></h2>

                                </div>
                                <p className=' pt-4'>1. B&iacute; thư chi bộ triển khai nội dung sinh hoạt chi bộ</p>
                                <p className='pb-2 pt-2'>&nbsp;</p><p>2. Chi bộ Thảo luận</p><p>&nbsp;</p>
                                <p className='pb-2 pt-4'>3. Kết luận của chủ tr&igrave;</p>

                                <p className='pb-2 pt-4'>Cuộc họp kết thúc vào lúc: 10 giờ 00 phút ngày 03/02/2023</p>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <div className='t-center pb-2'>
                                    <h3 ><b>CHỦ TRÌ</b></h3>
                                    <p><i>(Ký, ghi rõ họ tên)</i></p>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <div className='t-center pb-2'>
                                    <h3 ><b>THƯ KÝ</b></h3>
                                    <p><i>(Ký, ghi rõ họ tên)</i></p>
                                </div>
                            </Grid>


                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <div className='displayflexcenter pt-5'>
                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc35" >
                                        <Button className='div-flex bor-ra-3 w-110' size="md" >
                                            <Icon className="icon icon-search pointer ">arrow_back</Icon> Quay về
                                        </Button>
                                    </NavLink>
                                    <Button color="red" appearance="primary" className='div-flex bor-ra-3 w-160' size="md">
                                        <Icon className="icon icon-search-2">done</Icon> Kết thúc cuộc họp
                                    </Button>
                                    <Button disabled className='div-flex bor-ra-3 w-120' size="md">
                                        <Icon className="icon icon-search-2">print</Icon> In biên bản
                                    </Button>

                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc4" >
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

