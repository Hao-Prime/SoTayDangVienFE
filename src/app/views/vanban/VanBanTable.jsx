import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import VanBanModal from './VanBanModal';
import Services from 'app/services';
import vanBanUtil from 'app/utils/modules/VanBan';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
import ChiTietVanBanModal from './ChiTietVanBanModal';
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
const VanBanTable = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    let checked = false;
    let indeterminate = false;
    const [loading, setLoading] = useState(true);
    const [listVanBanMD, setListVanBanMD] = useState([]);
    const [listVanBanSelect, setListVanBanSelect] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);

    const [listVanBan, setListVanBan] = useState([]);
    const [openVanBanModal, setOpenVanBanModal] = useState(false);
    const [openDanhGiaModal, setOpenDanhGiaModal] = useState(false);
    const [openChiTietVanBanModal, setOpenChiTietVanBanModal] = useState(false);
    const [vanBanUp, setVanBanUp] = useState(vanBanUtil.getVanBanThem());
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        return () => { isMounted = false; };
    }, [searchParams]);
    function reloadList(click) {

        setLoading(true);
        setSearchKeyword('')
        setCheckedKeys([])
        setListVanBan([])
        setListVanBanMD([])
        function renderResponse(response) {
            if (isMounted) {
                if (response.data != null) {
                    response.data.reverse()
                    SapXep.sapXepTheoNgay(response.data, "ngayTao", -1)
                    let data = response.data.filter((v, i) => {
                        const start = limit * (page - 1);
                        const end = start + limit;
                        return i >= start && i < end;
                    });

                    if (click != undefined) {
                        setListVanBan(data);
                    } else if (searchParams.get("id") != null) {
                        let key = searchParams.get("id")
                        data.forEach((vb) => {
                            if (vb.id + "" == key) {
                                setListVanBan((listVanBan) => [...listVanBan, vb])
                            }
                        })

                    } else if (searchParams.get("search") != null) {
                        let key = searchParams.get("search")
                        timKiem(key, data)

                    } else {
                        setListVanBan(data);
                    }
                    setListVanBanMD(response.data);
                    setLoading(false);
                }
            }
        }

        switch (searchParams.get("loai")) {
            case null:
                Services.getVanBanService().getAll().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            case "1":
                Services.getVanBanService().getDangXuLy().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            case "2":
                Services.getVanBanService().getDaXuLy().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            default:
                break;
        }




    }
    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    if (checkedKeys.length === listVanBan.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < listVanBan.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? listVanBan.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    const handleThemVanBan = () => {
        setVanBanUp(vanBanUtil.getVanBanThem())
        setOpenVanBanModal(true)

    };

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        setVanBanUp({ id: rowData.id })
                        setOpenChiTietVanBanModal(true)
                        break;
                    case 2:
                        window.location.href = "/quanly/congviec/tatca?idVB=" + rowData.id
                        break;
                    case 3:
                        setVanBanUp(rowData)
                        setOpenVanBanModal(true)
                        break;
                    case 4:
                        if (window.confirm("Bạn có chắc muốn xóa văn bản này. Đồng ý thì các file, công việc kèm theo sẽ bị xóa theo")) {
                            Services.getVanBanService().xoa(rowData.id).then(
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
                        <Dropdown.Item eventKey={2}>Xem chi tiết công việc</Dropdown.Item>
                        <Dropdown.Item eventKey={3}>Cập nhật</Dropdown.Item>
                        <Dropdown.Item eventKey={4}>Xóa</Dropdown.Item>
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
    function timKiem(key, listData) {
        if (key != "") {
            setListVanBan([]);
            listData.forEach((vb) => {
                if (vb.soEOFFICE?.toUpperCase().includes(key.toUpperCase()) || vb.soKyHieu?.toUpperCase().includes(key.toUpperCase()) || vb.ten?.toUpperCase().includes(key.toUpperCase()) || vb.noiDung?.toUpperCase().includes(key.toUpperCase())) {
                    setListVanBan((listVanBan) => [...listVanBan, vb])
                }
            })

        } else {
            reloadList();
        }

    }
    return (
        <Container>
            <VanBanModal vanBanUp={vanBanUp} open={openVanBanModal} setOpen={setOpenVanBanModal} reloadList={reloadList} />
            <ChiTietVanBanModal vanBanID={vanBanUp.id} open={openChiTietVanBanModal} setOpen={setOpenChiTietVanBanModal} />
            <Breadcrumb routeSegments={[{ name: "Văn bản", path: "/par/chibo" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button appearance="primary" className='div-flex' onClick={handleThemVanBan}>
                            <Icon className="icon icon-search">add</Icon> Thêm văn bản
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
                                        timKiem(searchKeyword, listVanBan);
                                    }
                                }} />
                            <InputGroup.Addon>
                                <Icon className="icon icon-search">search</Icon>
                            </InputGroup.Addon>
                        </InputGroup>

                    </Stack>
                </Stack>
                <Table virtualized height={550} data={listVanBan} id="table" className='table' loading={loading}>
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
                    <Column width={100} resizable>
                        <HeaderCell>SỐ EOFFICE</HeaderCell>
                        <Cell dataKey="soEOFFICE" />
                    </Column>
                    <Column width={100} resizable>
                        <HeaderCell>SỐ KÝ HIỆU</HeaderCell>
                        <Cell dataKey="soKyHieu" />
                    </Column>
                    <Column width={400} resizable>
                        <HeaderCell>TÊN VĂN BẢN</HeaderCell>
                        <Cell dataKey="ten" />
                    </Column>
                    <Column width={100} resizable>
                        <HeaderCell>TRẠNG THÁI</HeaderCell>
                        <Cell>{(rowData) => (PhanLoai.getTrangThaiCV(rowData.trangThai))}</Cell>
                    </Column>

                    <Column width={200} resizable>
                        <HeaderCell>PHÂN LOẠI</HeaderCell>
                        <Cell>{(rowData) => (PhanLoai.getPhanLoaiVanBan(rowData.phanLoai))}</Cell>
                    </Column>
                    <Column width={130} resizable>
                        <HeaderCell>NGÀY TẠO</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.ngayTao))}</Cell>
                    </Column>


                    <Column width={60} fixed={windowScreen ? "right" : false}>
                        <HeaderCell>

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
                        total={listVanBanMD.length}
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

export default VanBanTable;
