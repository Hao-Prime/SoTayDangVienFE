import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';

import {
    Grid,
    styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Services from 'app/services';


const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",

}));

export default function DoiMatKhauModal({ open, setOpen }) {

    const [taiKhoan, setTaiKhoan] = useState({
        oldPassword: null,
        newPassword: null,
        newPassword1: null
    });
    const [error, setError] = useState("");
    var isMounted = true;
    const handleDoiMatKhau = () => {
        if (taiKhoan.newPassword !== taiKhoan.newPassword1) {
            setError("Nhập lại mật khẩu không đúng")
        }
        else if (taiKhoan.newPassword.length < 8) {
            setError("Mật khẩu có ít nhất 8 ký tự")
        }
        else {
            Services.getTaiKhoanService().doiMatKhau(taiKhoan).then(
                (response) => {
                    if (response.data?.tenLoi != undefined) {
                        setError(response.data?.noiDung)
                    } else {
                        handleClose();
                        window.location.href = "/"
                    }

                }
            );
        }
    };

    const handleChange = (event) => {
        event.persist(); setError("");
        setTaiKhoan({ ...taiKhoan, [event.target.name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false); setError(""); setTaiKhoan({
            oldPassword: null,
            newPassword: null,
            newPassword1: null
        })
    };

    return (
        <>
            <Modal size="xs" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>{"ĐỔI MẬT KHẨU"}</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ValidatorForm onSubmit={handleDoiMatKhau} onError={() => console.log("onError")}>
                        <Grid container spacing={6} >
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>

                                <TextField
                                    type="password"

                                    variant="outlined"
                                    name="oldPassword"
                                    value={taiKhoan.oldPassword || ""}
                                    onChange={handleChange}
                                    label={<span>Mật khẩu cũ <span className='red'>*</span></span>}
                                />
                                <TextField
                                    type="password"

                                    variant="outlined"
                                    name="newPassword"
                                    value={taiKhoan.newPassword || ""}
                                    onChange={handleChange}
                                    label={<span>Mật khẩu mới <span className='red'>*</span></span>}

                                />
                                <TextField
                                    type="password"

                                    variant="outlined"
                                    name="newPassword1"
                                    value={taiKhoan.newPassword1 || ""}
                                    onChange={handleChange}
                                    label={<span>Nhập lại mật khẩu mới <span className='red'>*</span></span>}
                                />
                            </Grid>


                        </Grid>


                    </ValidatorForm>

                </Modal.Body>
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>

                    <Button onClick={handleDoiMatKhau} appearance="primary">
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
