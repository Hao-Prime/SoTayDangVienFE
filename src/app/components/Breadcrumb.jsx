import { Breadcrumbs, Hidden, Icon, styled, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';
import { CheckCell, Table, CustomCell, CustomHeaderCell2, CustomHeaderCellCheck, Column } from './TableRsuite/TableCustomRsuite';
const BreadcrumbRoot = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: "0px 0px 10px 10px"
}));

const BreadcrumbName = styled('h4')(() => ({
    margin: 0,
    fontSize: '16px',
    paddingBottom: '1px',
    verticalAlign: 'middle',
    textTransform: 'capitalize',
}));

const SubName = styled('span')(({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));

const Separator = styled('h4')(({ theme }) => ({
    margin: 0,
    marginLeft: 8,
    paddingBottom: '3px',
    color: theme.palette.text.hint,
}));

const StyledIcon = styled(Icon)(() => ({
    marginLeft: 8,
    marginBottom: '4px',
    verticalAlign: 'middle',
}));

const Breadcrumb = ({ routeSegments }) => {
    const theme = useTheme();
    const hint = theme.palette.text.hint;
    const [openDangBoModal, setOpenDangBoModal] = useState(false);
    const handleClose = () => { setOpenDangBoModal(false); };
    const [listData, setListData] = useState([
        { type: 1, value0: "Chi bộ I", value1: "Chi bộ", value2: "Doanh nghiệp nhà nước", value3: "36 Võ Công Tồn P1 Tp Tân An tỉnh Long An" },
        { type: 1, value0: "Chi bộ II", value1: "Chi bộ", value2: "Doanh nghiệp nhà nước", value3: "36 Võ Công Tồn P1 Tp Tân An tỉnh Long An" },
        { type: 1, value0: "Chi bộ III", value1: "Chi bộ", value2: "Doanh nghiệp nhà nước", value3: "36 Võ Công Tồn P1 Tp Tân An tỉnh Long An" },
        { type: 1, value0: "Chi bộ Khối văn phòng", value1: "Chi bộ", value2: "Doanh nghiệp nhà nước", value3: "36 Võ Công Tồn P1 Tp Tân An tỉnh Long An" },
        { type: 1, value0: "Chi bộ Tân An", value1: "Chi bộ", value2: "Doanh nghiệp nhà nước", value3: "36 Võ Công Tồn P1 Tp Tân An tỉnh Long An" },
        { type: 1, value0: "Chi bộ Châu Thành- Tân Trụ", value1: "Chi bộ", value2: "Doanh nghiệp nhà nước", value3: "36 Võ Công Tồn P1 Tp Tân An tỉnh Long An" }
    ])
    return (
        <BreadcrumbRoot>
            {routeSegments ? (
                <Hidden xsDown>
                    <BreadcrumbName>{routeSegments[routeSegments.length - 1]['name']}</BreadcrumbName>
                    <Separator>|</Separator>
                </Hidden>
            ) : null}

            <Breadcrumbs
                separator={<Icon sx={{ color: hint }}>navigate_next</Icon>}
                sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
            >
                <NavLink to="/#">
                    <StyledIcon color="primary">home</StyledIcon>
                </NavLink>

                {routeSegments
                    ? routeSegments.map((route, index) => {
                        return index !== routeSegments.length - 1 ? (
                            <NavLink key={index} to={route.path}>
                                <SubName>{route.name}</SubName>
                            </NavLink>
                        ) : (
                            <SubName key={index} onClick={() => setOpenDangBoModal(true)}>
                                <span className='black-05 pointer'>
                                    {"Đảng bộ tỉnh Long An / Đảng ủy Khối cơ quan và doanh nghiệp tỉnh Long An / "}
                                </span>
                                <span className='black bold pointer'>
                                    {"Đảng bộ Viễn Thông Long An"}
                                </span>
                            </SubName>
                        );
                    })
                    : null}
            </Breadcrumbs>
            {openDangBoModal &&
                <Modal size="md" keyboard={false} open={openDangBoModal} onClose={(e) => handleClose()} className="cus-modal f-siz12">
                    <Modal.Header>
                        <Modal.Title><b>CHỌN ĐẢNG BỘ/CHI BỘ</b></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <StyledIcon color="primary">home</StyledIcon>
                        <span className='black-05 pointer'>
                            {" Đảng bộ tỉnh Long An / Đảng ủy Khối cơ quan và doanh nghiệp tỉnh Long An / "}
                        </span>
                        <span className='black bold pointer'>
                            {"Đảng bộ Viễn Thông Long An"}
                        </span>
                        <Table virtualized height={350} wordWrap="break-word" data={listData} id="table-hd" className='table table-pointer' loading={false} bordered={true} cellBordered={true} rowHeight={35} headerHeight={60} shouldUpdateScroll={false}>

                            <Column width={50} align="center" >
                                <CustomHeaderCell2>STT</CustomHeaderCell2>
                                <CustomCell>{(rowData, rowIndex) => ((rowIndex + 1))}</CustomCell>
                            </Column>
                            <Column width={250}>
                                <CustomHeaderCell2 align="center">Tên cơ sở Đảng</CustomHeaderCell2>
                                <CustomCell dataKey="value0" />
                            </Column>
                            <Column width={130} resizable >
                                <CustomHeaderCell2 align="center">Loại cơ sở Đảng</CustomHeaderCell2>
                                <CustomCell dataKey="value1" align="center" />
                            </Column>
                            <Column width={130} resizable >
                                <CustomHeaderCell2 align="center">Loại hình cơ sở Đảng</CustomHeaderCell2>
                                <CustomCell dataKey="value2" align="center" />
                            </Column>
                            <Column width={250} >
                                <CustomHeaderCell2 align="center">Địa chỉ</CustomHeaderCell2>
                                <CustomCell dataKey="value3" />
                            </Column>
                        </Table>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={(e) => handleClose()} appearance="primary">
                            OK
                        </Button>
                        <Button onClick={(e) => handleClose()} appearance="default">
                            Thoát
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </BreadcrumbRoot >
    );
};

export default Breadcrumb;
