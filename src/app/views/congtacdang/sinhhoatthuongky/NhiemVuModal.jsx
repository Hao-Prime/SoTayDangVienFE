import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker, TagPicker, SelectPicker, Input } from 'rsuite';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    Autocomplete
} from "@mui/material";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import dangVienUtil from 'app/utils/modules/DangVien';
import Services from 'app/services';
import SapXep from 'app/common/SapXep';
import File2Table from './FileTable2';



export default function NhiemVuModal({ open, setOpen }) {
    const data1 = ['Huỳnh Chí Tường', 'Trần Hoàng Sơn', 'Huỳnh Quang Cường', "Nguyễn Thanh Khiêm", 'Nguyễn Minh Triết', 'Vũ Quang Huy', 'Nguyễn Phát Tài'].map(
        item => ({ label: item, value: item })
    );

    return (
        <>
            <Modal size="md" backdrop="static" overflow={false} keyboard={false} open={open} onClose={() => setOpen(!open)} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>Thêm mới</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Grid container spacing={2} >
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <Grid container spacing={1} className="div-form">

                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'><span className='red'>* </span>Sở cứ</p>
                                    <SelectPicker size="sm" data={[]} disabled placeholder="Sinh hoạt Chi bộ III - Khối văn phòng tháng 3/2023" className='input-formx' />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'><span className='red'>* </span>Người nhận nhiệm vụ</p>
                                    <TagPicker data={data1} block style={{ minHeight: "38px" }} />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'><span className='red'>* </span>Mô tả nhiệm vụ</p>
                                    <Input placeholder="" className='input-formx' as="textarea" />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'> Ghi chú</p>
                                    <Input placeholder="" className='input-formx' as="textarea" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={6} className="form-cus">
                                    <p className='pb-2 pt-2'>Thời gian bắt đầu</p>
                                    <DatePicker format="dd-MM-yyyy HH:ss" className='input-formx' />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={6} className="form-cus">
                                    <p className='pb-2 pt-2'>Thời gian kết thúc</p>
                                    <DatePicker format="dd-MM-yyyy HH:ss" className='input-formx' />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={6} className="form-cus">
                                    <p className='pb-2 pt-2'>Ngày giao nhiệm vụ</p>
                                    <DatePicker format="dd-MM-yyyy HH:ss" className='input-formx' />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'><span className='red'>* </span>Tài liệu giao nhiệm vụ</p>
                                    <File2Table />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary">
                        Thêm mới
                    </Button>
                    <Button onClick={() => setOpen(false)} appearance="default">
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
