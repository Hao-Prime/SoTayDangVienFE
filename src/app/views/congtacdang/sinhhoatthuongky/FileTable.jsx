import React, { useEffect, useState } from 'react';
import { Icon } from '@mui/material';
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
import MoreIcon from '@rsuite/icons/legacy/More';


export default function FileTable({ }) {
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [listFile, setlistFile] = useState([
        { "value1": 1, value1: "Tài liệu", value2: "DT", },
        { "value1": 1, value1: "Tài liệu", value2: "ST", }
    ]);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const renderMenu = ({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
                onClose(true)
                switch (eventKey) {
                    case 1:
                        // setDangVienUp({ id: rowData.id })
                        // setOpenChiTietDangVienModal(true)

                        break;
                    case 2:

                        break;

                    case 4:

                        break;
                    default:
                        break;
                }
            };
            return (
                <Popover ref={ref} className={className} style={{ left, top }} >
                    <Dropdown.Menu onSelect={handleSelect}>
                        {/* <Dropdown.Item eventKey={1}>Xem chi tiết</Dropdown.Item> */}
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
    return (
        <div>
            <Button color="red" appearance="primary" className='div-flex' size="xs">
                <Icon className="icon icon-search">add</Icon> Thêm mới
            </Button>
            <Table autoHeight={true} data={listFile} id="table" className='table' loading={false} bordered={true} headerHeight={38} rowHeight={38} shouldUpdateScroll={false}>

                <Column width={45} align="center" verticalAlign="middle">
                    <CustomHeaderCell2>STT</CustomHeaderCell2>
                    <CustomCell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</CustomCell>
                </Column>
                <Column minWidth={250} flexGrow={1} verticalAlign="middle" align="center">
                    <CustomHeaderCell2 >Tên</CustomHeaderCell2>
                    <CustomCell dataKey="value2" />
                </Column>

                <Column width={150} resizable align="center">
                    <CustomHeaderCell2 >Loại</CustomHeaderCell2>
                    <CustomCell dataKey="value1" />
                </Column>
                <Column minWidth={250} flexGrow={1} align="center" verticalAlign="middle">
                    <CustomHeaderCell2>File đính kèm</CustomHeaderCell2>
                    <CustomCell>{rowData => <p className={"bg-red01"}>{"Xem tệp tin"}</p>}</CustomCell>
                </Column>


                <Column width={80} verticalAlign="middle" fixed={windowScreen ? "right" : false}>
                    <CustomHeaderCell2>
                        Thao tác
                    </CustomHeaderCell2>
                    <ActionCell dataKey="id" />
                </Column>
            </Table>
            <div style={{ padding: "7px" }}>
                <Pagination
                    next
                    first
                    maxButtons={3}
                    size="xs"
                    layout={['-', 'pager']}
                    total={3}
                    limitOptions={[30, 50, 70, 100]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                // onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );
}
