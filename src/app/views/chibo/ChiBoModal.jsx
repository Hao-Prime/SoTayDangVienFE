import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker } from 'rsuite';

import {
    Grid,
    styled,
    Autocomplete
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import chiBoUtil from 'app/utils/modules/ChiBo';
import Services from 'app/services';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function ChiBoModal({ chiBoUp, open, setOpen, reloadList }) {
    const [listDB, setListDB] = useState([]);
    const [chiBo, setChiBo] = useState(chiBoUtil.getChiBoThem());
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
        setChiBo(chiBoUp)
        Services.getDangBoService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setListDB(response.data)
                    }
                }
            }
        );

    }
    const handleSubmit = () => {
        let err = chiBoUtil.kiemTaChiBo(chiBo)
        if (err == "") {
            Services.getChiBoService().them(chiBo).then(
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
        let err = chiBoUtil.kiemTaChiBo(chiBo)
        if (err == "") {
            Services.getChiBoService().capNhat(chiBo).then(
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
        setChiBo({ ...chiBo, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {
        setChiBo({ ...chiBo, [atr]: value })
    };
    const handleClose = () => { setOpen(false); setError(""); setChiBo(chiBoUtil.getChiBoThem()) };
    return (
        <>
            <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CHI BỘ</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => console.log("onError")}>
                        <Grid container spacing={6} >
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                <TextField
                                    type="text"
                                    name="ten"
                                    value={chiBo.ten || ""}
                                    onChange={handleChange}
                                    errorMessages={["", "Tên không hợp lệ", "Tên quá dài"]}
                                    label={<span>Tên chi bộ <span className='red'>*</span></span>}
                                    validators={["required", "minStringLength: 4", "maxStringLength: 200"]}
                                />

                                <div className="pos-relative">
                                    <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày thành lập  <span className='red'>*</span></p></div>
                                    <DatePicker oneTap
                                        format="dd-MM-yyyy"
                                        defaultValue={chiBoUp.ngayThanhLap == null ? null : new Date(chiBoUp.ngayThanhLap?.substring(0, 10))}
                                        calendarDefaultDate={chiBoUp.ngayThanhLap == null ? null : new Date(chiBoUp.ngayThanhLap?.substring(0, 10))}
                                        onChange={(e) => { handleSelectChange("ngayThanhLap", e?.toJSON()?.substring(0, 10)) }} />

                                </div>
                                <Autocomplete
                                    value={chiBo.dangBo}
                                    onChange={(event, newValue) => { handleSelectChange("dangBo", newValue); }}
                                    options={listDB}
                                    getOptionLabel={(option) => option.ten}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label={<span>{"Thuộc Đảng bộ "}<span className='red'>*</span></span>}
                                            variant="outlined" fullWidth />
                                    )}
                                />
                                <TextField
                                    type="text"
                                    name="moTa"
                                    value={chiBo.moTa || ""}
                                    onChange={handleChange}
                                    label="Nội dung, mô tả chi bộ"
                                    multiline
                                    rows={4}
                                />
                            </Grid>


                        </Grid>


                    </ValidatorForm>

                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    {!chiBo.id > 0 ?
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
