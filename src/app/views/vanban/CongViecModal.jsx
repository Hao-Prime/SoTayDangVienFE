import React, { useEffect, useState } from 'react';
import { Button, Modal, Uploader } from 'rsuite';
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
import congViecUtil from 'app/utils/modules/CongViec';
import Services from 'app/services';
import PhanLoai from 'app/common/PhanLoai';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function CongViecModal({ congViecUp, setVanBan, vanBan, open, setOpen }) {
    const [listCB, setListCB] = useState([]);
    const [congViec, setCongViec] = useState(congViecUtil.getCongViecThem());
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
        setCongViec(congViecUp)
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
        let err = congViecUtil.kiemTaCongViec(congViec)
        if (err == "") {
            if (congViecUp.capNhat) {
                let listCV = []
                vanBan?.listCongViec.forEach(cv => {
                    if (cv.chiBo?.id == congViec.listChiBo[0]?.id) {
                        listCV.push({ ...congViec, chiBo: congViec.listChiBo[0] })
                    } else listCV.push({ ...cv })
                });
                setVanBan({ ...vanBan, "listCongViec": listCV })
                handleClose();
            } else {
                let listCV = []
                let cv = { ...congViec }
                congViec?.listChiBo.forEach(cb => {
                    listCV.push({ ...cv, chiBo: cb })
                });

                let tonTaiChiBo = false
                let rs = []
                let thongBaoTonTai = false
                vanBan?.listCongViec?.forEach(cv2 => {
                    let tonTai = false
                    listCV?.forEach(cv1 => {
                        if (cv1?.chiBo?.id == cv2.chiBo?.id) {
                            tonTai = true
                        }
                    });
                    if (!tonTai) {
                        rs.push(cv2)
                    }
                });
                listCV.push(...rs)
                if (thongBaoTonTai) {
                    if (window.confirm("Đã phát hiện công việc đã phân cho chi bộ, đồng ý sẽ cập nhật")) {
                        setVanBan({ ...vanBan, "listCongViec": listCV })
                        handleClose();
                    }
                } else {
                    setVanBan({ ...vanBan, "listCongViec": listCV })
                    handleClose();
                }


            }

        } else {
            setError(err)
        }
    };

    const handleChange = (event) => {
        event.persist(); setError("");
        setCongViec({ ...congViec, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {
        if (atr == "phanLoaiDG") {
            setCongViec({ ...congViec, [atr]: value?.value })
        } else {
            setCongViec({ ...congViec, [atr]: value })
        }

    };

    const handleClose = () => { setOpen(false); setError(""); setCongViec(congViecUtil.getCongViecThem()); setError(""); };
    return (
        <>
            <Modal size="md" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CÔNG VIỆC</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => console.log("onError")}>
                        <Grid container spacing={6} >
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                <Autocomplete
                                    multiple
                                    disabled={congViec.capNhat ? true : false}
                                    id="checkboxes-tags-demo"
                                    value={congViec.listChiBo}
                                    options={listCB}
                                    disableCloseOnSelect
                                    limitTags={5}
                                    getOptionLabel={(option) => option.ten}
                                    onChange={(event, newValue) => { handleSelectChange("listChiBo", newValue); }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}/*  */
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.ten}
                                        </li>
                                    )}

                                    renderInput={(params) => (
                                        <TextField {...params} label={<span>Chi bộ thực hiện <span className='red'>*</span></span>} placeholder="" />
                                    )}
                                />
                                <TextField
                                    type="text"
                                    name="ten"
                                    value={congViec.ten || ""}
                                    onChange={handleChange}
                                    errorMessages={["", "Tên không hợp lệ", "Tên quá dài"]}
                                    label={<span>Tên công việc <span className='red'>*</span></span>}
                                    validators={["required", "minStringLength: 3", "maxStringLength: 1000"]}
                                />
                                <TextField
                                    type="text"
                                    name="noiDung"
                                    value={congViec.noiDung || ""}
                                    onChange={handleChange}
                                    label="Nội dung, mô tả "
                                    multiline
                                    rows={5}
                                />
                                <RadioGroup
                                    row
                                    name="trangThai"
                                    sx={{ mb: 2 }}
                                    value={congViec.trangThai}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value={0}
                                        label="Đang xử lý"
                                        labelPlacement="end"
                                        control={<Radio color="secondary" />}
                                    />
                                    <FormControlLabel
                                        value={1}
                                        label="Đã xử lý"
                                        labelPlacement="end"
                                        control={<Radio color="secondary" />}
                                    />
                                </RadioGroup>
                                <Grid container spacing={1}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Autocomplete
                                            value={congViec.phanLoaiDG > 0 ? { value: congViec.phanLoaiDG } : null}
                                            onChange={(event, newValue) => { handleSelectChange("phanLoaiDG", newValue); }}
                                            options={PhanLoai.getSelectXepLoaiCongViec()}
                                            getOptionLabel={(option) => PhanLoai.getXepLoaiCongViec(option.value)}
                                            renderInput={(params) => (
                                                <TextField {...params} label={<span>{"Phân loại "}</span>} variant="outlined" fullWidth />
                                            )}
                                        />

                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>

                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={congViec.thoiHan}
                                                onChange={(date) => handleSelectChange("thoiHan", date)}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        label={<span>{"Thời hạn "}</span>}

                                                        id="mui-pickers-date"
                                                        sx={{ mb: 2, width: "100%" }}
                                                    />
                                                )}
                                            />

                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={congViec.ngayHoanThanh}
                                                onChange={(date) => handleSelectChange("ngayHoanThanh", date)}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        label={<span>{"Ngày hoàn thành "}</span>}
                                                        id="mui-pickers-date"
                                                        sx={{ mb: 2, width: "100%" }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <TextField
                                    type="text"
                                    name="noiDungDG"
                                    value={congViec.noiDungDG || ""}
                                    onChange={handleChange}
                                    label="Nội dung, mô tả đánh giá xếp loại"
                                    multiline
                                    rows={5}
                                />




                            </Grid>


                        </Grid>


                    </ValidatorForm>

                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    <Button onClick={handleSubmit} appearance="primary">
                        Lưu
                    </Button>
                    <Button onClick={handleClose} appearance="default">
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
