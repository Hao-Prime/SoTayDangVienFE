import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';
import { Grid, styled, } from "@mui/material";
import { Paragraph } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import congViecUtil from 'app/utils/modules/CongViec';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';

export default function ChiTietCongViecModal({ congViecID, open, setOpen, }) {

    const [congViec, setCongViec] = useState(congViecUtil.getCongViecThem());
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

        Services.getCongViecService().getChiTietCongViec(congViecID).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setCongViec(response.data)
                    }
                }
            }
        );

    }
    const handleClose = () => { setOpen(false); setError(""); setCongViec(congViecUtil.getCongViecThem()) };
    return (
        <>
            <Modal size="md" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CHI TIẾT CÔNG VIỆC</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Grid container spacing={12} >
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                            <Grid container spacing={0} sx={{ mb: 1 }}>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Chi bộ:</Paragraph>
                                        <Paragraph className='td-hoTen'>{congViec.chiBo?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Tên công việc:</Paragraph>
                                        <Paragraph ><b>{congViec.ten}</b></Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>Nội dung:</Paragraph>
                                        <p style={{ width: "550px" }}> <span dangerouslySetInnerHTML={{ __html: congViec?.noiDung?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} /></p>
                                    </div>

                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Văn bản:</Paragraph>
                                        <a className='link-download' href={"/quanly/vanban/tatca?id=" + congViec?.vanBan?.id} target="_blank">{congViec.vanBan?.ten}</a>
                                    </div>
                                    <Grid container spacing={1}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Trạng thái:</Paragraph>
                                                <Paragraph>{PhanLoai.getTrangThaiCV(congViec.trangThai)}</Paragraph>
                                            </div>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Xếp loại:</Paragraph>
                                                <Paragraph>{PhanLoai.getXepLoaiCongViec(congViec.phanLoaiDG)}</Paragraph>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Thời hạn:</Paragraph>
                                                <Paragraph>{FormatDate.convertDDMMYYYY(congViec.thoiHan)}</Paragraph>
                                            </div>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Ngày hoàn thành:</Paragraph>
                                                <Paragraph>{FormatDate.convertDDMMYYYY(congViec.ngayHoanThanh)}</Paragraph>
                                            </div>

                                        </Grid>
                                    </Grid>




                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>Nội dung đánh giá:</Paragraph>
                                        <p style={{ width: "550px" }}> <span dangerouslySetInnerHTML={{ __html: congViec?.noiDungDG?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} /></p>

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
