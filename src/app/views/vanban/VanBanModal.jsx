import React, { useEffect, useState } from 'react';
import { Button, Modal, Uploader, Stack, DatePicker } from 'rsuite';
// import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CongViecModal from './CongViecModal';
import {
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    Autocomplete, Divider, Backdrop, CircularProgress
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import { Paragraph } from 'app/components/Typography';
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import vanBanUtil from 'app/utils/modules/VanBan';
import Services from 'app/services';
import PhanLoai from 'app/common/PhanLoai';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import congViecUtil from 'app/utils/modules/CongViec';
import FormatDate from 'app/common/FormatDate';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormCongViec from './FormCongViec';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));
const Heading = styled(Typography)(({ theme }) => ({
    flexBasis: "35%",
    flexShrink: 0,
    fontWeight: "bold"
}));
const SecondaryHeading = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
}));

export default function VanBanModal({ vanBanUp, open, setOpen, reloadList }) {
    const [expanded, setExpanded] = useState(false);
    const [listDV, setListDV] = useState([]);
    const [vanBan, setVanBan] = useState(vanBanUtil.getVanBanThem());
    const [openCongViecModal, setOpenCongViecModal] = useState(false);
    const [error, setError] = useState("");
    const [congViecUp, setCongViecUp] = useState(congViecUtil.getCongViecThem());
    var isMounted = true;
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (open) {
            isMounted = true;
            loadSelect();
            return () => { isMounted = false; };
        }
    }, [open]);
    function loadSelect() {
        if (vanBanUp.id > 0) {
            setLoading(true)
            Services.getVanBanService().getChiTietVanBan(vanBanUp.id).then(
                (response) => {
                    if (isMounted) {
                        if (response.data != null) {
                            response?.data?.listFileVanBan?.forEach(file => {
                                file.url = process.env.REACT_APP_URL_SERVER + file.url
                            });
                            setVanBan({ ...response.data, listDangVien: response.data?.listVBDV?.map(item => item.dangVien) })
                            setLoading(false)

                        }
                    }
                }
            );

        } else {
            setVanBan(vanBanUp)
            setLoading(false)
        }
        Services.getDangVienService().getSelect().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListDV(response.data)
                    }
                }
            }
        );
    }
    const handleThem = () => {
        let err = vanBanUtil.kiemTaVanBan(vanBan)
        if (err == "") {

            let listVBDV = []
            vanBan.listDangVien?.forEach(dv => {
                listVBDV.push({ dangVien: dv })
            });
            let req = { ...vanBan, listVBDV: listVBDV }
            setUploading(true)
            Services.getVanBanService().them(req).then(
                (response) => {
                    if (response?.data?.tenLoi != undefined) {
                        setUploading(false)
                        setError(response.data?.noiDung)
                    } else {

                        uploadFile(response.data)
                    }

                }
            );
        } else {
            setError(err)
        }
    };
    const handleCapNhat = () => {
        console.log(files.length);
        let err = vanBanUtil.kiemTaVanBan(vanBan)
        if (err == "") {

            let listVBDV = []
            vanBan.listDangVien?.forEach(dv => {
                listVBDV.push({ dangVien: dv })
            });
            let req = { ...vanBan, listVBDV: listVBDV }
            setUploading(true)
            Services.getVanBanService().capNhat(req).then(
                (response) => {
                    if (response?.data?.tenLoi != undefined) {
                        setUploading(false)
                        setError(response.data?.noiDung)
                    } else {
                        uploadFile(response.data)
                    }

                }
            );
        } else {
            setError(err)
        }
    };
    const handleChange = (event) => {
        event.persist(); setError("");
        setVanBan({ ...vanBan, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {
        if (atr == "phanLoai") {
            setVanBan({ ...vanBan, [atr]: value?.value })
        } else {
            setVanBan({ ...vanBan, [atr]: value })
        }

    };
    const handleImportFile = (files) => {
        console.log(files);
        let rs = []
        files.forEach(file => {
            if (file.blobFile != undefined) {
                rs.push(file)
            }
        });
        setFiles(Object.values(rs.map(item => item.blobFile)));
    };
    const handleRemoveFile = (files) => {
        console.log(files);
        if (files.id > 0) {
            if (window.confirm("Bạn có chắc muốn thoát")) {
                Services.getFileService().xoaFileVanBan(files.id)
            }

        }
        // setFiles(Object.values(files.map(item => item.blobFile)));
    };
    const handleThemCongViec = () => {
        setCongViecUp(congViecUtil.getCongViecThem())
        setOpenCongViecModal(true)

    };
    const handleCapNhatCongViec = (data) => {
        setCongViecUp({ ...data, listChiBo: [data.chiBo], capNhat: true })
        setOpenCongViecModal(true)
    };
    const handleXoaCongViec = (data) => {
        let rs = []
        vanBan?.listCongViec?.forEach(cv => {
            if (cv.chiBo?.id != data.chiBo?.id) {
                rs.push(cv)
            }
        });
        setVanBan({ ...vanBan, "listCongViec": rs })
    };
    const handleClose = () => { if (window.confirm("Bạn có chắc muốn thoát")) { setOpen(false); setVanBan(vanBanUtil.getVanBanThem()) } };
    const handleChangePanel = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function uploadFile(responseData) {
        if (files.length != 0) {

            const formData = new FormData();
            formData.append("id", responseData.split("id=")[1]);
            files?.forEach(file => {
                formData.append('files', file);
            });

            Services.getFileService().themFileVanBan(formData).then(
                (response) => {
                    if (response?.data?.tenLoi != undefined) {
                        setError(response.data?.noiDung)
                    } else {
                        setUploading(false)
                        setOpen(false);
                        setVanBan(vanBanUtil.getVanBanThem())
                        reloadList()
                    }

                }
            );
        } else {
            setOpen(false);
            setVanBan(vanBanUtil.getVanBanThem())
            setUploading(false)
            reloadList()
        }
    }

    const fileList = [
        {
            name: 'a.png',
            fileKey: 1,
            url: 'https://user-ixmages.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png'
        },
        {
            name: 'b.png',
            fileKey: 2,
            url: 'https://user-imxages.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png'
        }
    ];
    return (
        <>
            <Modal overflow={true} size="lg" backdrop="static" keyboard={false} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title><b>VĂN BẢN</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={uploading} >
                        <CircularProgress color="inherit" />&emsp;Đang xử lý...
                    </Backdrop>
                    {!loading &&
                        <ValidatorForm onSubmit={handleThem} onError={() => console.log("onError")}>
                            <Grid container spacing={6} >
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <TextField
                                                type="text"
                                                name="soEOFFICE"
                                                value={vanBan.soEOFFICE || ""}
                                                onChange={handleChange}

                                                label={<span>Số EOFFICE <span className='red'>*</span></span>}

                                            />
                                            <Autocomplete
                                                value={vanBan.phanLoai > 0 ? { value: vanBan.phanLoai } : null}
                                                onChange={(event, newValue) => { handleSelectChange("phanLoai", newValue); }}
                                                options={PhanLoai.getSelectPhanLoaiVanBan()}
                                                getOptionLabel={(option) => PhanLoai.getPhanLoaiVanBan(option.value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label={<span>{"Phân loại "}<span className='red'>*</span></span>} variant="outlined" fullWidth />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} className="pos-relative">

                                            <TextField
                                                type="text"
                                                name="soKyHieu"
                                                value={vanBan.soKyHieu || ""}
                                                onChange={handleChange}
                                                label={<span>Số ký hiệu <span className='red'>*</span></span>}
                                            />
                                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={vanBan.ngayTao}
                                                onChange={(date) => handleSelectChange("ngayTao", date)}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        label={<span>{"Ngày tạo "}</span>}
                                                        id="mui-pickers-date"
                                                        sx={{ mb: 2, width: "100%" }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider> */}


                                            <div className="pos-relative">
                                                <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày tạo</p></div>
                                                <DatePicker oneTap
                                                    format="dd-MM-yyyy"
                                                    defaultValue={vanBan.ngayTao == null ? null : new Date(vanBan.ngayTao?.substring(0, 10))}
                                                    calendarDefaultDate={new Date(vanBan.ngayTao == null ? null : vanBan.ngayTao?.substring(0, 10))}
                                                    onChange={(e) => { handleSelectChange("ngayTao", e?.toJSON()?.substring(0, 10)) }} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        type="text"
                                        name="ten"
                                        value={vanBan.ten || ""}
                                        onChange={handleChange}
                                        errorMessages={["", "Tên không hợp lệ", "Tên quá dài"]}
                                        label={<span>Tên văn bản <span className='red'>*</span></span>}
                                        validators={["required", "minStringLength: 3", "maxStringLength: 1000"]}
                                    />
                                    <TextField
                                        type="text"
                                        name="noiDung"
                                        value={vanBan.noiDung || ""}
                                        onChange={handleChange}
                                        label="Nội dung, mô tả "
                                        multiline
                                        rows={7}
                                    />
                                    <RadioGroup
                                        row
                                        name="trangThai"
                                        sx={{ mb: 2 }}
                                        value={vanBan.trangThai}
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

                                    <Uploader
                                        multiple
                                        listType="picture-text"
                                        defaultFileList={vanBan.listFileVanBan}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                                text/plain, application/pdf, .jpg, .jpeg, .png, .xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                        draggable
                                        onChange={handleImportFile}
                                        onRemove={handleRemoveFile}
                                        renderFileInfo={(file, fileElement) => {
                                            return (
                                                <>
                                                    <a href={file.url}>Tên file: {file.name}</a>
                                                    <p>{"..."}</p>
                                                </>
                                            );
                                        }}
                                    >
                                        <Button className='btn-upload'>File đính kèm</Button>
                                    </Uploader>
                                    <Grid container className='div-container-xulyvanban' >
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                                            <Divider sx={{ mb: 1 }}><b>CÁC ĐẢNG VIÊN LIÊN QUAN</b></Divider>
                                            <Autocomplete
                                                multiple
                                                id="checkboxes-tags-demo"
                                                value={vanBan.listDangVien}
                                                options={listDV}
                                                disableCloseOnSelect
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                limitTags={5}
                                                getOptionLabel={(option) => option.hoTen}
                                                onChange={(event, newValue) => { handleSelectChange("listDangVien", newValue); }}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <Checkbox
                                                            icon={icon}/*  */
                                                            checkedIcon={checkedIcon}
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                        {option.hoTen}
                                                    </li>
                                                )}

                                                renderInput={(params) => (
                                                    <TextField {...params} label="Đảng viên liên quan" placeholder="..." />
                                                )}
                                            />
                                            <Divider sx={{ mb: 1 }}><b>CÁC CHI BỘ THỰC HIỆN</b></Divider>
                                            <CongViecModal congViecUp={congViecUp} setVanBan={setVanBan} vanBan={vanBan} open={openCongViecModal} setOpen={setOpenCongViecModal} />
                                            {/* <p className="pointer link" style={{ marginBottom: "5px" }} onClick={handleThemCongViec}>Thêm công việc ...</p> */}
                                            <FormCongViec congViecUp={congViecUp} setVanBan={setVanBan} vanBan={vanBan} />

                                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                                {
                                                    vanBan?.listCongViec?.map((congViec, index) =>

                                                        <div className="div-qtsh">
                                                            <Grid container>
                                                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                                                    <div className="gird-inline div-flex-start">
                                                                        <Paragraph ><b> ● {congViec.chiBo?.ten}</b></Paragraph>
                                                                    </div>

                                                                </Grid>
                                                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                                                    <div className="gird-inline div-flex-start">
                                                                        <Paragraph >{FormatDate.convertDDMMYYYY(congViec.thoiHan)}</Paragraph>
                                                                        &emsp;
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                            <div className="gird-inline div-flex-start">
                                                                <Paragraph >- Tên công việc:&ensp;</Paragraph>
                                                                <Paragraph >{congViec.ten}</Paragraph>
                                                            </div>
                                                            <div className="gird-inline div-flex-start">
                                                                <Paragraph >- Nội dung:&ensp;</Paragraph>
                                                                <p dangerouslySetInnerHTML={{ __html: congViec.noiDung?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
                                                            </div>

                                                            <div className="div-action">
                                                                <Stack spacing={6}>
                                                                    <Button title="Xóa" size="xs" color="red" appearance="primary" className='div-flex' onClick={() => handleXoaCongViec(congViec)}>
                                                                        <Icon className="icon icon-edit-xs">clear</Icon>
                                                                    </Button>
                                                                </Stack>
                                                            </div>
                                                        </div>



                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Grid>


                        </ValidatorForm>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    {vanBanUp.id > 0 ? <Button onClick={handleCapNhat} appearance="primary">
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
