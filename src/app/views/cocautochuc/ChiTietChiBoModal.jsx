import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';
import { Grid, styled, } from "@mui/material";
import { Paragraph } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import chiBoUtil from 'app/utils/modules/ChiBo';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';


export default function ChiTietChiBoModal({ chiBoID, open, setOpen, }) {

    const [chiBo, setChiBo] = useState(chiBoUtil.getChiBoThem());
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

        Services.getChiBoService().getChiTietChiBo(chiBoID).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setChiBo(response.data)
                    }
                }
            }
        );

    }
    const handleClose = () => { setOpen(false); setError(""); setChiBo(chiBoUtil.getChiBoThem()) };
    return (
        <>
            <Modal size="lg" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CHI TIẾT CHI BỘ</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Grid container spacing={12} >
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                            <Grid container spacing={0} sx={{ mb: 1 }}>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Tên chi bộ:</Paragraph>
                                        <Paragraph className='td-hoTen'>{chiBo.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Ngày thành lập:</Paragraph>
                                        <Paragraph>{FormatDate.convertDDMMYYYY(chiBo.ngayThanhLap)}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex">
                                        <Paragraph className='td-right'>Đảng bộ:</Paragraph>
                                        <Paragraph>{chiBo.dangBo?.ten}</Paragraph>
                                    </div>
                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>Mô tả:</Paragraph>
                                        <p style={{ width: "700px" }}> <span dangerouslySetInnerHTML={{ __html: chiBo?.moTa?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} /></p>


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
