import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker } from 'rsuite';
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
import quaTrinhSinhHoatUtil from 'app/utils/modules/QuaTrinhSinhHoat';
import Services from 'app/services';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function QuaTrinhSHModal({ quaTrinhSinhHoatUp, open, setOpen, reloadData }) {

    const [quaTrinhSinhHoat, setQuaTrinhSinhHoat] = useState(quaTrinhSinhHoatUp);
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
        setQuaTrinhSinhHoat(quaTrinhSinhHoatUp);
    }
    const handleThem = () => {
        let err = quaTrinhSinhHoatUtil.kiemTaQuaTrinhSinhHoat(quaTrinhSinhHoat)
        if (err == "") {
            Services.getQuaTrinhSinhHoatService().them(quaTrinhSinhHoat).then(
                (response) => {
                    if (response.data?.tenLoi != undefined) {
                        setError(response.data?.noiDung)
                    } else {
                        handleClose();
                        reloadData()
                    }

                }
            );
        } else {
            setError(err)
        }
    };
    const handleCapNhat = () => {
        let err = quaTrinhSinhHoatUtil.kiemTaQuaTrinhSinhHoat(quaTrinhSinhHoat)
        if (err == "") {
            Services.getQuaTrinhSinhHoatService().capNhat(quaTrinhSinhHoat).then(
                (response) => {
                    if (response.data?.tenLoi != undefined) {
                        setError(response.data?.noiDung)
                    } else {
                        handleClose();
                        reloadData()
                    }

                }
            );
        } else {
            setError(err)
        }
    };
    const handleChange = (event) => {
        event.persist(); setError("");
        setQuaTrinhSinhHoat({ ...quaTrinhSinhHoat, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {
        setQuaTrinhSinhHoat({ ...quaTrinhSinhHoat, [atr]: value })
    };
    const handleClose = () => { setOpen(false); setError(""); setQuaTrinhSinhHoat(quaTrinhSinhHoatUtil.getQuaTrinhSinhHoatThem()) };

    return (
        <>
            <Modal size="sm" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>QUÁ TRÌNH SINH HOẠT</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ValidatorForm onSubmit={handleThem} onError={() => console.log("onError")}>
                        <Grid container spacing={6} >
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                <RadioGroup
                                    row
                                    name="phanLoai"
                                    sx={{ mb: 2 }}
                                    value={quaTrinhSinhHoat.phanLoai || ""}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value={0}
                                        label="Chuyển nội bộ"
                                        labelPlacement="end"
                                        control={<Radio color="secondary" />}
                                    />

                                    <FormControlLabel
                                        value={1}
                                        label="Chuyển đi"
                                        labelPlacement="end"
                                        control={<Radio color="secondary" />}
                                    />
                                    <FormControlLabel
                                        value={2}
                                        label="Chuyển đến"
                                        labelPlacement="end"
                                        control={<Radio color="secondary" />}
                                    />

                                </RadioGroup>
                                <TextField
                                    type="text"
                                    name="chuyenTu"
                                    value={quaTrinhSinhHoat.chuyenTu || ""}
                                    onChange={handleChange}
                                    label={<span>{"Chuyển từ "}<span className='red'>*</span></span>}

                                />
                                <TextField
                                    type="text"
                                    name="chuyenDen"
                                    value={quaTrinhSinhHoat.chuyenDen || ""}
                                    onChange={handleChange}
                                    label={<span>{"Chuyển đến "}<span className='red'>*</span></span>}

                                />

                                <div className="pos-relative">
                                    <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày chuyển <span className='red'>*</span></p></div>
                                    <DatePicker oneTap
                                        format="dd-MM-yyyy"
                                        defaultValue={quaTrinhSinhHoatUp.ngayChuyen == null ? null : new Date(quaTrinhSinhHoatUp.ngayChuyen?.substring(0, 10))}
                                        calendarDefaultDate={quaTrinhSinhHoatUp.ngayChuyen == null ? null : new Date(quaTrinhSinhHoatUp.ngayChuyen?.substring(0, 10))}
                                        onChange={(e) => { handleSelectChange("ngayChuyen", e?.toJSON()?.substring(0, 10)) }} />

                                </div>
                                <TextField
                                    type="text"
                                    name="noiDung"
                                    value={quaTrinhSinhHoat.noiDung || ""}
                                    onChange={handleChange}
                                    label="Nội dung quá trình"
                                    multiline

                                />
                            </Grid>


                        </Grid>


                    </ValidatorForm>

                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    {quaTrinhSinhHoatUp.id > 0 ?
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
