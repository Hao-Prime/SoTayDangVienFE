import React, { useEffect, useState } from 'react';
import { Button, Modal, Uploader, DatePicker } from 'rsuite';
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

export default function DanhGiaCongViecModal({ congViecUp, open, setOpen, reloadList }) {
    const [listDV, setListDV] = useState([]);
    const [listCB, setListCB] = useState([]);
    const [congViec, setCongViec] = useState(congViecUtil.getCongViecThem());
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
        setLoading(false)
    }
    const handleSubmit = () => {
        let rs = []
        console.log(congViec.phanLoaiDG);
        console.log(congViec.trangThai);
        if (congViec.phanLoaiDG != null && congViec.trangThai == 0) {
            setError("Công việc chưa xử lý xong thì không thể đánh giá")
            return;
        }
        congViec.listID?.forEach(id => {
            let item = {
                "id": id,
                "thoiHan": congViec.thoiHan,
                "ngayHoanThanh": congViec.ngayHoanThanh,
                "phanLoaiDG": congViec.phanLoaiDG,
                "noiDungDG": congViec.noiDungDG,
                "trangThai": congViec.trangThai
            }
            rs.push(item)
        });
        console.log(rs);
        Services.getCongViecService().capNhatNhieuCongViec(rs).then(
            (response) => {
                if (response.data?.tenLoi != undefined) {
                    setError(response.data?.noiDung)
                } else {
                    handleClose();
                    reloadList()
                }

            }
        );

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

    const handleClose = () => { setOpen(false); setError(""); setCongViec(congViecUtil.getCongViecThem()) };
    return (
        <>
            <Modal size="md" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CÔNG VIỆC</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {!loading &&
                        <ValidatorForm onSubmit={handleSubmit} onError={() => console.log("onError")}>
                            <Grid container spacing={6} >
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                    <div className="gird-inline div-flex">
                                        <p ><b>SỐ LƯỢNG: {congViec.listID?.length}</b></p>
                                    </div>
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
                                            <div className="pos-relative">
                                                <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Thời hạn <span className='red'>*</span></p></div>
                                                <DatePicker oneTap
                                                    format="dd-MM-yyyy"
                                                    defaultValue={congViec.thoiHan == null ? null : new Date(congViec.thoiHan?.substring(0, 10))}
                                                    calendarDefaultDate={congViec.thoiHan == null ? null : new Date(congViec.thoiHan?.substring(0, 10))}
                                                    onChange={(e) => { handleSelectChange("thoiHan", e?.toJSON()?.substring(0, 10)) }} />

                                            </div>
                                            <div className="pos-relative">
                                                <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày hoàn thành <span className='red'>*</span></p></div>
                                                <DatePicker oneTap
                                                    format="dd-MM-yyyy"
                                                    defaultValue={congViec.ngayHoanThanh == null ? null : new Date(congViec.ngayHoanThanh?.substring(0, 10))}
                                                    calendarDefaultDate={congViec.ngayHoanThanh == null ? null : new Date(congViec.ngayHoanThanh?.substring(0, 10))}
                                                    onChange={(e) => { handleSelectChange("ngayHoanThanh", e?.toJSON()?.substring(0, 10)) }} />

                                            </div>

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
                    }
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
