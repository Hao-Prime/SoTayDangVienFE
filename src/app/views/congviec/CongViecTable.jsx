import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import CongViecModal from './CongViecModal';
import Services from 'app/services';
import congViecUtil from 'app/utils/modules/CongViec';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
import ChiTietCongViecModal from './ChiTietCongViecModal';
import DanhGiaCongViecModal from './DanhGiaCongViecModal';

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
const CongViecTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    let checked = false;
    let indeterminate = false;
    const [loading, setLoading] = useState(true);
    const [listCongViecMD, setListCongViecMD] = useState([]);
    const [listCongViecALL, setListCongViecALL] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);
    const [listCB, setListCB] = useState([]);
    const [chiBoSelected, setChiBoSelected] = useState();
    const [listCongViec, setListCongViec] = useState([]);
    const [openCongViecModal, setOpenCongViecModal] = useState(false);
    const [openDanhGiaCongViecModal, setOpenDanhGiaCongViecModal] = useState(false);
    const [openChiTietCongViecModal, setOpenChiTietCongViecModal] = useState(false);
    const [congViecUp, setCongViecUp] = useState(congViecUtil.getCongViecThem());
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
    }, [searchParams]);
    function reloadList(click) {
        if (click != undefined) {
            setChiBoSelected()
        }
        setLoading(true);
        setSearchKeyword('')
        setCheckedKeys([])
        setListCongViec([])
        setListCongViecMD([])
        function renderResponse(response) {
            if (isMounted) {
                if (response.data != null) {
                    response.data.reverse()
                    setListCongViecALL(response.data);
                    //nếu nhấn reload
                    if (click != undefined) {
                        let data = response.data.filter((v, i) => {
                            const start = limit * (page - 1);
                            const end = start + limit;
                            return i >= start && i < end;
                        });
                        setListCongViec(data);
                        setListCongViecMD(response.data);
                    } else {
                        //kiểm tra tìm theo ID, IDVB
                        if (searchParams.get("id") != null) {
                            let key = searchParams.get("id")
                            response.data.forEach((cv) => {
                                if (cv.id + "" == key) {
                                    setListCongViec((listCongViec) => [...listCongViec, cv])
                                }
                            })
                        } else if (searchParams.get("idVB") != null) {

                            let key = searchParams.get("idVB")
                            response.data.forEach((cv) => {
                                if (cv.vanBan.id + "" == key) {
                                    setListCongViec((listCongViec) => [...listCongViec, cv])
                                }
                            })
                            // Nếu k thì tìm theo select chi bộ
                        } else if (chiBoSelected != undefined && chiBoSelected.id != null) {
                            locTheoChiBo(response.data, chiBoSelected);
                        } else {
                            let data = response.data.filter((v, i) => {
                                const start = limit * (page - 1);
                                const end = start + limit;
                                return i >= start && i < end;
                            });
                            setListCongViec(data);
                            setListCongViecMD(response.data);
                        }
                    }
                    setLoading(false);
                }
            }
        }
        switch (searchParams.get("loai")) {
            case null:
                Services.getCongViecService().getAll().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            case "1":
                Services.getCongViecService().getDangXuLy().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            case "2":
                Services.getCongViecService().getChoDanhGia().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            case "3":
                Services.getCongViecService().getDaXuLy().then(
                    (response) => {
                        renderResponse(response)
                    }
                );
                break;
            default:
                break;
        }

    }
    useEffect(() => {
        let data = listCongViecMD.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        setListCongViec(data);
    }, [page, limit]);
    function locTheoChiBo(dataCV, chiBo) {

        let rs = []
        dataCV.forEach(dv => {
            if (dv.chiBo.id == chiBo.id) {
                rs.push(dv)
            }
        });
        let data = rs.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        setListCongViec(data);
        setListCongViecMD(rs);
    }
    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    if (checkedKeys.length === listCongViec.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < listCongViec.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? listCongViec.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    const handleCapNhatCongViec = (data) => {
        setCongViecUp(data)
        setOpenCongViecModal(true)

    };
    const handleDanhGiaCongViec = () => {
        if (checkedKeys.length == 0) {
            alert("Cần chọn đối tượng để thao tác")
        } else {
            setCongViecUp({ ...congViecUp, listID: checkedKeys })
            setOpenDanhGiaCongViecModal(true)
        }

    };
    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        setCongViecUp({ id: rowData.id })
                        setOpenChiTietCongViecModal(true)
                        break;
                    case 2:
                        setCongViecUp(rowData)
                        setOpenCongViecModal(true)
                        break;
                    case 3:
                        if (window.confirm("Bạn có chắc muốn xóa công việc này")) {
                            Services.getCongViecService().xoa(rowData.id).then(
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
    function timKiem(key) {
        if (key != "") {
            setListCongViec([]);
            listCongViecMD.forEach((cv) => {
                if (cv.ten?.toUpperCase().includes(key.toUpperCase()) || cv.vanBan?.ten?.toUpperCase().includes(key.toUpperCase()) || cv.chiBo?.ten?.toUpperCase().includes(key.toUpperCase())) {
                    setListCongViec((listCongViec) => [...listCongViec, cv])
                }
            })

        } else {
            reloadList();
        }

    }
    return (
        <Container>
            <CongViecModal congViecUp={congViecUp} open={openCongViecModal} setOpen={setOpenCongViecModal} reloadList={reloadList} />
            <DanhGiaCongViecModal congViecUp={congViecUp} open={openDanhGiaCongViecModal} setOpen={setOpenDanhGiaCongViecModal} reloadList={reloadList} />

            <ChiTietCongViecModal congViecID={congViecUp.id} open={openChiTietCongViecModal} setOpen={setOpenChiTietCongViecModal} />
            <Breadcrumb routeSegments={[{ name: "Công việc", path: "/par/chibo" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button color="red" appearance="ghost" className='div-flex' onClick={handleDanhGiaCongViec} title="Đánh giá chung các công việc giống nhau">
                            <Icon className="icon icon-search">star</Icon> Đánh giá chung
                        </Button>

                    </Stack>

                    <Stack spacing={6}>
                        <Button className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                        <SelectPicker style={{ width: 250 }} label="Chi bộ: " data={listCB} onChange={(e) => { setChiBoSelected({ id: e }); locTheoChiBo(listCongViecALL, { id: e }) }} />

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
                <Table virtualized height={550} data={listCongViec} id="table" className='table' loading={loading}>
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

                    <Column width={220} resizable>
                        <HeaderCell>TÊN CÔNG VIỆC</HeaderCell>
                        <Cell dataKey="ten" />
                    </Column>
                    <Column width={150} resizable>
                        <HeaderCell>CHI BỘ THỰC HIỆN</HeaderCell>
                        <Cell dataKey="chiBo.ten" />
                    </Column>
                    <Column width={100} resizable>
                        <HeaderCell>TRẠNG THÁI</HeaderCell>
                        <Cell>{(rowData) => (PhanLoai.getTrangThaiCV(rowData.trangThai))}</Cell>
                    </Column>
                    <Column width={130} resizable>
                        <HeaderCell>THỜI HẠN</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.thoiHan))}</Cell>
                    </Column>
                    <Column width={130} resizable>
                        <HeaderCell>NGÀY HOÀN THÀNH</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.convertDDMMYYYY(rowData.ngayHoanThanh))}</Cell>
                    </Column>
                    <Column width={150} resizable>
                        <HeaderCell>XẾP LOẠI</HeaderCell>
                        <Cell>{(rowData) => (PhanLoai.getXepLoaiCongViec(rowData.phanLoaiDG))}</Cell>
                    </Column>
                    <Column width={220} resizable>
                        <HeaderCell>VĂN BẢN</HeaderCell>
                        <Cell dataKey="vanBan.ten" />
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
                        total={listCongViecMD.length}
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

export default CongViecTable;
