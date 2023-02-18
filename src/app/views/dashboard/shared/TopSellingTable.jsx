import {
    Box,
    Card,
    MenuItem,
    Select,
    styled,
    useTheme, Icon
} from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import { Paragraph } from 'app/components/Typography';
import { Table } from 'rsuite';
import Services from 'app/services';
import { useEffect, useState } from 'react';
const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}));


const { Column, HeaderCell, Cell } = Table;
const TopSellingTable = () => {
    const { palette } = useTheme();
    const bgError = palette.error.main;
    const bgPrimary = palette.primary.main;
    const bgSecondary = palette.secondary.main;
    const [listCongViec, setListCongViec] = useState([]);
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        Services.getCongViecService().getDangXuLy().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setListCongViec(response.data);
                    }
                }

            }
        );
        return () => { isMounted = false; };
    }, []);
    const ActionCell = ({ rowData, dataKey, ...props }) => {

        return (
            <Cell {...props} className="link-group">
                <Icon className="icon icon-search pointer" title="Xem chi tiết " onClick={() => { window.location.href = "/quanly/congviec/dangxuly?loai=1&id=" + rowData.id; }}>arrow_right_alt</Icon>
            </Cell>
        );
    };
    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3, pb: '20px' }}>
            <CardHeader>
                <Title>Nhắc nhỡ công việc</Title>
                <Select size="small" defaultValue="this_month">
                    <MenuItem value="this_month">Đang xử lý</MenuItem>
                    {/* <MenuItem value="last_month">Chờ đánh giá</MenuItem> */}
                </Select>
            </CardHeader>

            <Box overflow="hidden" sx={{ pl: 2 }} className="box-congviecdangxuly">
                {/* <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 2 }} colSpan={1}>

                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={7}>
                                Tên công việc
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={3}>
                                Chi bộ thực hiện
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Thời hạn
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCongViec.map((cv, index) => (
                            <TableRow key={index} hover>
                                <TableCell colSpan={1} align="left" sx={{ px: 2, wordBreak: "unset" }}>
                                    <Box display="flex" alignItems="center">
                                        <p className="text">{index + 1}</p>
                                    </Box>
                                </TableCell>
                                <TableCell colSpan={7} align="left" sx={{ px: 0, wordBreak: "unset" }}>
                                    <Box display="flex" alignItems="center">
                                        <p className="text">{cv.ten}</p>
                                    </Box>
                                </TableCell>

                                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: 'capitalize' }}>
                                    <p className="text">{cv?.chiBo?.ten}</p>
                                </TableCell>

                                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                                    <p className="text"> {FormatDate.convertDDMMYYYY(cv?.thoiHan)}</p>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>

                                    <Icon className="icon icon-search pointer" title="Xem chi tiết " onClick={() => { window.location.href = "/quanly/congviec/dangxuly?loai=1&id=" + cv.id; }}>arrow_right_alt</Icon>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>  */}
                {listCongViec.length == 0 ? <div className='center mt-1'>Không có công việc</div> :
                    <>
                        <Table virtualized height={380} data={listCongViec} className='table' bordered={true} cellBordered={true}>
                            <Column width={45} align="center">
                                <HeaderCell>STT</HeaderCell>
                                <Cell>{(rowData, rowIndex) => (rowIndex + 1)}</Cell>
                            </Column>
                            <Column width={170} flexGrow={1} fullText>
                                <HeaderCell>Chi bộ thực hiện</HeaderCell>
                                <Cell dataKey="chiBo.ten" />
                            </Column>

                            <Column width={380} flexGrow={2} fullText>
                                <HeaderCell>Tên công việc</HeaderCell>
                                <Cell dataKey="ten" />
                            </Column>


                            <Column width={100}>
                                <HeaderCell> Thời hạn</HeaderCell>
                                <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.thoiHan))}</Cell>
                            </Column>
                            <Column width={50} fixed="right">
                                <HeaderCell></HeaderCell>
                                <ActionCell></ActionCell>
                            </Column>
                        </Table>

                    </>}
            </Box>
        </Card>
    );
};

const productList = [
    {
        imgUrl: '/assets/images/products/headphone-2.jpg',
        name: 'Quản lý thu - chi tài chính, đảng phí, của Đảng bộ',
        price: "Chi bộ 1",
        available: 15,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Truyền đạt, thông báo kịp thời công văn',
        price: "KVP TTKD",
        available: 30,
    },
    {
        imgUrl: '/assets/images/products/iphone-2.jpg',
        name: 'Nghiên cứu, tổng hợp, thống kê, báo cáo, xử lý thông tin',
        price: "Chi bộ 2",
        available: 35,
    },
    {
        imgUrl: '/assets/images/products/iphone-1.jpg',
        name: 'Công việc D',
        price: "Chi bộ 1",
        available: 0,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Head phone',
        price: 1190,
        available: 5,
    },
];

export default TopSellingTable;
