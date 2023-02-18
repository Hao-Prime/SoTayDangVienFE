import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import ChiBoModal from './ChiBoModal';
import Services from 'app/services';
import chiBoUtil from 'app/utils/modules/ChiBo';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
import DanhGiaModal from './DanhGiaModal';
import ChiTietChiBoModal from './ChiTietChiBoModal';

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
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);
const ChiBoTable = () => {
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    let checked = false;
    let indeterminate = false;
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBoSelect, setListChiBoSelect] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);

    const [listChiBo, setListChiBo] = useState([]);
    const [openChiBoModal, setOpenChiBoModal] = useState(false);
    const [openDanhGiaModal, setOpenDanhGiaModal] = useState(false);
    const [openChiTietChiBoModal, setOpenChiTietChiBoModal] = useState(false);
    const [chiBoUp, setChiBoUp] = useState(chiBoUtil.getChiBoThem());
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        return () => { isMounted = false; };
    }, []);
    function reloadList(click) {
        if (click != undefined) {
            setNamXepLoai(FormatDate.getNgayHienTai().substring(0, 4))
        }
        setLoading(true);
        setSearchKeyword('')
        setCheckedKeys([])
        Services.getChiBoService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {

                        let data = response.data.filter((v, i) => {
                            const start = limit * (page - 1);
                            const end = start + limit;
                            return i >= start && i < end;
                        });
                        setListChiBo(data);
                        setListChiBoMD(response.data);
                        setLoading(false);
                    }
                }
            }
        );
    }
    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    if (checkedKeys.length === listChiBo.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < listChiBo.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? listChiBo.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    const handleThemChiBo = () => {
        setChiBoUp(chiBoUtil.getChiBoThem())
        setOpenChiBoModal(true)

    };
    const handleDanhGiaNhanh = () => {
        let rs = []
        let error = false
        checkedKeys.forEach(id => {
            listChiBoMD.forEach(cb => {
                if (cb.id == id) {
                    cb?.listDGXL?.forEach(rate => {
                        if (rate?.nam == namXepLoai) {
                            error = true
                            return
                        }
                    });
                    rs.push(cb)
                }
            });
        });
        if (error) {
            alert("Chi bộ chọn đã được xếp loại, không thể xếp loại tiếp")
            return
        }
        if (rs.length == 0) {
            alert("Bạn chưa chọn đối tượng cần thao tác")
        } else {
            setListChiBoSelect(rs);
            setOpenDanhGiaModal(true)
        }


    };
    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        setChiBoUp({ id: rowData.id })
                        setOpenChiTietChiBoModal(true)
                        break;
                    case 2:
                        setChiBoUp(rowData)
                        setOpenChiBoModal(true)
                        break;
                    case 3:
                        if (window.confirm("Bạn có chắc muốn xóa chi bộ này")) {
                            Services.getChiBoService().xoa(rowData.id).then(
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
                        <Dropdown.Item eventKey={3}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            );
        };
        return (
            <Cell {...props} className="link-group">
                <Whisper placement="auto" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon />} style={{ height: 10, padding: '3px 10px 20px' }} />
                </Whisper>
            </Cell>
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

            return "Chưa xếp loại"

        }
        return (
            <Cell {...props} className="link-group">
                <p>{searchRate()}</p>
            </Cell>
        );
    };
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
    return (
        <Container>
            <ChiBoModal chiBoUp={chiBoUp} open={openChiBoModal} setOpen={setOpenChiBoModal} reloadList={reloadList} />
            <DanhGiaModal listChiBo={listChiBoSelect} namXepLoai={namXepLoai} open={openDanhGiaModal} setOpen={setOpenDanhGiaModal} reloadList={reloadList} />
            <ChiTietChiBoModal chiBoID={chiBoUp.id} open={openChiTietChiBoModal} setOpen={setOpenChiTietChiBoModal} />
            <Breadcrumb routeSegments={[{ name: "Chi bộ", path: "/par/chibo" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button appearance="primary" className='div-flex' onClick={handleThemChiBo}>
                            <Icon className="icon icon-search">add</Icon> Thêm chi bộ
                        </Button>

                        <Button color="red" appearance="ghost" className='div-flex' onClick={handleDanhGiaNhanh}>
                            <Icon className="icon icon-search">star </Icon> Đánh giá nhanh
                        </Button>

                        <Button color="yellow" appearance="primary" className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                    </Stack>

                    <Stack spacing={6}>

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
                <Table virtualized height={550} data={listChiBo} id="table" className='table' loading={loading}>
                    <Column width={40} align="center">
                        <HeaderCell style={{ padding: 0 }}>
                            <div style={{ lineHeight: '40px' }}>
                                <Checkbox
                                    inline
                                    checked={checked}
                                    indeterminate={indeterminate}
                                    onChange={handleCheckAll}
                                />
                            </div>
                        </HeaderCell>
                        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                    </Column>
                    <Column width={45} align="center" >
                        <HeaderCell>STT</HeaderCell>
                        <Cell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</Cell>
                    </Column>
                    <Column width={360} resizable>
                        <HeaderCell>TÊN CHI BỘ</HeaderCell>
                        <Cell dataKey="ten" />
                    </Column>

                    <Column width={130} resizable>
                        <HeaderCell>NGÀY THÀNH LẬP</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.ngayThanhLap))}</Cell>
                    </Column>
                    <Column width={150} resizable>
                        <HeaderCell>XẾP LOẠI</HeaderCell>
                        <RateCell />
                    </Column>
                    <Column width={200} resizable>
                        <HeaderCell>ĐẢNG BỘ</HeaderCell>
                        <Cell dataKey="dangBo.ten" />
                    </Column>

                    <Column width={290} resizable>
                        <HeaderCell>MÔ TẢ</HeaderCell>
                        <Cell dataKey="moTa" />
                    </Column>


                    <Column width={60} fixed={windowScreen ? "right" : false}>
                        <HeaderCell>
                            {/* <MoreIcon /> */}
                        </HeaderCell>
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
                        total={listChiBoMD.length}
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

export default ChiBoTable;
