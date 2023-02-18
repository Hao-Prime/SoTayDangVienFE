import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, styled, Icon, Divider } from '@mui/material';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Grid } from "@mui/material";
import { Paragraph } from 'app/components/Typography';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import FormatDate from "app/common/FormatDate";
import Services from "app/services";
import PhanLoai from "app/common/PhanLoai";
import DanhGiaModal from "./DanhGiaModal";
import SapXep from "app/common/SapXep";
const Heading = styled(Typography)(({ theme }) => ({
    flexBasis: "100%",
    flexShrink: 0,
    fontWeight: "bold"
}));

const SecondaryHeading = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
}));

export default function ControlledExpansionPanels({ chiBo, reloadData }) {
    const [expanded, setExpanded] = useState(false);
    const [openDanhGiaModal, setOpenDanhGiaModal] = useState(false);
    const [namXepLoai, setNamXepLoai] = useState();
    const [xepLoaiUp, setXepLoaiUp] = useState();
    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const handleXoaDanhGia = (data) => {
        if (window.confirm("Bạn có chắc muốn xóa đánh giá này")) {
            Services.getDanhGiaCBService().xoa(data.id).then(
                (response) => {
                    if (response.data?.tenLoi != undefined) {
                        alert(response.data?.noiDung)
                    } else {
                        reloadData()
                    }

                }
            )
        }

    };
    const handleCapNhatDanhGia = (data) => {
        setNamXepLoai(data.nam)
        setXepLoaiUp(data)
        setOpenDanhGiaModal(true)

    };

    return (
        <Box width="100%">

            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Heading>Xếp loại hằng năm:</Heading>
                    {/* <SecondaryHeading>You are currently not an owner</SecondaryHeading> */}
                </AccordionSummary>

                <AccordionDetails>
                    <DanhGiaModal listChiBo={[chiBo]} namXepLoai={namXepLoai} xepLoaiUp={xepLoaiUp} open={openDanhGiaModal} setOpen={setOpenDanhGiaModal} reloadList={reloadData} />
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        {
                            SapXep.sapXepTheoObjectAtr(chiBo?.listDGXL, "nam", -1)?.map((danhGia, index) =>

                                <div key={danhGia.id} className="div-qtsh">

                                    <Grid container>
                                        <Grid item lg={3} md={3} sm={3} xs={3} >
                                            <div className="gird-inline div-flex-start">
                                                <Paragraph className="nowrap"><b>- Năm:&ensp;</b></Paragraph>
                                                <Paragraph >{danhGia.nam}</Paragraph>
                                                &emsp;
                                            </div>
                                        </Grid>
                                        <Grid item lg={9} md={9} sm={9} xs={9} >
                                            <div className="gird-inline div-flex-start">
                                                <Paragraph className="nowrap"><b>{"- Xếp loại:"}</b></Paragraph>

                                                <Paragraph >&ensp;{PhanLoai.getPhanLoaiXepLoai(danhGia.phanLoai)}</Paragraph>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <div className="gird-inline div-flex-start">
                                        <Paragraph className="nowrap"><b>- Nội dung:&ensp;</b></Paragraph>
                                        <p dangerouslySetInnerHTML={{ __html: danhGia.moTa?.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
                                    </div>
                                    <div className="div-action">
                                        <Stack spacing={6}>
                                            <Button title="Cập nhật" size="xs" color="green" appearance="primary" className='div-flex' sx={{ me: 1 }} onClick={() => handleCapNhatDanhGia(danhGia)}>
                                                <Icon className="icon icon-edit-xs">edit</Icon>
                                            </Button>
                                            <Button title="Xóa" size="xs" color="red" appearance="primary" className='div-flex' onClick={() => handleXoaDanhGia(danhGia)}>
                                                <Icon className="icon icon-edit-xs">clear</Icon>
                                            </Button>
                                        </Stack>
                                    </div>
                                </div>

                            )
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
