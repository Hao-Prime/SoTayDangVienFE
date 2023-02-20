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
export default function TinTucTable() {
    const [active, setActive] = useState('news');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    return (
        <Container>
            <Breadcrumb routeSegments={[{ name: "Tin tức", path: "/par/dangvien" }]} />
            <SimpleCard >
                <Navbar appearance="tabs" active={active} onSelect={setActive} />
                <Grid container spacing={1} className=" mt-2">

                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className='div-tt1 pointer'>
                            <img className='img-tt-1' src="https://images2.thanhnien.vn/Uploaded/ngocthanh/2022_10_10/be-mac-hoi-nghi-tu-6-xiii-bm-9-5844.jpg"></img>
                            <div>
                                <h3><b>Đổi mới phương thức lãnh đạo của Đảng, xây dựng Nhà nước pháp quyền XHCN</b></h3>
                                <p>Sáng 9.10, phát biểu bế mạc Hội nghị T.Ư 6 khóa XIII, Tổng bí thư Nguyễn Phú Trọng nhấn mạnh hội nghị đã hoàn</p>
                                <p className='gray01 pt-2'><i>Ngày đăng: 20/02/2023 21:26</i></p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6} >
                        <Grid container spacing={1}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div className='div-tt1 pointer'>
                                    <Grid container spacing={1} >
                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <div className='div-img-tt' style={{ background: "url('https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/2/19/tho-nhi-ky-16768305382131282844183.jpg') center center / cover no-repeat" }}>
                                                {/* <img className='img-tt-1' src=""></img> */}
                                            </div>
                                        </Grid>
                                        <Grid item lg={8} md={8} sm={8} xs={8}>
                                            <div>
                                                <h3 className='m-0'><b>Đoàn công an VN hoàn thành chuyến cứu nạn tại Thổ Nhĩ Kỳ</b></h3>
                                                <p>Hơn 15 giờ ngày 19.2, máy bay chở đoàn công tác của Bộ Công an đáp xuống sân bay Nội Bài (Hà Nội) sau 7 ngày làm nhiệm vụ ...</p>
                                                <p className='gray01 pt-2'><i>Ngày đăng: 20/02/2023 21:26</i></p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} className="h-150">

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

