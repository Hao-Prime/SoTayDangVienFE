import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker } from 'rsuite';

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
import qCUTUtil from 'app/utils/modules/QCUT';
import Services from 'app/services';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function QCUTModal({ qCUTUp, open, setOpen, reloadList }) {
    const [listTDCM, setListTDCM] = useState([]);
    const [listCVCM, setListCVCM] = useState([]);
    const [listDVGD, setListDVGD] = useState([]);
    const [listCB, setListCB] = useState([]);
    const [qCUT, setQCUT] = useState(qCUTUtil.getQCUTThem());
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    var isMounted = true;
    useEffect(() => {
        if (open) {
            isMounted = true;
            loadSelect();
            return () => { isMounted = false; };
        }
    }, [open]);
    function loadSelect() {
        setLoading(true);
        if (qCUTUp.id > 0) {
            Services.getQCUTService().getChiTietQCUT(qCUTUp.id).then(
                (response) => {
                    if (isMounted) {
                        if (response.data != null) {
                            setQCUT(response.data)
                            setLoading(false);
                        }
                    }
                }
            );
        } else {
            setQCUT(qCUTUp);
            setLoading(false);
        }
        Services.getDangVienService().getSelect().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListDVGD(response.data)
                    }
                }
            }
        );
        Services.getTrinhDoChuyenMonService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListTDCM(response.data)
                    }
                }
            }
        );
        Services.getChucVuChuyenMonService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListCVCM(response.data)
                    }
                }
            }
        );
        Services.getChiBoService().getSelect().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setListCB(response.data)
                    }
                }
            }
        );
    }

    const handleSubmit = () => {
        let err = qCUTUtil.kiemTaQCUT(qCUT)
        if (err == "") {
            Services.getQCUTService().them(qCUT).then(
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
        let err = qCUTUtil.kiemTaQCUT(qCUT)
        if (err == "") {
            Services.getQCUTService().capNhat(qCUT).then(
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
        setQCUT({ ...qCUT, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {
        setQCUT({ ...qCUT, [atr]: value })
    };
    const handleClose = () => { setOpen(false); setError(""); setQCUT(qCUTUtil.getQCUTThem()) };

    return (
        <>
            <Modal size="md" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>QUẦN CHÚNG ƯU TÚ</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {!loading &&
                        <ValidatorForm onSubmit={handleSubmit} onError={() => console.log("onError")}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                <Grid container spacing={2} >
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            type="text"
                                            name="hoTen"
                                            value={qCUT.hoTen || ""}
                                            onChange={handleChange}
                                            errorMessages={["", "Tên không hợp lệ", "Tên quá dài"]}
                                            label={<span>Họ tên Quần chúng <span className='red'>*</span></span>}
                                            validators={["required", "minStringLength: 4", "maxStringLength: 30"]}
                                        />
                                        <TextField
                                            type="text"
                                            name="soCMND"
                                            value={qCUT.soCMND || ""}
                                            onChange={handleChange}
                                            errorMessages={["Số CMND không hơp lệ"]}
                                            label={<span>Số CMND/CCCD <span className='red'>*</span></span>}
                                            validators={["required", "minStringLength: 9", "maxStringLength: 12"]}
                                        />
                                        <TextField
                                            type="text"
                                            name="email"
                                            value={qCUT.email || ""}
                                            onChange={handleChange}
                                            errorMessages={["Cần nhập email"]}
                                            label={<span>{"Email"}<span className='red'>*</span></span>}
                                            validators={["required"]}
                                        />
                                        <TextField
                                            type="text"
                                            name="soDienThoai"
                                            value={qCUT.soDienThoai || ""}
                                            onChange={handleChange}
                                            errorMessages={["", "Số điện thoại không hơp lệ", "Số điện thoại không hơp lệ"]}
                                            label={<span>{"Số điện thoại "}<span className='red'>*</span></span>}
                                            validators={["required", "minStringLength: 10", "maxStringLength: 10"]}
                                        />


                                        <RadioGroup
                                            row
                                            name="gioiTinh"
                                            sx={{ mb: 2 }}
                                            value={qCUT.gioiTinh}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value={true}
                                                label="Nam"
                                                labelPlacement="end"
                                                control={<Radio color="secondary" />}
                                            />

                                            <FormControlLabel
                                                value={false}
                                                label="Nữ"
                                                labelPlacement="end"
                                                control={<Radio color="secondary" />}
                                            />


                                        </RadioGroup>

                                        <div className="pos-relative">
                                            <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày sinh <span className='red'>*</span></p></div>
                                            <DatePicker oneTap
                                                format="dd-MM-yyyy"
                                                defaultValue={qCUT.ngaySinh == null ? null : new Date(qCUT.ngaySinh?.substring(0, 10))}
                                                calendarDefaultDate={qCUT.ngaySinh == null ? null : new Date(qCUT.ngaySinh?.substring(0, 10))}
                                                onChange={(e) => { handleSelectChange("ngaySinh", e?.toJSON()?.substring(0, 10)) }} />

                                        </div>
                                        <TextField
                                            type="text"
                                            name="queQuan"
                                            value={qCUT.queQuan || ""}
                                            onChange={handleChange}
                                            label="Quê quán"
                                        />
                                        <Autocomplete
                                            value={qCUT.trinhDoChuyenMon}
                                            onChange={(event, newValue) => { handleSelectChange("trinhDoChuyenMon", newValue); }}
                                            options={listTDCM}
                                            getOptionLabel={(option) => option.ten}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label={<span>{"Trình độ chuyên môn "}<span className='red'>*</span></span>}

                                                    variant="outlined" fullWidth />
                                            )}
                                        />
                                        <Autocomplete
                                            value={qCUT.chucVuChuyenMon}
                                            onChange={(event, newValue) => { handleSelectChange("chucVuChuyenMon", newValue); }}
                                            options={listCVCM}
                                            getOptionLabel={(option) => option.ten}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label={<span>{"Chức vụ chuyên môn "}<span className='red'>*</span></span>}
                                                    variant="outlined" fullWidth />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12} >

                                        <div className="pos-relative">
                                            <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày đưa vào <span className='red'>*</span></p></div>
                                            <DatePicker oneTap
                                                format="dd-MM-yyyy"
                                                defaultValue={qCUT.ngayDuaVao == null ? null : new Date(qCUT.ngayDuaVao?.substring(0, 10))}
                                                calendarDefaultDate={qCUT.ngayDuaVao == null ? null : new Date(qCUT.ngayDuaVao?.substring(0, 10))}
                                                onChange={(e) => { handleSelectChange("ngayDuaVao", e?.toJSON()?.substring(0, 10)) }} />

                                        </div>
                                        <Autocomplete
                                            value={qCUT.dangVienGiupDo}
                                            onChange={(event, newValue) => { handleSelectChange("dangVienGiupDo", newValue); }}
                                            options={listDVGD}
                                            getOptionLabel={(option) => option.hoTen}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label={<span>{"Đảng viên giúp đỡ "}<span className='red'>*</span></span>}
                                                    variant="outlined" fullWidth />
                                            )}
                                        />

                                        <Autocomplete
                                            value={qCUT.chiBo}
                                            onChange={(event, newValue) => { handleSelectChange("chiBo", newValue); }}
                                            options={listCB}
                                            getOptionLabel={(option) => option.ten}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label={<span>{"Chi bộ "}<span className='red'>*</span></span>}
                                                    variant="outlined" fullWidth />
                                            )}
                                        />
                                    </Grid>
                                </Grid>



                            </Grid>




                        </ValidatorForm>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    {!qCUT.id > 0 ?
                        <Button onClick={handleSubmit} appearance="primary">
                            Lưu
                        </Button> :
                        <Button onClick={handleCapNhat} appearance="primary">
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
