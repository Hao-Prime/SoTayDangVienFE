import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';
import { Grid, styled, } from "@mui/material";
import { Paragraph } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import dangVienUtil from 'app/utils/modules/DangVien';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';

import PhanLoai from 'app/common/PhanLoai';

export default function ChiTietDangVienModal({ dangVienID, open, setOpen, }) {

    const [dangVien, setDangVien] = useState(dangVienUtil.getDangVienThem());
    const [error, setError] = useState("");
    var isMounted = true;
    useEffect(() => {
        if (open) {
            isMounted = true;
            reloadData();
            return () => { isMounted = false; };
        }
    }, [open]);
    function reloadData() {

        Services.getDangVienService().getChiTietDangVien(dangVienID).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setDangVien(response.data)
                    }
                }
            }
        );

    }
    const handleClose = () => { setOpen(false); setError(""); setDangVien(dangVienUtil.getDangVienThem()) };
    return (
        <>
            <Modal size="lg" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CHI TIẾT ĐẢNG VIÊN</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Grid container spacing={12} >
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                            <Grid container spacing={0} sx={{ mb: 1 }}>
                                <Grid item lg={5} md={5} sm={12} xs={12} >
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Họ và tên:</Paragraph>
                                        <Paragraph className='td-hoTen'>{dangVien.hoTen}</Paragraph>
                                    </div>

                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Số CMND/ CCCD:</Paragraph>
                                        <Paragraph>{dangVien.soCMND}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Số điện thoại:</Paragraph>
                                        <Paragraph>{dangVien.soDienThoai}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Email:</Paragraph>
                                        <Paragraph>{dangVien.email}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Giới tính:</Paragraph>
                                        <Paragraph>{dangVien.gioiTinh ? "Nam" : "Nữ"}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Ngày sinh:</Paragraph>
                                        <Paragraph>{FormatDate.convertDDMMYYYY(dangVien.ngaySinh)}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Quê quán:</Paragraph>
                                        <Paragraph>{dangVien.queQuan}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Trình độ chuyên môn:</Paragraph>
                                        <Paragraph>{dangVien.trinhDoChuyenMon?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Chức vụ chuyên môn:</Paragraph>
                                        <Paragraph>{dangVien.chucVuChuyenMon?.ten}</Paragraph>
                                    </div>
                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} >
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Số thẻ Đảng:</Paragraph>
                                        <Paragraph className='td-soTheDang'>{dangVien.soTheDang}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Ngày vào Đảng:</Paragraph>
                                        <Paragraph >{FormatDate.convertDDMMYYYY(dangVien.ngayVaoDang)}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Nơi công tác:</Paragraph>
                                        <Paragraph >{dangVien.noiCongTac}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Trình độ chính trị:</Paragraph>
                                        <Paragraph >{dangVien?.trinhDoChinhTri?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Chức vụ:</Paragraph>
                                        <Paragraph >{dangVien?.chucVuDang?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Chi bộ:</Paragraph>
                                        <Paragraph >{dangVien?.chiBo?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Trạng thái:</Paragraph>
                                        <Paragraph >{PhanLoai.getTrangThaiDV(dangVien?.trangThaiDangVien)}</Paragraph>
                                    </div>
                                </Grid>

                            </Grid>

                        </Grid>


                    </Grid>




                </Modal.Body >
                <Modal.Footer>
                    <span className='text-eror'><i>{error}</i></span>

                    <Button onClick={handleClose} appearance="default">
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
