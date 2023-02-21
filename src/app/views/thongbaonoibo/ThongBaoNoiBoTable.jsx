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
            <Nav.Item eventKey="home">Tin quốc tế</Nav.Item>
            <Nav.Item eventKey="news">Tin trong nước</Nav.Item>
            <Nav.Item eventKey="newsx">Bản tin nội bộ</Nav.Item>
        </Nav>
    );
};
export default function ThongBaoNoiBoTable() {
    const [active, setActive] = useState('news');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const data = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'].map(
        item => ({ label: item, value: item })
    );
    const data2 = ['Năm 2023', 'Năm 2022', 'Năm 2021'].map(
        item => ({ label: item, value: item })
    );
    const data3 = ['Đảng bộ tỉnh Long An', 'Đảng ủy khối cơ quan doanh nghiệp', 'Đảng bộ viễn thông Long An', 'Chi bộ II Khối văn phòng'].map(
        item => ({ label: item, value: item })
    );
    return (
        <Container>
            <Breadcrumb routeSegments={[{ name: "Bản tin thông báo nội bộ", path: "/par/dangvien" }]} />
            <SimpleCard >
                {/* <Navbar appearance="tabs" active={active} onSelect={setActive} /> */}
                <Grid container spacing={1} className="">
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Stack wrap className="table-toolbar form-cus-36 pb-2" justifyContent="space-between">
                            <Stack wrap spacing={6}>
                                <Stack wrap spacing={6}>
                                    <SelectPicker size="sm" searchable={false} data={data2} style={{ width: 160 }} placeholder="Năm 2023" cleanable={false} />
                                    <SelectPicker size="sm" searchable={false} data={data} style={{ width: 160 }} placeholder="Tháng 3" cleanable={false} />
                                    <SelectPicker size="sm" searchable={false} data={data3} style={{ width: 220 }} placeholder="Chi bộ II Khối văn phòng" cleanable={false} />
                                    <Button color='red' appearance="primary" className='div-flex' size="sm">
                                        VĂN KIÊN TOÀN VĂN THÁNG 3/2023
                                    </Button>

                                </Stack>

                            </Stack>


                            <Stack spacing={6}>

                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className='div-tt1 pointer'>
                            <img className='img-tt-1' src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/2/17/tong-bi-thu-1676655705244234270620.jpg"></img>
                            <div>
                                <h3><b>Tăng cường phối hợp giữa UBTV Quốc hội và MTTQ Việt Nam</b></h3>
                                <p>Sáng 9.10, phát biểu bế mạc Hội nghị T.Ư 6 khóa XIII, Tổng bí thư Nguyễn Phú Trọng nhấn mạnh hội nghị đã hoàn</p>
                                <p className='gray01 pt-2'><i>Ngày đăng: 20/02/2023 21:26</i></p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <Grid container spacing={1}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div className='div-tt1 pointer'>
                                    <Grid container spacing={1} >
                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <div className='div-img-tt' style={{ background: "url('https://images2.thanhnien.vn/Uploaded/congthang/2023_01_11/560682pmc-9123p-1007.jpeg') center center / cover no-repeat" }}>
                                                {/* <img className='img-tt-1' src=""></img> */}
                                            </div>
                                        </Grid>
                                        <Grid item lg={8} md={8} sm={8} xs={8}>
                                            <div>
                                                <h3 className='m-0'><b>Hai Văn phòng T.Ư Đảng tiếp tục phát huy truyền thống của mình</b></h3>
                                                <p>Tổng Bí thư Nguyễn Phú Trọng tiếp Đoàn đại biểu cấp cao Văn phòng T.Ư Đảng Nhân dân Cách mạng Lào do ông Thongsalith Mangnomek, Bí thư T.Ư Đảng, Chánh văn  ...</p>
                                                <p className='gray01 pt-2'><i>Ngày đăng: 20/02/2023 21:26</i></p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} className="h-150">
                                <div className='div-tt1 pointer'>
                                    <Grid container spacing={1} >
                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <div className='div-img-tt' style={{ background: "url('https://images2.thanhnien.vn/Uploaded/phuongemnv/2022_09_17/long-an-1-6242.jpg') center center / cover no-repeat" }}>
                                                {/* <img className='img-tt-1' src=""></img> */}
                                            </div>
                                        </Grid>
                                        <Grid item lg={8} md={8} sm={8} xs={8}>
                                            <div>
                                                <h3 className='m-0'><b>Nguyên Chủ tịch nước Trương Tấn Sang dự lễ kỷ niệm ngày Long An được phong tặng danh hiệu 'Trung dũng kiên cường'</b></h3>
                                                <p>Nguyên Chủ tịch nước Trương Tấn Sang đã đến dự lễ kỷ niệm 55 năm ngày tỉnh Long An được ...</p>
                                                <p className='gray01 pt-2'><i>Ngày đăng: 20/02/2023 21:26</i></p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} className="h-150">
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ padding: "7px" }}>
                    <Pagination

                        prev
                        next
                        maxButtons={3}
                        size="xs"
                        layout={['-', , 'pager']}
                        total={2}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                    // onChangePage={setPage}
                    // onChangeLimit={handleChangeLimit}
                    />
                </div>
                <div style={{ padding: "20px" }}>

                </div>
            </SimpleCard>
            <div style={{ padding: "10px" }}>

            </div>
        </Container >
    );
};

