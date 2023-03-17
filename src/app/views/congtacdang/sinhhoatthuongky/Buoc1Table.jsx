import { useEffect, useState } from 'react';
import { Icon, Grid, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, DatePicker, TagPicker, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink } from 'react-router-dom';
import SunEditor, { buttonList } from "suneditor-react";

import 'suneditor/dist/css/suneditor.min.css';
import FileTable from './FileTable';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';

export default function Buoc1Table() {
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(false);
    const [listDangVien, setListDangVien] = useState([
        { value1: 0, value3: "Bước 1: Chuẩn bị tài liệu họp", value2: "Đã thực hiện", value4: "/quanly/congtacdamg/shthuongky/buoc1" },
        { value1: 1, value3: "Bước 2: Tiếp nhận ý kiến kiến nghị", value2: "Không có kiến nghị", value4: "/quanly/congtacdamg/shthuongky/buoc2" },
        { value1: 1, value3: "Bước 3: Diễn biến cuộc họp", value2: "Chưa hoàn thiện", value4: "/quanly/congtacdamg/shthuongky/buoc3" },
        { value1: 1, value3: "Bước 4: Ban hành nghị quyết", value2: "Không có nghị quyết nào được ban hành", value4: "/quanly/congtacdamg/shthuongky/buoc4" },
        { value1: 1, value3: "Bước 5: Theo dõi nhiệm vụ", value2: "Không có nhiệm vụ được giao", value4: "/quanly/congtacdamg/shthuongky/buoc5" },
    ]);


    const buttonList = [
        // default
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'math', 'imageGallery'],
        ['-right', 'image', 'audio', 'link'],
        // (min-width: 992)
        ['%992', [
            ['undo', 'redo'],
            [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike'],
            [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
            ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'audio', 'math', 'imageGallery']
        ]],
        // (min-width: 767)
        ['%767', [
            ['undo', 'redo'],
            [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
            [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
            [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'audio', 'math', 'imageGallery'],
            ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
        ]],
        // (min-width: 480)
        ['%480', [
            ['undo', 'redo'],
            [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
            [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
            [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
            [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'audio', 'math', 'imageGallery'],
            ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
        ]]
    ]
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
                        <p style={{ marginBottom: "5px" }}>Sinh hoạt Chi bộ III - Khối văn phòng tháng 2/2023 <b>/ Bước 1: Chuẩn bị tài liệu họp</b></p>
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
                                <h2 className='t-center pb-2'><b>SINH HOẠT CHI BỘ III - KHỐI VĂN PHÒNG THÁNG 2/2023</b>
                                </h2>

                                <div><p>Thông báo nội bộ tháng 2: <i className='red'>Không có tài liệu</i></p></div>
                            </Grid>


                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <p className='pb-2 pt-2'><span className='red'>* </span>Thời gian bắt đầu</p>
                                <DatePicker format="dd-MM-yyyy HH:ss" className='input-formx' />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <p className='pb-2 pt-2'><span className='red'>* </span>Thời gian kết thúc</p>
                                <DatePicker format="dd-MM-yyyy HH:ss" className='input-formx' />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <p className='pb-2 pt-2'><span className='red'>* </span>Địa điểm</p>
                                <Input placeholder="" className='input-formx' />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <p className='pb-2 pt-2'>Chủ trì cuộc họp</p>
                                <SelectPicker size="sm" data={data1} className='input-formx' />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} className="form-cus">
                                <p className='pb-2 pt-2'>Thư ký</p>
                                <SelectPicker size="sm" data={data1} className='input-formx' />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <p className='pb-2 pt-2'><span className='red'>* </span>Nội dung sinh hoạt</p>
                                <SunEditor

                                    setDefaultStyle="font-family: arial; font-size: 15px;"
                                    setOptions={{
                                        height: 'auto',
                                        minHeight: '170px',
                                        katex: "katex",
                                        buttonList: buttonList,

                                    }}
                                />
                                <div className='pb-2 pt-2'><p>Tài liệu cấp trên: <i className='red'>Không có tài liệu</i></p></div>
                                <div className='pb-2 pt-2'><p>Tài liệu đính kèm </p></div>
                                <FileTable></FileTable>

                                <p className='pb-2 pt-2'>Danh sách khách mời</p>
                                <TagPicker data={data1} block style={{ minHeight: "38px" }} />
                                <p className='pb-2 pt-2'>Đường dẫn họp trực tuyến</p>
                                <Input placeholder="" className='input-formx' />
                                <div className='displayflexcenter pt-4'>
                                    <NavLink to="/quanly/congtacdamg/shthuongky/chitiet" >
                                        <Button className='div-flex bor-ra-3 w-110' size="md" >
                                            <Icon className="icon icon-search pointer ">arrow_back</Icon> Quay về
                                        </Button>
                                    </NavLink>
                                    <Button color="red" appearance="primary" className='div-flex bor-ra-3 w-110' size="md">
                                        <Icon className="icon icon-search-2">save</Icon> Cập nhật
                                    </Button>
                                    <NavLink to="/quanly/congtacdamg/shthuongky/buoc2" >
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

