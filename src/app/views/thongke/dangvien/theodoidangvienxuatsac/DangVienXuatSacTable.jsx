import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import Services from 'app/services';
import chiBoUtil from 'app/utils/modules/ChiBo';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';

const { Column, HeaderCell, Cell } = Table;
const Container = styled("div")(({ theme }) => ({
    margin: "20px 20px 5px 20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "20px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const CompactCell = props => <Cell {...props} style={{ padding: 7 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 7 }} />;

const DangVienXuatSacTable = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listDV, setListDV] = useState([]);
    const [listDangVienXSMD, setlistDangVienXSMD] = useState([]);
    const [listIDSearch, setListIDSearch] = useState([]);
    const [listDangVienXS, setlistDangVienXS] = useState([]);
    const [listNamDanhGia, setListNamDanhGia] = useState([]);
    const CustomCell = CompactCell;
    const CustomHeaderCell = CompactHeaderCell;
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();

        return () => { isMounted = false; };
    }, []);
    function reloadList(click) {
        setLoading(true);
        setSearchKeyword('')
        Services.getThongKeService().getThongKeDangVienXuatSac().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setlistDangVienXS([response.data]);
                        setlistDangVienXSMD([response.data]);
                        setLoading(false);
                    }
                }
            }
        );
        Services.getDangVienService().getSelect().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        setListDV(response.data)
                    }
                }
            }
        );
        let listNam = FormatDate.exportArrayYear("2016-01-01", FormatDate.getNgayGioHienTai())
        listNam.reverse()
        let rs = []
        listNam.forEach(nam => {
            rs.push({
                key: nam,
                label: nam,
                width: 200,
                danhGia: true,
            })

        });

        setListNamDanhGia(rs)
    }

    function timKiem(key) {
        if (key != "") {
            setListIDSearch([])
            listDV.forEach((dv) => {
                if (dv.hoTen?.toUpperCase().includes(key.toUpperCase())) {
                    setListIDSearch((list) => [...list, dv.id])
                }
            })

        } else {
            reloadList();
        }

    }

    function xepLoaiNam(nam, listXepLoai) {
        let rs = 0
        listXepLoai.forEach(xepLoai => {
            if (xepLoai.nam == nam) {
                rs = xepLoai.phanLoai
                return
            }
        });
        if (rs == "") {
            return <span className='gray'>⛌</span>
        } else {
            if (rs == 1) {
                return <span className='red'>{PhanLoai.getPhanLoaiXepLoai(rs)}</span>
            } else {
                return PhanLoai.getPhanLoaiXepLoai(rs)
            }
        }
    }
    function locTheoXepLoai(loai) {

    }
    function hienThiTenDangVien(listDV) {
        return <>
            {listDV?.map((dv, i) => (
                <p key={dv.id} className={!["Đảng viên", "Đảng viên dự bị"].includes(dv.chucVuDang.ten) ? "blue pointer" : "pointer"} title={dv?.chiBo?.ten}>
                    <span className={listIDSearch.includes(dv.id) ? "red" : ""}>
                        {"- " + dv.hoTen}<br />
                    </span>
                </p>

            ))

            }
        </>

    }
    return (
        <Container>

            <Breadcrumb routeSegments={[{ name: "Thống kê", path: "/par/chibo" }]} />

            <SimpleCard >

                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>

                    </Stack>

                    <Stack spacing={6}>
                        <Button className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                        <InputGroup inside>
                            <Input placeholder="Tìm kiếm" value={searchKeyword} onChange={setSearchKeyword}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        timKiem(searchKeyword);
                                    }
                                }} />
                            <InputGroup.Addon>
                                <Icon className="icon icon-search">search</Icon>
                            </InputGroup.Addon>
                        </InputGroup>

                    </Stack>
                </Stack>

                {listNamDanhGia.length > 0 &&
                    <Table

                        rowKey="hoTen"
                        height={570}
                        headerHeight={35}
                        rowHeight={35}
                        wordWrap="break-word"
                        data={listDangVienXS} bordered={true} cellBordered={true}
                        id="table" className='table' loading={loading}
                        shouldUpdateScroll={true}
                        onExpandChange={(isOpen, rowData) => {
                            console.log(isOpen, rowData);
                        }}
                        renderTreeToggle={(icon, rowData) => {
                            if (rowData.children && rowData.children.length === 0) {
                                return null;
                            }
                            return icon;
                        }}
                    >
                        {
                            listNamDanhGia.map(column => {
                                const { key, label, danhGia, ...rest } = column;
                                return (
                                    <Column {...rest} key={key}>
                                        <CustomHeaderCell align={"center"}><b>{label}</b></CustomHeaderCell>
                                        <CustomCell >{(rowData) => (hienThiTenDangVien(rowData[key]))}</CustomCell>
                                    </Column>
                                );
                            })
                        }


                    </Table>}
                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};

export default DangVienXuatSacTable;
