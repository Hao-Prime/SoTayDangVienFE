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

export default function FormCongViec({ congViecUp, setVanBan, vanBan }) {
    const [listCB, setListCB] = useState([]);
    const [congViec, setCongViec] = useState(congViecUtil.getCongViecThem());
    const [error, setError] = useState("");
    var isMounted = true;
    useEffect(() => {

        isMounted = true;
        loadSelect();
        return () => { isMounted = false; };

    }, []);
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
                handleClose()
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

                    }
                } else {
                    setVanBan({ ...vanBan, "listCongViec": listCV })

                }
                handleClose()

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

    const handleClose = () => { setError(""); setCongViec(congViecUtil.getCongViecThem()); setError(""); };
    return (
        <>
            <Autocomplete
                multiple
                disabled={congViec.capNhat ? true : false}
                id="checkboxes-tags-demo"
                value={congViec.listChiBo}
                options={listCB}
                disableCloseOnSelect
                limitTags={3}
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
            <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                        type="text"
                        name="ten"
                        value={congViec.ten || ""}
                        onChange={handleChange}

                        label={<span>Tên công việc <span className='red'>*</span></span>}

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
                </Grid>
            </Grid>

            <TextField
                type="text"
                name="noiDung"
                value={congViec.noiDung || ""}
                onChange={handleChange}
                label="Nội dung, mô tả công việc"
                multiline
                rows={2}
            />
            <Grid style={{ marginBottom: '15px' }}>

                <Button onClick={handleSubmit} color="cyan" appearance="ghost">
                    Thêm nhanh công việc
                </Button>
                <span className='text-eror' style={{ marginLeft: "10px" }}><i>{error}</i></span>
            </Grid>





        </>
    );
}
