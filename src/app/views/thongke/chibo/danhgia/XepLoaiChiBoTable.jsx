import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import Switch from "@mui/material/Switch";
import MoreIcon from '@rsuite/icons/legacy/More';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import Services from 'app/services';
import chiBoUtil from 'app/utils/modules/ChiBo';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
import { forEach, set } from 'lodash';

const { Column, HeaderCell, Cell } = Table;
const Container = styled("div")(({ theme }) => ({
    margin: "20px 20px 5px 20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "20px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const CompactCell = props => <Cell {...props} style={{ padding: 10 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 10 }} />;
const CompactHeaderCellCheck = props => <HeaderCell {...props} style={{ padding: 0 }} />;

const XepLoaiChiBoTable = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    const [expend, setExpend] = useState(false);
    const [listNamDanhGia, setListNamDanhGia] = useState([]);
    const CustomCell = CompactCell;
    const CustomHeaderCell = CompactHeaderCell;
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();

        return () => { isMounted = false; };
    }, []);
    function reloadList(click) {
        setLoading(true);
        setSearchKeyword('')
        Services.getThongKeService().getThongKeDanhGiaChiBo().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setListChiBo(response.data);
                        setListChiBoMD(response.data);
                        setLoading(false);
                    }
                }
            }
        );
        let listNam = FormatDate.exportArrayYear("2016-01-01", FormatDate.getNgayGioHienTai())
        listNam.reverse()
        let rs = [{
            key: 1,
            label: 'TÊN CHI BỘ',
            fixed: windowScreen ? true : false,
            width: 300,
            hoTen: true,
        }, {
            key: 1,
            label: '5 NĂM LIỀN',
            width: 85,
            namNam: true,
        }]
        listNam.forEach(nam => {
            rs.push({
                key: nam,
                label: nam,
                width: 120,
                danhGia: true,
            })

        });

        setListNamDanhGia(rs)
    }

    function timKiem(key) {
        if (key != "") {
            setListChiBo([]);
            let rs = []
            listChiBoMD.forEach((cb) => {
                let cbrs = { ...cb, children: [] };
                cb?.children?.forEach(dv => {
                    if (dv.hoTen?.toUpperCase().includes(key.toUpperCase())) {
                        cbrs.children.push(dv)
                    }
                });
                rs.push(cbrs)

            })
            setListChiBo(rs)
            setExpend(true);
        } else {
            reloadList();
        }

    }
    function locDVXuatSac() {
        setListChiBo([]);
        let rs = []
        listChiBoMD.forEach((cb) => {
            let cbrs = { ...cb, children: [] };
            cb?.children?.forEach(dv => {
                if (dv.namNamLT) {
                    cbrs.children.push(dv)
                }
            });
            rs.push(cbrs)

        })
        setListChiBo(rs)
        setExpend(true);


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
                return <span className='red'>{PhanLoai.getPhanLoaiXepLoaiKyHieu(rs)}</span>
            } else {
                return PhanLoai.getPhanLoaiXepLoaiKyHieu(rs)
            }
        }
    }
    const handleChange = (event) => {
        console.log(event.target.checked);
        if (event.target.checked) {
            locDVXuatSac()
        } else {
            setListChiBo(listChiBoMD)
        }
    };

    return (
        <Container>

            <Breadcrumb routeSegments={[{ name: "Thống kê", path: "/par/chibo" }]} />

            <SimpleCard >

                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>

                    </Stack>

                    <Stack spacing={6}>

                        <span>Chỉ hiện đảng viên xuất sắc 5 năm liên tục </span>
                        <Switch
                            value="checkedA"
                            onChange={handleChange}
                            inputProps={{ "aria-label": "secondary checkbox" }}
                        />
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
                        isTree
                        defaultExpandAllRows={true}
                        shouldUpdateScroll={false}
                        rowKey="hoTen"
                        height={570}

                        data={listChiBo} bordered={true} cellBordered={true}
                        headerHeight={35} rowHeight={35}
                        id="table" className='table' loading={loading}

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
                                const { key, label, hoTen, namNam, danhGia, ...rest } = column;
                                return (
                                    <Column {...rest} key={key} fullText>
                                        <CustomHeaderCell align={"center"}>{label}</CustomHeaderCell>
                                        {hoTen ?
                                            <CustomCell>
                                                {(rowData) =>
                                                (rowData.chiBo != undefined ?
                                                    <span className={!["Đảng viên", "Đảng viên dự bị"].includes(rowData.chucVuDang.ten) ? "blue" : null}>
                                                        -&ensp;{rowData.hoTen}
                                                    </span>
                                                    :
                                                    <b>{rowData.hoTen}</b>
                                                )}
                                            </CustomCell> :
                                            namNam ?
                                                <CustomCell align={"center"}>
                                                    {(rowData) =>
                                                    (rowData.namNamLT == true &&
                                                        <Icon className="icon icon-search green">done </Icon>
                                                    )}
                                                </CustomCell> :
                                                <CustomCell align={"center"} >{(rowData) => (xepLoaiNam(key, rowData.listDGXL))}</CustomCell>
                                        }

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

export default XepLoaiChiBoTable;
