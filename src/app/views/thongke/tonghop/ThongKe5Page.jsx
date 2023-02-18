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
export default function ThongKe5Page() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const [listData, setListData] = useState([
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "1. Xã" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "1. Phường" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "1. Thị trấn" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "4. Cơ quan Đảng, MTTQ, đoàn thể CT-XH" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "5. Cơ quan Nhà nước" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "6. Đơn vị sự nghiệp, gồm:" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "a) Công lập" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "b) Ngoài công lập" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "7. Quân đội" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "8. Công an" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "9. Doanh nghiệp và hợp tác xã" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "a) Doanh nghiệp có vốn Nhà nước" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Nhà nước nắm giữ 100% vốn điều lệ" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Nhà nước nắm giữ từ 50% vốn điều lệ trở lên" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Nhà nước nắm giữ dưới 50% vốn điều lệ" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "b) Doanh nghiệp ngoài khu vực Nhà nước" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Công ty Cổ phần" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Doanh nghiệp tư nhân" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Công ty trách nhiệm hữu hạn" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Công ty hợp danh" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "- Doanh nghiệp có vốn nước ngoài" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "Trong đó: Doanh nghiệp 100% vốn NN" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "c) Hợp tác xã" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "10. Tổ chức cơ sở đảng ở ngoài nước" },
        { type: 1, value1: "0", value2: "0", value3: "0", value4: "0", value0: "11. Loại hình cơ sở khác*" },
        { type: 0, value1: "0", value2: "0", value3: "0", value4: "0", value0: "Cộng (1+….+11)" }

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
                        <h3 className='tieude-tt red'>THỐNG KÊ TỔ CHỨC ĐẢNG VÀ ĐẢNG VIÊN TRONG CÁC LOẠI HÌNH CƠ SỞ</h3>
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
                <Table autoHeight={true} data={listData} headerHeight={110} id="table " className='table table-thongke-cus ' loading={false} bordered={true} cellBordered={true} rowHeight={25} shouldUpdateScroll={false}>
                    <Column minWidth={200} flexGrow={1}>
                        <CustomHeaderCell align={"center"}>Loại hình tổ chức cơ sở đảng</CustomHeaderCell>
                        <CustomCell>{(rowData) => (<span className={rowData.type == 1 ? "bold" : "padl-1"}>{rowData.value0}</span>)}</CustomCell>
                    </Column>
                    <ColumnGroup header="Số tổ chức cơ sở đảng" align={"center"} resizable>
                        <Column width={120}>
                            <CustomHeaderCell align={"center"}>Tổng số (2)+(3)</CustomHeaderCell>
                            <CustomCell align={"center"} >{(rowData) => (~~(rowData.value1 + rowData.value2))}</CustomCell>
                        </Column>
                        <ColumnGroup header="Chia ra" align={"center"} resizable>
                            <Column width={120}>
                                <CustomHeaderCell align={"center"}>Đảng bộ cơ sở (2)</CustomHeaderCell>
                                <CustomCell dataKey="value1" align={"center"} />
                            </Column>
                            <Column width={120} resizable>
                                <CustomHeaderCell align={"center"}>Chi bộ cơ sở (3)</CustomHeaderCell>
                                <CustomCell dataKey="value2" align={"center"} />
                            </Column>
                        </ColumnGroup>

                    </ColumnGroup>
                    <ColumnGroup header="Tổ chức đảng trực thuộc Đảng bộ Cơ sở " align={"center"} resizable>
                        <Column width={120}>
                            <CustomHeaderCell align={"center"}>Đảng bộ bộ phận (4)</CustomHeaderCell>
                            <CustomCell dataKey="value3" align={"center"} />
                        </Column>
                        <Column width={120} resizable>
                            <CustomHeaderCell align={"center"}>Chi bộ trực thuộc (5)</CustomHeaderCell>
                            <CustomCell dataKey="value4" align={"center"} />
                        </Column>
                    </ColumnGroup>
                    <Column width={150}>
                        <CustomHeaderCell align={"center"}>Tổng số đảng viên (1)+(3)+(4)</CustomHeaderCell>
                        <CustomCell align={"center"} >{(rowData) => (~~(rowData.value1 + rowData.value2 + rowData.value3 + rowData.value4))}</CustomCell>

                    </Column>


                </Table>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};


