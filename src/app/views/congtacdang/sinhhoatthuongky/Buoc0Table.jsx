import { useEffect, useState } from 'react';
import { Icon } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import { NavLink } from 'react-router-dom';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
export default function Buoc0Table() {
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(false);
    const [listDangVien, setListDangVien] = useState([
        { value1: 0, value3: "Bước 1: Chuẩn bị tài liệu họp", value2: "Đã thực hiện", value4: "/quanly/congtacdamg/shthuongky/buoc1" },
        { value1: 1, value3: "Bước 2: Tiếp nhận ý kiến kiến nghị", value2: "Không có kiến nghị", value4: "/quanly/congtacdamg/shthuongky/buoc2" },
        { value1: 1, value3: "Bước 3: Diễn biến cuộc họp", value2: "Chưa hoàn thiện", value4: "/quanly/congtacdamg/shthuongky/buoc31" },
        { value1: 1, value3: "Bước 4: Ra nghị quyết", value2: "Không có nghị quyết nào được ban hành", value4: "/quanly/congtacdamg/shthuongky/buoc4" },
        { value1: 1, value3: "Bước 5: Theo dõi nhiệm vụ", value2: "Không có nhiệm vụ được giao", value4: "/quanly/congtacdamg/shthuongky/buoc5" },
    ]);
    var isMounted = true;
    useEffect(() => {
        isMounted = true;


        return () => { isMounted = false; };
    }, []);
    return (
        <Container>

            <Breadcrumb routeSegments={[{ name: "Sinh hoạt thường kỳ", path: "/par/dangvien" }]} />
            <SimpleCard >
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <NavLink to="/quanly/congtacdamg/shthuongky" ><Icon className="icon icon-search pointer ">arrow_back</Icon></NavLink>
                        <p style={{ marginBottom: "5px" }}><b> Sinh hoạt Chi bộ III - Khối văn phòng tháng 2/2023</b></p>
                    </Stack>
                    <Stack spacing={6}>
                    </Stack>
                </Stack>
                <Table autoHeight={true} data={listDangVien} id="table" className='table' loading={loading} headerHeight={38} rowHeight={45} shouldUpdateScroll={false}>
                    <Column width={80} align="center" verticalAlign="middle">
                        <CustomHeaderCell2>STT</CustomHeaderCell2>
                        <CustomCell>{(rowData, rowIndex) => ((rowIndex + 1))}</CustomCell>
                    </Column>
                    <Column minWidth={250} flexGrow={1} verticalAlign="middle">
                        <CustomHeaderCell2 align="center">Nội dung</CustomHeaderCell2>

                        <CustomCell>{rowData => <NavLink className="pointer" to={rowData.value4}><b>{rowData.value3}</b></NavLink>}</CustomCell>
                    </Column>
                    <Column width={200} flexGrow={1} verticalAlign="middle" align="center">
                        <CustomHeaderCell2>Trạng thái</CustomHeaderCell2>
                        <CustomCell>{rowData => <span className={"bg-timx" + rowData.value1}>{rowData.value2}</span>}</CustomCell>
                    </Column>

                </Table>
                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};

