import React, { useEffect, useState } from 'react';
import { Button, Modal, Uploader } from 'rsuite';
import { Grid, styled, Divider } from "@mui/material";
import { Paragraph } from 'app/components/Typography';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import vanBanUtil from 'app/utils/modules/VanBan';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
const Heading = styled(Typography)(({ theme }) => ({
    flexBasis: "35%",
    flexShrink: 0,
    fontWeight: "bold"
}));
const SecondaryHeading = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
}));
export default function ChiTietVanBanModal({ vanBanID, open, setOpen, }) {
    const [expanded, setExpanded] = useState(false);
    const [vanBan, setVanBan] = useState(vanBanUtil.getVanBanThem());
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    var isMounted = true;
    useEffect(() => {
        if (open) {
            isMounted = true;
            reloadData();
            return () => { isMounted = false; };
        }
    }, [open]);
    function reloadData() {
        setLoading(true)
        Services.getVanBanService().getChiTietVanBan(vanBanID).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response?.data?.listFileVanBan?.forEach(file => {
                            file.url = process.env.REACT_APP_URL_SERVER + file.url
                        });
                        setVanBan({ ...response.data, listDangVien: response.data?.listVBDV?.map(item => item.dangVien.hoTen) })
                        setLoading(false)
                    }
                }
            }
        );

    }
    const handleClose = () => { setOpen(false); setError(""); setVanBan(vanBanUtil.getVanBanThem()) };
    const handleChangePanel = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Modal size="lg" backdrop="static" keyboard={false} open={open} onClose={handleClose} className="cus-modal">
                <Modal.Header>
                    <Modal.Title><b>CHI TIẾT VĂN BẢN</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Grid container spacing={12} >
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                            <Grid container spacing={0} sx={{ mb: 1 }}>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Grid container spacing={1}>
                                        <Grid item lg={4} md={4} sm={12} xs={12}>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Số EOFFICE:</Paragraph>
                                                <Paragraph>{vanBan.soEOFFICE}</Paragraph>
                                            </div>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Phân loại:</Paragraph>
                                                <Paragraph>{PhanLoai.getPhanLoaiVanBan(vanBan.phanLoai)}</Paragraph>
                                            </div>
                                        </Grid>
                                        <Grid item lg={8} md={8} sm={12} xs={12}>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Số ký hiệu:</Paragraph>
                                                <Paragraph>{vanBan.soKyHieu}</Paragraph>
                                            </div>
                                            <div className="gird-inline div-flex">
                                                <Paragraph className='td-right'>Ngày tạo:</Paragraph>
                                                <Paragraph>{FormatDate.convertDDMMYYYY(vanBan.ngayTao)}</Paragraph>
                                            </div>

                                        </Grid>
                                    </Grid>


                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>Tên văn bản:</Paragraph>
                                        <Paragraph >{vanBan.ten}</Paragraph>
                                    </div>

                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>Nội dung:</Paragraph>
                                        <p style={{ width: "700px" }}> <span dangerouslySetInnerHTML={{ __html: vanBan?.noiDung?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} /></p>

                                    </div>
                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>Trạng thái:</Paragraph>
                                        <Paragraph>{PhanLoai.getTrangThaiCV(vanBan.trangThai)}</Paragraph>

                                    </div>
                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className='td-right'>File đính kèm:</Paragraph>
                                        {!loading &&
                                            <Uploader
                                                plaintext
                                                defaultFileList={vanBan.listFileVanBan}

                                                action="//jsonplaceholder.typicode.com/posts/"
                                                renderFileInfo={(file, fileElement) => {
                                                    return (
                                                        <>
                                                            <a className='link-download' href={file.url}>{file.name}</a>

                                                        </>
                                                    );
                                                }}
                                            />}
                                    </div>

                                    <Divider sx={{ mb: 1 }}>Các xử lý liên quan</Divider>
                                    <div className="gird-inline div-flex" style={{ paddingBottom: "10px" }}>
                                        <Paragraph className='td-right'>● Đảng viên liên quan:</Paragraph>
                                        <Paragraph>{vanBan?.listDangVien?.toString()?.replaceAll(",", ", ")}</Paragraph>
                                    </div>

                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        {
                                            vanBan?.listCongViec?.map((congViec, index) =>
                                                <Accordion key={index} expanded={expanded == congViec.chiBo?.id} onChange={handleChangePanel(congViec.chiBo?.id)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel3bh-content"
                                                        id="panel3bh-header"
                                                    >
                                                        <Heading>{(index + 1) + ". " + congViec.chiBo?.ten}</Heading>
                                                        <SecondaryHeading>
                                                            {PhanLoai.getXepLoaiCongViec(congViec.phanLoaiDG)}

                                                        </SecondaryHeading>
                                                    </AccordionSummary>

                                                    <AccordionDetails>
                                                        <div className="div-qtsh">


                                                            <div className="gird-inline div-flex-start">
                                                                <Paragraph className="text-right-cv"><b>- Tên công việc:&ensp;</b></Paragraph>
                                                                <Paragraph >{congViec.ten}</Paragraph>
                                                            </div>
                                                            <div className="gird-inline div-flex-start">
                                                                <Paragraph className="text-right-cv"><b>- Nội dung:&ensp;</b></Paragraph>
                                                                <p style={{ width: "650px" }} dangerouslySetInnerHTML={{ __html: congViec.noiDung?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
                                                            </div>
                                                            <Grid container>
                                                                <Grid item lg={5} md={5} sm={12} xs={12} >
                                                                    <div className="gird-inline div-flex-start">
                                                                        <Paragraph className="text-right-cv"><b>{"- Trang thái:"}</b></Paragraph>
                                                                        <Paragraph >&ensp;{PhanLoai.getTrangThaiCV(congViec.trangThai)}</Paragraph>
                                                                    </div>
                                                                    <div className="gird-inline div-flex-start">
                                                                        <Paragraph className="text-right-cv"><b>{"- Xếp loại:"}</b></Paragraph>
                                                                        <Paragraph >&ensp;{PhanLoai.getXepLoaiCongViec(congViec.phanLoaiDG)}</Paragraph>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item lg={7} md={7} sm={12} xs={12} >
                                                                    <div className="gird-inline div-flex-start">
                                                                        <Paragraph className="text-right-cv"><b>- Thời hạn:&ensp;</b></Paragraph>
                                                                        <Paragraph >{FormatDate.convertDDMMYYYY(congViec.thoiHan)}</Paragraph>
                                                                        &emsp;
                                                                    </div>
                                                                    <div className="gird-inline div-flex-start">
                                                                        <Paragraph className="text-right-cv"><b>- Ngày hoàn thành:&ensp;</b></Paragraph>
                                                                        <Paragraph >{FormatDate.convertDDMMYYYY(congViec?.ngayHoanThanh)}</Paragraph>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                            <div className="gird-inline div-flex-start">
                                                                <Paragraph className="text-right-cv"><b>- Nội dung đánh giá:&ensp;</b></Paragraph>
                                                                <p style={{ width: "650px" }} dangerouslySetInnerHTML={{ __html: congViec.noiDungDG?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
                                                            </div>

                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>


                                            )
                                        }
                                    </Grid>

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
