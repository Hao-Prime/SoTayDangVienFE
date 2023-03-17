import React, { useEffect, useState } from 'react';
import { Button, Modal, DatePicker, Divider } from 'rsuite';
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

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function DangVienModal({ dangVienUp, open, setOpen, reloadList }) {
    // const [open, setOpen] = useState(false);

    const [listTDCM, setListTDCM] = useState([]);
    const [listCVCM, setListCVCM] = useState([]);
    const [listTDCT, setListTDCT] = useState([]);
    const [listCVD, setListCVD] = useState([]);
    const [listCB, setListCB] = useState([]);
    const [dangVien, setDangVien] = useState(dangVienUtil.getDangVienThem());
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
        setLoading(true)
        if (dangVienUp.id > 0) {
            Services.getDangVienService().getChiTietDangVien(dangVienUp.id).then(
                (response) => {
                    if (isMounted) {
                        if (response.data != null) {
                            setDangVien(response.data)
                            setLoading(false)
                        }
                    }
                }
            );
        } else {
            setDangVien(dangVienUp);
            setLoading(false)
        }

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
        Services.getTrinhDoChinhTriService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListTDCT(response.data)
                    }
                }
            }
        );
        Services.getChucVuDangService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListCVD(SapXep.sapXepTheoObjectAtr(response.data, "thuTu", 1))
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
    // const [state, setState] = useState({ date: new Date() });

    // useEffect(() => {
    //     ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    //         if (value !== state.password) return false;

    //         return true;
    //     });
    //     return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    // }, [state.password]);

    const handleThem = () => {
        let err = dangVienUtil.kiemTaDangVien(dangVien)
        if (err == "") {
            Services.getDangVienService().them(dangVien).then(
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
        let err = dangVienUtil.kiemTaDangVien(dangVien)
        if (err == "") {
            Services.getDangVienService().capNhat(dangVien).then(
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
        setDangVien({ ...dangVien, [event.target.name]: event.target.value });
    };
    function handleSelectChange(atr, value) {
        setDangVien({ ...dangVien, [atr]: value })
    };
    const handleClose = () => { setOpen(false); setError(""); setDangVien(dangVienUtil.getDangVienThem()) };
    // const {
    //     username,
    //     firstName,
    //     creditCard,
    //     mobile,
    //     password,
    //     confirmPassword,
    //     gender,
    //     date,
    //     email,
    // } = state;
    return (
        <>
            <Modal size="md" backdrop="static" overflow={false} keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>ĐẢNG VIÊN</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {!loading &&
                        <ValidatorForm onSubmit={handleThem} onError={() => console.log("onError")}>
                            <Grid container spacing={1} className="div-form">
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }} >
                                    <Grid container spacing={2} className="form-cus font13">
                                        <Grid item lg={6} md={6} sm={6} xs={12} >
                                            <h3 className='m-0 mb-2'>Thông tin cá nhân</h3>
                                            <TextField

                                                type="text"
                                                name="hoTen"
                                                value={dangVien.hoTen || ""}
                                                onChange={handleChange}
                                                errorMessages={["", "Tên không hợp lệ", "Tên quá dài"]}
                                                label={<span>Họ tên Đảng viên <span className='red'>*</span></span>}
                                                validators={["required", "minStringLength: 4", "maxStringLength: 30"]}
                                            />
                                            <TextField
                                                type="text"

                                                name="soCMND"
                                                value={dangVien.soCMND || ""}
                                                onChange={handleChange}
                                                errorMessages={["Số CMND không hơp lệ"]}
                                                label={<span>Số CMND/CCCD <span className='red'>*</span></span>}
                                                validators={["required", "minStringLength: 9", "maxStringLength: 12"]}
                                            />
                                            <TextField
                                                type="text"
                                                name="soDienThoai"
                                                value={dangVien.soDienThoai || ""}
                                                onChange={handleChange}
                                                errorMessages={["", "Số điện thoại không hơp lệ", "Số điện thoại không hơp lệ"]}
                                                label={<span>{"Số điện thoại "}<span className='red'>*</span></span>}
                                                validators={["required", "minStringLength: 10", "maxStringLength: 10"]}
                                            />
                                            <TextField
                                                type="text"
                                                name="email"
                                                value={dangVien.email || ""}
                                                onChange={handleChange}
                                                errorMessages={["Cần nhập Email"]}
                                                label={<span>{"Email "}<span className='red'>*</span></span>}
                                                validators={["required"]}
                                            />

                                            <div className='modal-font13'>

                                                <RadioGroup
                                                    row
                                                    name="gioiTinh"
                                                    sx={{ mb: 2 }}
                                                    value={dangVien.gioiTinh}
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


                                                </RadioGroup></div>
                                            <div className="pos-relative">
                                                <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày sinh <span className='red'>*</span></p></div>
                                                <DatePicker oneTap
                                                    format="dd-MM-yyyy"
                                                    className='input-formx'
                                                    defaultValue={dangVien.ngaySinh == null ? null : new Date(dangVien.ngaySinh?.substring(0, 10))}
                                                    calendarDefaultDate={dangVien.ngaySinh == null ? null : new Date(dangVien.ngaySinh?.substring(0, 10))}
                                                    onChange={(e) => { handleSelectChange("ngaySinh", e?.toJSON()?.substring(0, 10)) }} />

                                            </div>
                                            <TextField
                                                type="text"
                                                name="queQuan"
                                                value={dangVien.queQuan || ""}
                                                onChange={handleChange}
                                                // errorMessages={["Số điện thoại không hơp lệ"]}
                                                label="Quê quán"

                                            // validators={["required", "minStringLength: 9", "maxStringLength: 12"]}
                                            />
                                            <TextField
                                                type="text"
                                                name="queQuan"
                                                value={dangVien.queQuan || ""}
                                                onChange={handleChange}
                                                // errorMessages={["Số điện thoại không hơp lệ"]}
                                                label="Nơi cư tru"

                                            // validators={["required", "minStringLength: 9", "maxStringLength: 12"]}
                                            />
                                            <Autocomplete
                                                value={dangVien.trinhDoChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("trinhDoChuyenMon", newValue); }}
                                                options={listTDCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Trình độ giáo dục phổ thông "}<span className='red'>*</span></span>}

                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.trinhDoChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("trinhDoChuyenMon", newValue); }}
                                                options={listTDCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Trình độ chuyên môn nghiệp vụ"}<span className='red'>*</span></span>}

                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.trinhDoChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("trinhDoChuyenMon", newValue); }}
                                                options={listTDCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Chức danh khoa học"}</span>}

                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.trinhDoChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("trinhDoChuyenMon", newValue); }}
                                                options={listTDCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Nghề nghiệp "}<span className='red'>*</span></span>}

                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.chucVuChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("chucVuChuyenMon", newValue); }}
                                                options={listCVCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Chức vụ chuyên môn "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.chucVuChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("chucVuChuyenMon", newValue); }}
                                                options={listCVCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Dân tộc "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.chucVuChuyenMon}
                                                onChange={(event, newValue) => { handleSelectChange("chucVuChuyenMon", newValue); }}
                                                options={listCVCM}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Tôn giáo "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                        </Grid>





                                        <Grid item lg={6} md={6} sm={6} xs={12} >
                                            <h3 className='m-0 mb-2'>Hồ sơ Đảng viên</h3>
                                            <div className="pos-relative ">
                                                <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày vào Đảng  <span className='red'>*</span></p></div>
                                                <DatePicker oneTap
                                                    className='modal-font13'
                                                    format="dd-MM-yyyy"
                                                    defaultValue={dangVien.ngayVaoDang == null ? null : new Date(dangVien.ngayVaoDang?.substring(0, 10))}
                                                    calendarDefaultDate={dangVien.ngayVaoDang == null ? null : new Date(dangVien.ngayVaoDang?.substring(0, 10))}
                                                    onChange={(e) => { handleSelectChange("ngayVaoDang", e?.toJSON()?.substring(0, 10)) }} />

                                            </div>
                                            <div className="pos-relative ">
                                                <div className="input-lable" style={{ top: "-8px" }}><p className="text-lable">Ngày vào chính thức  <span className='red'>*</span></p></div>
                                                <DatePicker oneTap
                                                    className='modal-font13'
                                                    format="dd-MM-yyyy"
                                                    defaultValue={dangVien.ngayVaoDang == null ? null : new Date(dangVien.ngayVaoDang?.substring(0, 10))}
                                                    calendarDefaultDate={dangVien.ngayVaoDang == null ? null : new Date(dangVien.ngayVaoDang?.substring(0, 10))}
                                                    onChange={(e) => { handleSelectChange("ngayVaoDang", e?.toJSON()?.substring(0, 10)) }} />

                                            </div>
                                            <TextField
                                                type="text"
                                                name="soTheDang"
                                                value={dangVien.soTheDang || ""}
                                                onChange={handleChange}
                                                errorMessages={["Số thẻ Đàng không hơp lệ"]}
                                                label={<span>{"Số thẻ Đảng "}<span className='red'>*</span></span>}
                                                validators={["required"]}
                                            />
                                            <TextField
                                                type="text"
                                                name="soTheDang"
                                                value={dangVien.soTheDang || ""}
                                                onChange={handleChange}
                                                errorMessages={["Số thẻ Đàng không hơp lệ"]}
                                                label={<span>{"Số lý lịch "}<span className='red'>*</span></span>}
                                                validators={["required"]}
                                            />
                                            <TextField
                                                type="text"
                                                name="noiCongTac"
                                                value={dangVien.noiCongTac || ""}
                                                onChange={handleChange}
                                                label="Nơi công tác"
                                            />
                                            <Autocomplete
                                                value={dangVien.trinhDoChinhTri}
                                                onChange={(event, newValue) => { handleSelectChange("trinhDoChinhTri", newValue); }}
                                                options={listTDCT}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Trình độ lý luận chính trị "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.chucVuDang}
                                                onChange={(event, newValue) => { handleSelectChange("chucVuDang", newValue); }}
                                                options={listCVD}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Chức vụ "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.chiBo}
                                                onChange={(event, newValue) => { handleSelectChange("chiBo", newValue); }}
                                                options={listCB}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Chi bộ "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Autocomplete
                                                value={dangVien.chiBo}
                                                onChange={(event, newValue) => { handleSelectChange("chiBo", newValue); }}
                                                options={listCB}
                                                getOptionLabel={(option) => option.ten}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        label={<span>{"Trạng thái kết nạp "}<span className='red'>*</span></span>}
                                                        variant="outlined" fullWidth />
                                                )}
                                            />
                                            <Divider >Tài khoản</Divider>
                                            <TextField

                                                type="text"
                                                name="hoTen"
                                                value={dangVien.hoTen || ""}
                                                onChange={handleChange}
                                                errorMessages={["", "Tên không hợp lệ", "Tên quá dài"]}
                                                label={<span>Tên Đăng nhập <span className='red'>*</span></span>}
                                                validators={["required", "minStringLength: 4", "maxStringLength: 30"]}
                                            />
                                            <TextField
                                                type="text"

                                                name="soCMND"
                                                value={dangVien.soCMND || ""}
                                                onChange={handleChange}
                                                errorMessages={["Số CMND không hơp lệ"]}
                                                label={<span>Mật khẩu <span className='red'>*</span></span>}
                                                validators={["required", "minStringLength: 9", "maxStringLength: 12"]}
                                            />
                                            <div className='modal-font13'>
                                                <RadioGroup
                                                    row
                                                    name="trangThaiDangVien"
                                                    sx={{ mb: 2 }}
                                                    value={1}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel
                                                        value={1}
                                                        label="Hoạt động"
                                                        labelPlacement="end"
                                                        control={<Radio color="secondary" />}
                                                    />

                                                    <FormControlLabel
                                                        value={0}
                                                        label="Ngừng quản lý"
                                                        labelPlacement="end"
                                                        control={<Radio color="secondary" />}
                                                    />


                                                </RadioGroup>
                                            </div>
                                        </Grid>
                                    </Grid>


                                </Grid>


                            </Grid>


                        </ValidatorForm>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>
                    {!dangVien.id > 0 ?
                        <Button onClick={handleThem} appearance="primary">
                            Lưu
                        </Button>
                        :
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
