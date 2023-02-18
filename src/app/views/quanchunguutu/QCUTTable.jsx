import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import QCUTModal from './QCUTModal';
import ChiTietQCUTModal from './ChiTietQCUTModal';
import Services from 'app/services';
import qCUTUtil from 'app/utils/modules/QCUT';
import FormatDate from 'app/common/FormatDate';


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
const QCUTTable = () => {
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    let checked = false;
    let indeterminate = false;
    const [loading, setLoading] = useState(true);
    const [listQCUTMD, setListQCUTMD] = useState([]);
    const [listQCUTSelect, setListQCUTSelect] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);

    const [listQCUT, setListQCUT] = useState([]);
    const [openQCUTModal, setOpenQCUTModal] = useState(false);
    const [openChiTietQCUTModal, setOpenChiTietQCUTModal] = useState(false);
    const [qCUTUp, setQCUTUp] = useState(qCUTUtil.getQCUTThem());

    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        return () => { isMounted = false; };
    }, []);
    function reloadList(click) {

        setLoading(true);
        setSearchKeyword('')
        setCheckedKeys([])
        Services.getQCUTService().getAll().then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        response.data.reverse()
                        let data = response.data.filter((v, i) => {
                            const start = limit * (page - 1);
                            const end = start + limit;
                            return i >= start && i < end;
                        });
                        setListQCUT(data);
                        setListQCUTMD(response.data);
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

    if (checkedKeys.length === listQCUT.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < listQCUT.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? listQCUT.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    const handleThemQCUT = () => {
        setQCUTUp(qCUTUtil.getQCUTThem())
        setOpenQCUTModal(true)

    };

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        setQCUTUp({ id: rowData.id })
                        setOpenChiTietQCUTModal(true)
                        break;
                    case 2:
                        setQCUTUp({ id: rowData.id })
                        setOpenQCUTModal(true)
                        break;
                        ;
                    case 4:
                        if (window.confirm("Bạn có chắc muốn xóa quần chúng này")) {
                            Services.getQCUTService().xoa(rowData.id).then(
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

    function timKiem(key) {
        if (key != "") {
            setListQCUT([]);
            listQCUTMD.forEach((qcut) => {
                if (qcut.hoTen?.toUpperCase().includes(key.toUpperCase()) || qcut.soDienThoai?.toUpperCase().includes(key.toUpperCase()) || qcut.soCMND?.toUpperCase().includes(key.toUpperCase())) {
                    setListQCUT((listQCUT) => [...listQCUT, qcut])
                }
            })

        } else {
            reloadList();
        }

    }
    return (
        <Container>
            <QCUTModal qCUTUp={qCUTUp} open={openQCUTModal} setOpen={setOpenQCUTModal} reloadList={reloadList} />
            <ChiTietQCUTModal qCUTID={qCUTUp.id} open={openChiTietQCUTModal} setOpen={setOpenChiTietQCUTModal} />
            <Breadcrumb routeSegments={[{ name: "Quần chúng", path: "/par/dangvien" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button appearance="primary" className='div-flex' onClick={handleThemQCUT}>
                            <Icon className="icon icon-search">add</Icon> Thêm quần chúng
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

                    </Stack>
                </Stack>
                <Table virtualized height={550} data={listQCUT} id="table" className='table' loading={loading}>
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

                    <Column width={170} resizable>
                        <HeaderCell>HỌ TÊN</HeaderCell>
                        <Cell dataKey="hoTen" />
                    </Column>
                    <Column width={110} resizable>
                        <HeaderCell>SỐ ĐIỆN THOẠI</HeaderCell>
                        <Cell dataKey="soDienThoai" />
                    </Column>
                    <Column width={90} resizable>
                        <HeaderCell>GIỚI TÍNH</HeaderCell>
                        <Cell>{rowData => rowData.gioiTinh ? "Nam" : "Nữ"}</Cell>
                    </Column>

                    <Column width={130} resizable>
                        <HeaderCell>NGÀY ĐƯA VÀO</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.ngayDuaVao))}</Cell>
                    </Column>
                    <Column width={170} resizable>
                        <HeaderCell>ĐẢNG VIÊN GIÚP ĐỠ</HeaderCell>
                        <Cell dataKey="tenDV" />
                    </Column>
                    <Column width={115} resizable>
                        <HeaderCell>CHI BỘ</HeaderCell>
                        <Cell dataKey="tenCB" />
                    </Column>

                    <Column width={130} resizable>
                        <HeaderCell>NGÀY SINH</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.ngaySinh))}</Cell>
                    </Column>

                    <Column minWidth={150} flexGrow={1}>
                        <HeaderCell>QUÊ QUÁN</HeaderCell>
                        <Cell dataKey="queQuan" />
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
                        total={listQCUTMD.length}
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

export default QCUTTable;
