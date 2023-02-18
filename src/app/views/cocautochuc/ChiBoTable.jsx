import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import { Paragraph } from 'app/components/Typography';
import ChiBoModal from './ChiBoModal';
import Services from 'app/services';
import chiBoUtil from 'app/utils/modules/ChiBo';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';
import ChiTietChiBoModal from './ChiTietChiBoModal';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import { CheckCell, Table, CustomCell, CustomCell2, CustomHeaderCell2, CustomHeaderCellCheck, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
const ChiBoTable = () => {
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    let checked = false;
    let indeterminate = false;
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBoSelect, setListChiBoSelect] = useState([]);
    const [limit, setLimit] = useState(10);
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
            <CustomCell2 {...props} className="link-group">
                <Whisper placement="auto" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon />} style={{ height: 10, padding: '3px 10px 20px' }} />
                </Whisper>
            </CustomCell2>
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
            <CustomCell2 {...props} className="link-group">
                <p>{searchRate()}</p>
            </CustomCell2>
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
        <>
            <ChiBoModal chiBoUp={chiBoUp} open={openChiBoModal} setOpen={setOpenChiBoModal} reloadList={reloadList} />
            <ChiTietChiBoModal chiBoID={chiBoUp.id} open={openChiTietChiBoModal} setOpen={setOpenChiTietChiBoModal} />
            <div className='cctc-simplesard'>
                {/* <div className='form-table'> */}
                <p style={{ marginBottom: "10px" }}><b>Danh sách cơ sở Đảng trực thuộc</b></p>
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <Button appearance="primary" className='div-flex' size="sm" onClick={handleThemChiBo}>
                            <Icon className="icon icon-search">add</Icon> Thêm mới
                        </Button>
                        <Button className='div-flex' size="sm" onClick={handleThemChiBo}>
                            <FileUploadIcon className="icon icon-search-2" /> Nhập đơn vị
                        </Button>
                        <InputGroup inside size="sm">
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

                    <Stack spacing={6}>
                        <Paragraph className='td-right'>Tổng số:</Paragraph>
                        <Paragraph className='red border-input'><b>15</b></Paragraph>
                    </Stack>
                </Stack>
                <Table height={400} data={listChiBo} id="table-x" className='table table-pointer' loading={loading} headerHeight={38} rowHeight={38} shouldUpdateScroll={false}>

                    <Column width={50} align="center" >
                        <CustomHeaderCell2>STT</CustomHeaderCell2>
                        <CustomCell2>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell2>
                    </Column>
                    <Column width={360} resizable>
                        <CustomHeaderCell2>Tên cơ sở Đảng</CustomHeaderCell2>
                        <CustomCell2 dataKey="ten" />
                    </Column>

                    <Column width={130} resizable>
                        <CustomHeaderCell2>Loại cơ sở Đảng</CustomHeaderCell2>
                        <CustomCell2 align="center">{"Chi bộ"}</CustomCell2>
                    </Column>
                    <Column width={180} resizable>
                        <CustomHeaderCell2>Loại hình cơ sở Đảng</CustomHeaderCell2>
                        <CustomCell2 align="center">{"Doanh nghiệp nhà nước"}</CustomCell2>
                    </Column>
                    <Column width={130} resizable>
                        <CustomHeaderCell2 align="center">Số điện thoại</CustomHeaderCell2>
                        <CustomCell2>{ }</CustomCell2>
                    </Column>
                    <Column width={250} resizable>
                        <CustomHeaderCell2 align="center">Địa chỉ</CustomHeaderCell2>
                        <CustomCell2>{"36 Võ Công Tồn P1 Tp Tân An tỉnh Long An"}</CustomCell2>
                    </Column>



                    <Column width={60} fixed={windowScreen ? "right" : false}>
                        <CustomHeaderCell2>
                            {/* <MoreIcon /> */}
                        </CustomHeaderCell2>
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
            </div>
        </ >
    );
};

export default ChiBoTable;
