import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';
import { Grid, styled, } from "@mui/material";
import { Paragraph } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import qCUTUtil from 'app/utils/modules/QCUT';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';

export default function ChiTietQCUTModal({ qCUTID, open, setOpen, }) {

    const [qCUT, setQCUT] = useState(qCUTUtil.getQCUTThem());
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

        Services.getQCUTService().getChiTietQCUT(qCUTID).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setQCUT(response.data)
                    }
                }
            }
        );

    }
    const handleClose = () => { setOpen(false); setError(""); setQCUT(qCUTUtil.getQCUTThem()) };
    return (
        <>
            <Modal size="md" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CHI TIẾT QUẦN CHÚNG ƯU TÚ</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Grid container spacing={12} >
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                            <Grid container spacing={0} sx={{ mb: 1 }}>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Họ và tên:</Paragraph>
                                        <Paragraph className='td-hoTen'>{qCUT.hoTen}</Paragraph>
                                    </div>

                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Số CMND/ CCCD:</Paragraph>
                                        <Paragraph>{qCUT.soCMND}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Số điện thoại:</Paragraph>
                                        <Paragraph>{qCUT.soDienThoai}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Email:</Paragraph>
                                        <Paragraph>{qCUT.email}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Giới tính:</Paragraph>
                                        <Paragraph>{qCUT.gioiTinh ? "Nam" : "Nữ"}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Ngày sinh:</Paragraph>
                                        <Paragraph>{FormatDate.convertDDMMYYYY(qCUT.ngaySinh)}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Quê quán:</Paragraph>
                                        <Paragraph>{qCUT.queQuan}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Trình độ chuyên môn:</Paragraph>
                                        <Paragraph>{qCUT.trinhDoChuyenMon?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Chức vụ chuyên môn:</Paragraph>
                                        <Paragraph>{qCUT.chucVuChuyenMon?.ten}</Paragraph>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >

                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Ngày đưa vào:</Paragraph>
                                        <Paragraph >{FormatDate.convertDDMMYYYY(qCUT.ngayDuaVao)}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Đảng viên giúp đỡ:</Paragraph>
                                        <Paragraph >{qCUT.dangVienGiupDo?.hoTen}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Chi bộ:</Paragraph>
                                        <Paragraph >{qCUT?.chiBo?.ten}</Paragraph>
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
