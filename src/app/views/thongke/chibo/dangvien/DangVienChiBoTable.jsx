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

const DangVienChiBoTable = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();

        return () => { isMounted = false; };
    }, []);
    function reloadList(click) {
        setLoading(true);
        setSearchKeyword('')
        Services.getThongKeService().getThongKeThongTinDangVienChiBo().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        let data = []
                        var namT = 0, nuT = 0, slDVT = 0, slDVDBT = 0, tenDVDBT = []
                        response.data.forEach(cb => {
                            let nam = 0, nu = 0, slDV = 0, slDVDB = 0, tenDVDB = []
                            cb.children?.forEach(dv => {
                                if (dv.gioiTinh) {
                                    nam++
                                    namT++
                                } else {
                                    nu++
                                    nuT++
                                }
                                if (dv.chucVuDang.id != 6) {
                                    slDV++
                                    slDVT++
                                } else {
                                    slDVDB++
                                    slDVDBT++
                                    tenDVDB.push(dv.hoTen)
                                    tenDVDBT.push(dv.hoTen)
                                }
                            });
                            data.push({
                                ...cb,
                                nam: nam,
                                nu: nu,
                                slDV: slDV,
                                slDVDB: slDVDB,
                                tenDVDB: tenDVDB?.toString()?.replaceAll(",", ", "),
                            }

                            )
                        });
                        data.push({
                            hoTen: "ĐẢNG BỘ VIỄN THÔNG LONG AN",
                            nam: namT,
                            nu: nuT,
                            slDV: slDVT,
                            slDVDB: slDVDBT,
                            tenDVDB: "",
                        })
                        setListChiBo(data);
                        setListChiBoMD(data);
                        setLoading(false);
                    }
                }
            }
        );
    }

    function timKiem(key) {
        if (key != "") {
            setListChiBo([]);
            listChiBoMD.forEach((cb) => {
                if (cb.ten?.toUpperCase().includes(key.toUpperCase()) || cb.moTa?.toUpperCase().includes(key.toUpperCase())) {
                    setListChiBo((listChiBo) => [...listChiBo, cb])
                }
            })

        } else {
            reloadList();
        }

    }
    function getSLGioiTinh(listDV, type) {
        let count = 0
        if (type == 0) { // nữ
            listDV?.forEach(dv => {
                if (!dv.gioiTinh) {
                    count++
                }
            });
        } else {
            listDV?.forEach(dv => {
                if (dv.gioiTinh) {
                    count++
                }
            });
        }
        return count
    }
    function getSLDV(listDV, type) {
        let count = 0
        let ten = []
        if (type == 0) { // đảng viên
            listDV?.forEach(dv => {
                if (dv.chucVuDang.id != 6) {
                    count++
                }
            });
        } else if (type == 1) {// đv dự bị
            listDV?.forEach(dv => {
                if (dv.chucVuDang.id == 6) {
                    count++
                }
            });
        } else if (type == 2) {// đv dự bị
            listDV?.forEach(dv => {
                if (dv.chucVuDang.id == 6) {
                    ten.push(dv.hoTen)
                }
            });
            return ten?.toString()?.replaceAll(",", ", ")
        }
        return count
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
                <Table virtualized height={570} data={listChiBo} id="table" className='table' loading={loading} bordered={true} cellBordered={true}>

                    <Column width={45} align="center" >
                        <HeaderCell>STT</HeaderCell>
                        <Cell>{(rowData, rowIndex) => (rowData.id != undefined ? rowIndex + 1 : "")}</Cell>
                    </Column>
                    <Column width={360} resizable>
                        <HeaderCell align={"center"}>TÊN CHI BỘ</HeaderCell>
                        <Cell>{(rowData, rowIndex) => (rowData.id != undefined ? rowData.hoTen : <b>{rowData.hoTen}</b>)}</Cell>
                    </Column>

                    <Column width={100}>
                        <HeaderCell align={"center"}>NAM</HeaderCell>
                        <Cell dataKey="nam" align={"center"} />
                    </Column>
                    <Column width={100}>
                        <HeaderCell align={"center"}>NỮ</HeaderCell>
                        <Cell dataKey="nu" align={"center"} />
                    </Column>

                    <Column width={100}>
                        <HeaderCell align={"center"}>ĐẢNG VIÊN</HeaderCell>

                        <Cell align={"center"}>{rowData => rowData.slDV + rowData.slDVDB}</Cell>
                    </Column>
                    <Column width={100}>
                        <HeaderCell align={"center"}>ĐV DỰ BỊ</HeaderCell>
                        <Cell dataKey="slDVDB" align={"center"} />
                    </Column>
                    <Column width={350}>
                        <HeaderCell align={"center"}>TÊN ĐV DỰ BỊ</HeaderCell>
                        <Cell dataKey="tenDVDB" />
                    </Column>
                </Table>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};

export default DangVienChiBoTable;
