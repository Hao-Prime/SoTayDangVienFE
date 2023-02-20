import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker, TagPicker, SelectPicker, Input } from 'rsuite';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,

    styled,
    Autocomplete
} from "@mui/material";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import dangVienUtil from 'app/utils/modules/DangVien';
import Services from 'app/services';
import SapXep from 'app/common/SapXep';
import File2Table from './FileTable2';
import { Radio, RadioGroup, Form } from 'rsuite';


export default function BieuQuetModal({ open, setOpen }) {
    const data1 = ['Huỳnh Chí Tường', 'Trần Hoàng Sơn', 'Huỳnh Quang Cường', "Nguyễn Thanh Khiêm", 'Nguyễn Minh Triết', 'Vũ Quang Huy', 'Nguyễn Phát Tài'].map(
        item => ({ label: item, value: item })
    );

    return (
        <>
            <Modal size="sm" backdrop="static" overflow={false} keyboard={false} open={open} onClose={() => setOpen(!open)} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>Biểu quyết</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Grid container spacing={2} >
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <Grid container spacing={1} className="div-form">

                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'><span className='red'>* </span>Tán thành biểu quyết đồng ý thực hiện nhiệm vụ</p>
                                    <Form.Group controlId="radioList" >
                                        <RadioGroup name="radioList" inline>
                                            <Radio value="A">Đồng ý</Radio>
                                            <Radio value="B">Không đồng ý</Radio>
                                            <Radio value="C">Ý kiến khác</Radio>

                                        </RadioGroup>
                                    </Form.Group>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <p className='pb-2 pt-2'><span className='red'>* </span>Đồng ý chủ trương đề ra</p>
                                    <Form.Group controlId="radioList" >
                                        <RadioGroup name="radioList" inline>
                                            <Radio value="A">Đồng ý</Radio>
                                            <Radio value="B">Không đồng ý</Radio>
                                            <Radio value="C">Ý kiến khác</Radio>

                                        </RadioGroup>
                                    </Form.Group>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary">
                        Gửi
                    </Button>
                    <Button onClick={() => setOpen(false)} appearance="default">
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
