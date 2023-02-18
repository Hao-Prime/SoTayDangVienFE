import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Dropdown } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import Services from 'app/services';
import chiBoUtil from 'app/utils/modules/ChiBo';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';

import { CheckCell, Table, CustomCell, CustomHeaderCell, CustomHeaderCellCheck, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
export default function ThongKe1Page() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const [listData, setListData] = useState([
        { type: 1, value0: "A - Tổng số đảng viên cuối kỳ trước chuyển sang", value1: "9", value2: "10", value3: "" },
        { type: 1, value0: "B - Đảng viên tăng trong kỳ", value1: "5", value2: "5", value3: "" },
        { type: 0, value0: "1. Kết nạp", value1: "3", value2: "7", value3: "" },
        { type: 0, value0: "2. Chuyển đến", value1: "2", value2: "5", value3: "" },
        { type: 0, value0: "a. Tỉnh khác chuyển đến", value1: "3", value2: "7", value3: "" },
        { type: 0, value0: "b. Huyện khác trong tỉnh chuyển đến", value1: "2", value2: "5", value3: "" },
        { type: 0, value0: "3. Phục hồi đảng tịch", value1: "0", value2: "0", value3: "" },
        { type: 1, value0: "C - Đảng viên giảm trong kỳ", value1: "0", value2: "0", value3: "" },
        { type: 0, value0: "1. Từ trần", value1: "0", value2: "0", value3: "" },
        { type: 0, value0: "2. Khai trừ", value1: "0", value2: "0", value3: "" },
        { type: 0, value0: "3. Xóa tên", value1: "0", value2: "0", value3: "" },
        { type: 0, value0: "Trong đó: Đảng viên dự bị", value1: "5", value2: "7", value3: "" },
        { type: 0, value0: "4. Xin ra khỏi Đảng", value1: "0", value2: "0", value3: "" },
        { type: 0, value0: "5. Chuyển đi", value1: "7", value2: "4", value3: "" },
        { type: 0, value0: "a. Chuyển đi tỉnh khác", value1: "12", value2: "4", value3: "" },
        { type: 0, value0: "b. Chuyển đi huyện khác trong tỉnh", value1: "4", value2: "3", value3: "" },
        { type: 1, value0: "D - Đảng viên trong danh sách cuối kỳ báo cáo", value1: "5", value2: "8", value3: "" }
    ]);
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        return () => { isMounted = false; };
    }, []);
    function reloadList(click) {
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
    return (
        <Container>

            <Breadcrumb routeSegments={[{ name: "Thống kê", path: "/par/chibo" }]} />
            <SimpleCard >

                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>
                        <h3 className='tieude-tt red'>THỐNG KÊ TĂNG GIẢM ĐẢNG VIÊN NĂM</h3>
                        <Dropdown title={namXepLoai} placement="bottomEnd" onSelect={(eventKey) => setNamXepLoai(eventKey)}>
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
                        <Button className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                    </Stack>

                    <Stack spacing={6}>

                        {/* <InputGroup inside>
                            <Input placeholder="Tìm kiếm" value={searchKeyword} onChange={setSearchKeyword}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        timKiem(searchKeyword);
                                    }
                                }} />
                            <InputGroup.Addon>
                                <Icon className="icon icon-search">search</Icon>
                            </InputGroup.Addon>
                        </InputGroup> */}

                    </Stack>
                </Stack>
                <Table autoHeight={true} data={listData} headerHeight={70} id="table " className='table table-thongke-cus ' loading={false} bordered={true} cellBordered={true} rowHeight={25} shouldUpdateScroll={false}>
                    <Column minWidth={360} flexGrow={1}>
                        <CustomHeaderCell align={"center"}>Tiêu chí</CustomHeaderCell>
                        <CustomCell>{(rowData) => (<span className={rowData.type == 1 ? "bold" : "padl-1"}>{rowData.value0}</span>)}</CustomCell>
                    </Column>
                    <ColumnGroup header="Thực hiện" align={"center"} resizable groupHeaderHeight={35} >
                        <Column width={200}>
                            <CustomHeaderCell align={"center"}>Kỳ này (2)</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={200} resizable>
                            <CustomHeaderCell align={"center"}>Cùng kỳ năm trước (3)</CustomHeaderCell>
                            <CustomCell dataKey="value2" align={"center"} />
                        </Column>
                    </ColumnGroup>
                    <Column width={200}>
                        <CustomHeaderCell align={"center"}>(%) kỳ này so với cùng kỳ năm trước 4(=2*100/3)</CustomHeaderCell>
                        <CustomCell align={"center"} >{(rowData) => (~~(rowData.value1 * 100 / rowData.value2))}</CustomCell>

                    </Column>


                </Table>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};


