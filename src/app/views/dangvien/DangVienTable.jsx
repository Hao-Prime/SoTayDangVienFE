import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import DangVienModal from './DangVienModal';
import ChiTietDangVienModal from './ChiTietDangVienModal';
import Services from 'app/services';
import dangVienUtil from 'app/utils/modules/DangVien';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
import DanhGiaModal from './DanhGiaModal';
import SapXep from 'app/common/SapXep';

const { Column, HeaderCell, Cell } = Table;
const Container = styled("div")(({ theme }) => ({
    margin: "20px 20px 5px 20px",

    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "20px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '36px' }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);
const CompactCell = props => <Cell {...props} style={{ padding: 10 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 10 }} />;
const CompactHeaderCellCheck = props => <HeaderCell {...props} style={{ padding: 0 }} />;

const DangVienTable = () => {
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    let checked = false;
    let indeterminate = false;
    const [loading, setLoading] = useState(true);
    const [listDangVienMD, setListDangVienMD] = useState([]);
    const [listDangVienALL, setListDangVienALL] = useState([]);
    const [listDangVienSelect, setListDangVienSelect] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);
    const [listCB, setListCB] = useState([]);
    const [chiBoSelected, setChiBoSelected] = useState();
    const [listDangVien, setListDangVien] = useState([]);
    const [openDangVienModal, setOpenDangVienModal] = useState(false);
    const [openDanhGiaModal, setOpenDanhGiaModal] = useState(false);
    const [openChiTietDangVienModal, setOpenChiTietDangVienModal] = useState(false);
    const [dangVienUp, setDangVienUp] = useState(dangVienUtil.getDangVienThem());
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const CustomCell = CompactCell;
    const CustomHeaderCell = CompactHeaderCell;
    const CustomHeaderCellCheck = CompactHeaderCellCheck;
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        Services.getChiBoService().getSelect().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {

                        setListCB(response.data.map(
                            item => ({ label: item.ten, value: item.id })))
                    }
                }
            }
        );
        return () => { isMounted = false; };
    }, []);
    useEffect(() => {
        let data = listDangVienMD.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        setListDangVien(data);
    }, [page, limit]);
    function reloadList(click) {
        if (click != undefined) {
            setNamXepLoai(FormatDate.getNgayHienTai().substring(0, 4))
            setChiBoSelected()
        }
        setLoading(true);
        setSearchKeyword('')
        setCheckedKeys([])
        Services.getDangVienService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        // response.data.reverse()
                        SapXep.sapXepTheoObject2Atr(response.data, "chiBo", "id", 1)
                        if (click != undefined) {
                            let data = response.data.filter((v, i) => {
                                const start = limit * (page - 1);
                                const end = start + limit;
                                return i >= start && i < end;
                            });
                            setListDangVien(data);
                            setListDangVienMD(response.data);
                            setLoading(false);
                        } else {
                            locTheoChiBo(response.data, chiBoSelected);
                        }
                        setListDangVienALL(response.data)
                    }
                }
            }
        );
    }

    function locTheoChiBo(dataDVALL, chiBo) {
        let rs = []
        if (chiBo == undefined || chiBo.id == null) {
            rs = dataDVALL
        } else {
            dataDVALL.forEach(dv => {
                if (dv.chiBo.id == chiBo.id) {
                    rs.push(dv)
                }
            });
        }

        let data = rs.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        setListDangVien(data);
        setListDangVienMD(rs);

        setLoading(false);
    }
    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    if (checkedKeys.length === listDangVien.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < listDangVien.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? listDangVien.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    const handleThemDangVien = () => {
        setDangVienUp(dangVienUtil.getDangVienThem())
        setOpenDangVienModal(true)

    };
    const handleDanhGiaNhanh = () => {
        let rs = []
        let error = false
        checkedKeys.forEach(id => {
            listDangVienMD.forEach(dv => {
                if (dv.id == id) {
                    dv?.listDGXL?.forEach(rate => {
                        if (rate.nam == namXepLoai) {
                            error = true
                            return
                        }
                    });
                    rs.push(dv)
                }
            });
        });
        if (error) {
            alert("Đảng viên chọn đã được xếp loại, không thể xếp loại tiếp")
            return
        }
        if (rs.length == 0) {
            alert("Bạn chưa chọn đối tượng cần thao tác")
        } else {
            setListDangVienSelect(rs);
            setOpenDanhGiaModal(true)
        }


    };
    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        setDangVienUp({ id: rowData.id })
                        setOpenChiTietDangVienModal(true)
                        // setOpenDangVienModal(true)
                        break;
                    case 2:
                        setDangVienUp({ id: rowData.id })
                        setOpenDangVienModal(true)
                        break;
                    // case 3:
                    //     setListDangVienSelect([rowData])
                    //     setOpenDanhGiaModal(true)
                    //     break;
                    case 4:
                        if (window.confirm("Bạn có chắc muốn xóa đảng viên này")) {
                            Services.getDangVienService().xoa(rowData.id).then(
                                (response) => {
                                    if (response.data?.tenLoi != undefined) {
                                        alert(response.data?.noiDung)
                                    } else {
                                        reloadList()
                                    }

                                }
                            )
                        }
                        break;
                    default:
                        break;
                }
            };
            return (
                <Popover ref={ref} className={className} style={{ left, top }} >
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1}>Xem chi tiết</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>Cập nhật</Dropdown.Item>
                        {/* <Dropdown.Item eventKey={3}>Đánh giá</Dropdown.Item> */}
                        <Dropdown.Item eventKey={4}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            );
        };
        return (
            <CustomCell {...props} className="link-group">
                <Whisper placement="auto" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon />} style={{ height: 10, padding: '3px 10px 20px' }} />
                </Whisper>
            </CustomCell>
        );
    };
    const RateCell = ({ rowData, dataKey, ...props }) => {
        function searchRate() {
            let rs = ""
            rowData?.listDGXL?.forEach(rate => {

                if (rate.nam == namXepLoai) {
                    rs = PhanLoai.getPhanLoaiXepLoai(rate.phanLoai)
                }
            });
            if (rs != "") return rs
            if (rowData.ngayVaoDang != null) {

                if (FormatDate.tinhKhoangCach(rowData.ngayVaoDang, FormatDate.getNgayHienTai()) < 182) {
                    return "Chưa đủ 6 tháng"
                } else return "Chưa xếp loại"
            } else return "Thiếu dữ liệu"
        }
        return (
            <CustomCell {...props} className="link-group">
                <p>{searchRate()}</p>
            </CustomCell>
        );
    };
    function timKiem(key) {
        if (key != "") {
            setListDangVien([]);
            listDangVienMD.forEach((dv) => {
                if (dv.hoTen?.toUpperCase().includes(key.toUpperCase()) || dv.email?.toUpperCase().includes(key.toUpperCase()) || dv.soDienThoai?.toUpperCase().includes(key.toUpperCase()) || dv.soTheDang?.toUpperCase().includes(key.toUpperCase())) {
                    setListDangVien((listDangVien) => [...listDangVien, dv])
                }
            })

        } else {
            reloadList();
        }

    }
    return (
        <Container>
            <DangVienModal dangVienUp={dangVienUp} open={openDangVienModal} setOpen={setOpenDangVienModal} reloadList={reloadList} />
            <DanhGiaModal listDangVien={listDangVienSelect} namXepLoai={namXepLoai} open={openDanhGiaModal} setOpen={setOpenDanhGiaModal} reloadList={reloadList} />
            <ChiTietDangVienModal dangVienID={dangVienUp.id} open={openChiTietDangVienModal} setOpen={setOpenChiTietDangVienModal} />
            <Breadcrumb routeSegments={[{ name: "Đảng viên", path: "/par/dangvien" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button appearance="primary" className='div-flex' onClick={handleThemDangVien}>
                            <Icon className="icon icon-search">add</Icon> Thêm Đảng viên
                        </Button>

                        <Button color="red" appearance="ghost" className='div-flex' onClick={handleDanhGiaNhanh}>
                            <Icon className="icon icon-search">star </Icon> Đánh giá nhanh
                        </Button>

                        <Button color="yellow" appearance="primary" className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                    </Stack>

                    <Stack spacing={6}>
                        <SelectPicker style={{ width: 250 }} label="Chi bộ: " data={listCB} onChange={(e) => { setChiBoSelected({ id: e }); locTheoChiBo(listDangVienALL, { id: e }) }} />
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
                        <Dropdown title={"Xếp loại năm " + namXepLoai} placement="bottomEnd" onSelect={(eventKey) => setNamXepLoai(eventKey)}>
                            <Dropdown.Item eventKey={2024}>2024</Dropdown.Item>
                            <Dropdown.Item eventKey={2023}>2023</Dropdown.Item>
                            <Dropdown.Item eventKey={2022}>2022</Dropdown.Item>
                            <Dropdown.Item eventKey={2021}>2021</Dropdown.Item>
                            <Dropdown.Item eventKey={2020}>2020</Dropdown.Item>
                            <Dropdown.Item eventKey={2019}>2019</Dropdown.Item>
                            <Dropdown.Item eventKey={2018}>2018</Dropdown.Item>
                            <Dropdown.Item eventKey={2017}>2017</Dropdown.Item>
                            <Dropdown.Item eventKey={2016}>2016</Dropdown.Item>
                        </Dropdown>
                    </Stack>
                </Stack>
                <Table virtualized height={550} data={listDangVien} id="table" className='table' loading={loading} headerHeight={38} rowHeight={38} shouldUpdateScroll={false}>
                    <Column width={40} align="center">
                        <CustomHeaderCellCheck>
                            <div >
                                <Checkbox
                                    inline
                                    checked={checked}
                                    indeterminate={indeterminate}
                                    onChange={handleCheckAll}
                                />
                            </div>
                        </CustomHeaderCellCheck>
                        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                    </Column>
                    <Column width={45} align="center" >
                        <CustomHeaderCell>STT</CustomHeaderCell>
                        <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                    </Column>
                    {/* <Column width={80} align="center" resizable>
                        <CustomHeaderCell>Avartar</CustomHeaderCell>
                        <ImageCell dataKey="avartar" />
                    </Column> */}
                    <Column width={100} resizable>
                        <CustomHeaderCell>SỐ THẺ DẢNG</CustomHeaderCell>
                        <CustomCell dataKey="soTheDang" />
                    </Column>

                    <Column width={180} resizable>
                        <CustomHeaderCell>HỌ TÊN</CustomHeaderCell>
                        <CustomCell dataKey="hoTen" />
                    </Column>


                    <Column width={130} resizable>
                        <CustomHeaderCell>CHỨC VỤ</CustomHeaderCell>

                        <CustomCell>{rowData => <span className={!["Đảng viên", "Đảng viên dự bị"].includes(rowData.chucVuDang.ten) ? "blue" : null}>{rowData.chucVuDang.ten}</span>}</CustomCell>
                    </Column>
                    <Column width={115} resizable>
                        <CustomHeaderCell>CHI BỘ</CustomHeaderCell>
                        <CustomCell dataKey="chiBo.ten" />
                    </Column>
                    <Column width={115} resizable>
                        <CustomHeaderCell>XẾP LOẠI</CustomHeaderCell>
                        <RateCell />
                    </Column>
                    <Column width={90} resizable>
                        <CustomHeaderCell>GIỚI TÍNH</CustomHeaderCell>
                        <CustomCell>{rowData => rowData.gioiTinh ? "Nam" : "Nữ"}</CustomCell>
                    </Column>
                    <Column width={100} resizable>
                        <CustomHeaderCell>NGÀY SINH</CustomHeaderCell>
                        <CustomCell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.ngaySinh))}</CustomCell>
                    </Column>
                    <Column width={100} resizable>
                        <CustomHeaderCell>SỐ ĐIỆN THOẠI</CustomHeaderCell>
                        <CustomCell dataKey="soDienThoai" />
                    </Column>

                    <Column width={100} resizable>
                        <CustomHeaderCell>EMAIL</CustomHeaderCell>
                        <CustomCell dataKey="email" />
                    </Column>
                    <Column minWidth={150} flexGrow={1}>
                        <CustomHeaderCell>QUÊ QUÁN</CustomHeaderCell>
                        <CustomCell dataKey="queQuan" />
                    </Column>


                    <Column width={60} fixed={windowScreen ? "right" : false}>
                        <CustomHeaderCell>
                            {/* <MoreIcon /> */}
                        </CustomHeaderCell>
                        <ActionCell dataKey="id" />
                    </Column>
                </Table>
                <div style={{ padding: "7px" }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        // ellipsis
                        // boundaryLinks
                        maxButtons={3}
                        size="xs"
                        layout={['-', 'limit', '|', 'pager']}
                        total={listDangVienMD.length}
                        limitOptions={[30, 50, 70, 100]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
                {/* </div> */}
            </SimpleCard>
        </Container >
    );
};

export default DangVienTable;
