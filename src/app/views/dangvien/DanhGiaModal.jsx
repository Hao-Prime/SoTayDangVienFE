import React, { useEffect, useState } from 'react';
import { Button, Modal, Stack } from 'rsuite';
import { DatePicker } from "@mui/lab";
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

import Services from 'app/services';
import danhGiaXepLoaiDVUtil from 'app/utils/modules/DanhGiaXepLoaiDV';
import PhanLoai from 'app/common/PhanLoai';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function DanhGiaModal({ listDangVien, xepLoaiUp, open, setOpen, reloadList, namXepLoai }) {

    const [xepLoai, setXepLoai] = useState(danhGiaXepLoaiDVUtil.getDanhGiaXepLoaiDV());
    const [error, setError] = useState("");
    var isMounted = true;
    useEffect(() => {
        if (open) {
            isMounted = true;
            loadSelect();
            return () => { isMounted = false; };
        }
    }, [open]);
    function loadSelect() {
        if (xepLoaiUp) {
            setXepLoai(xepLoaiUp);
        } else setXepLoai(danhGiaXepLoaiDVUtil.getDanhGiaXepLoaiDV());
    }
    const handleThem = () => {
        let err = danhGiaXepLoaiDVUtil.kiemTaDanhGiaXepLoaiDV(xepLoai)
        if (err == "") {
            let listXL = []
            listDangVien.forEach(dv => {
                listXL.push({ ...xepLoai, nam: namXepLoai, dangVien: dv })
            });
            // console.log(listXL);
            Services.getDanhGiaDVService().themList(listXL).then(
                (response) => {
                    if (response.data?.tenLoi != undefined) {
                        setError(response.data?.noiDung)
                    } else {
                        handleClose();
                        reloadList()
                    }

                }
            );
        } else {
            setError(err)
        }
    };
    const handleCapNhat = () => {
        let err = danhGiaXepLoaiDVUtil.kiemTaDanhGiaXepLoaiDV(xepLoai)
        if (err == "") {
            Services.getDanhGiaDVService().capNhat({ ...xepLoai, dangVien: listDangVien[0] }).then(
                (response) => {
                    if (response.data?.tenLoi != undefined) {
                        setError(response.data?.noiDung)
                    } else {
                        handleClose();
                        reloadList()
                    }

                }
            );
        } else {
            setError(err)
        }
    };
    const handleChange = (event) => {
        event.persist(); setError("");
        setXepLoai({ ...xepLoai, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {

        setXepLoai({ ...xepLoai, [atr]: value?.value })
    };
    const handleClose = () => { setOpen(false); setError(""); setXepLoai(danhGiaXepLoaiDVUtil.getDanhGiaXepLoaiDV()) };

    return (
        <>
            <Modal size="sm" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>{"KẾT QUẢ ĐÁNH GIÁ CHẤT LƯỢNG ĐẢNG VIÊN NĂM "}<span className='red'>{namXepLoai}</span></b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ValidatorForm onSubmit={handleThem} onError={() => console.log("onError")}>
                        <Grid container spacing={6} >
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                <Stack style={{ marginBottom: "13px" }}>
                                    <p><b>ĐẢNG VIÊN : </b>{listDangVien.map(item => item.hoTen + ", ")}</p>
                                </Stack>
                                <Autocomplete
                                    value={xepLoai.phanLoai > 0 ? { value: xepLoai.phanLoai } : null}
                                    onChange={(event, newValue) => { handleSelectChange("phanLoai", newValue); }}
                                    options={PhanLoai.getSelectPhanLoaiXepLoai()}
                                    getOptionLabel={(option) => PhanLoai.getPhanLoaiXepLoai(option.value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label={<span>{"Xếp loại đánh giá "}<span className='red'>*</span></span>} variant="outlined" fullWidth />
                                    )}
                                />
                                <TextField
                                    type="text"
                                    name="moTa"
                                    value={xepLoai.moTa || ""}
                                    onChange={handleChange}
                                    label="Nội dung, mô tả đánh giá"
                                    multiline
                                    rows={4}
                                />
                            </Grid>


                        </Grid>


                    </ValidatorForm>

                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    {xepLoaiUp?.id > 0 ?
                        <Button onClick={handleCapNhat} appearance="primary">
                            Lưu
                        </Button> :
                        <Button onClick={handleThem} appearance="primary">
                            Lưu
                        </Button>}
                    <Button onClick={handleClose} appearance="default">
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
