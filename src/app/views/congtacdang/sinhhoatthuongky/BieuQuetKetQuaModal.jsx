import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker, TagPicker, SelectPicker, Input, Divider } from 'rsuite';
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



export default function BieuQuetKetQuaModal({ open, setOpen }) {
    const data1 = ['Huỳnh Chí Tường', 'Trần Hoàng Sơn', 'Huỳnh Quang Cường', "Nguyễn Thanh Khiêm", 'Nguyễn Minh Triết', 'Vũ Quang Huy', 'Nguyễn Phát Tài'].map(
        item => ({ label: item, value: item })
    );

    return (
        <>
            <Modal size="md" backdrop="static" overflow={false} keyboard={false} open={open} onClose={() => setOpen(!open)} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>Kết quả biểu quyết</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Grid container spacing={2} >
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <Grid container spacing={1} className="div-form">

                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2 bold'>Biểu quyết đang diễn ra</p>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Grid container spacing={1} className="div-form">
                                        <Grid item lg={12} md={12} sm={12} xs={12} className=' bold'>
                                            Tán thành biểu quyết đồng ý thực hiện nhiệm vụ
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            Thời gian bắt đầu : 21:36 20/02/2023<br />
                                            Số lượng Đảng viên có mặt: 20<br />
                                            Đồng ý: 0/20 (0%)

                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            Thời gian kết thúc : Chưa kết thúc<br />
                                            Số Đảng viên đã biểu quyết: 0/20<br />
                                            Không đồng ý: 0/20 (0%)<br />
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            <br />
                                            <br />
                                            Ý kiến khác: 0/20 (0%) Chi tiết
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Divider />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Grid container spacing={1} className="div-form">
                                        <Grid item lg={12} md={12} sm={12} xs={12} className=' bold'>
                                            Đồng ý chủ trương đề ra
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            Thời gian bắt đầu : 21:36 20/02/2023<br />
                                            Số lượng Đảng viên có mặt: 20<br />
                                            Đồng ý: 0/20 (0%)

                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            Thời gian kết thúc : Chưa kết thúc<br />
                                            Số Đảng viên đã biểu quyết: 0/20<br />
                                            Không đồng ý: 0/20 (0%)
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            <br />
                                            <br />
                                            Ý kiến khác: 0/20 (0%) Chi tiết
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Divider />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2 bold'>Biểu quyết đã kết thúc</p>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} className="form-cus">
                                    <Grid container spacing={1} className="div-form">
                                        <Grid item lg={12} md={12} sm={12} xs={12} className=' bold'>
                                            Đồng ý chủ trương đề ra
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            Thời gian bắt đầu : 21:36 20/02/2023<br />
                                            Số lượng Đảng viên có mặt: 20<br />
                                            Đồng ý: 0/20 (0%)

                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} >
                                            Thời gian kết thúc : Chưa kết thúc<br />
                                            Số Đảng viên đã biểu quyết: 0/20<br />
                                            Không đồng ý: 0/20 (0%)
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={4} ><br /><br />
                                            Ý kiến khác: 0/20 (0%) Chi tiết
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </Modal.Body>
                <Modal.Footer>
                    <Button color='red' appearance="primary" onClick={() => setOpen(false)}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
