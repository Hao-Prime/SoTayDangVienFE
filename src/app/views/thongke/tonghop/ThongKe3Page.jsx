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
export default function ThongKe3Page() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const [listData, setListData] = useState([
        { type: 1, value1: "201", value2: "54", value3: "", value11: "0", value21: "5", value31: "", value0: "I. Đảng viên chia theo dân tộc", value01: "Kháng" },
        { type: 0, value1: "201", value2: "54", value3: "", value11: "0", value21: "7", value31: "", value0: "Kinh ", value01: "Xinh Mun" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Tày", value01: "Hà Nhì" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Thái", value01: "Chu Ru" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Hoa", value01: "Lào" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Khơ - me", value01: "La Chí" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Mường", value01: "La Ha" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Nùng", value01: "Phù Lá" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Mông", value01: "La Hủ" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Dao", value01: "Lự" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Gia Rai", value01: "Lô Lô" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Ê - đê", value01: "Chứt" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Ngái", value01: "Mảng" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Ba - Na", value01: "Pà Thẻn" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Xơ - Đăng", value01: "Cơ Lao" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Sán Chay", value01: "Cống" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Cơ Ho", value01: "Bố Y" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Chăm", value01: "Si La" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Sán Dìu", value01: "Pu Péo" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "HRê", value01: "B Râu" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "M.Nông", value01: "Ơ Đu" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Raglai", value01: "Rơ - Măm" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "XTiêng", value01: "Dân tộc khác" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Bru - Vân Kiều", value01: "Q.tịch gốc nước ngoài" },
        { type1: 1, value1: "0", value2: "0", value3: "", value11: "201", value21: "57", value31: "", value0: "Thổ", value01: "II. Đảng viên chia theo tôn giáo" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "201", value21: "201", value31: "", value0: "Giáy", value01: "Phật giáo" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Cơ Tu", value01: "Công giáo" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Giẻ Triêng", value01: "Phật giáo Hòa Hảo" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Mạ", value01: "Cao Đài" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Khơ Mú", value01: "Tin Lành" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Co", value01: "Hồi giáo" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Tà Ôi", value01: "Đạo khác" },
        { type: 0, value1: "0", value2: "0", value3: "", value11: "0", value21: "0", value31: "", value0: "Chơ - Ro", value01: "" },



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
                        <h3 className='tieude-tt red'>ĐẢNG VIÊN MỚI KẾT NẠP </h3>
                        <b>Chia theo dân tộc và tôn giáo</b>
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
                <Table autoHeight={true} data={listData} headerHeight={105} id="table " className='table table-thongke-cus ' loading={false} bordered={true} cellBordered={true} rowHeight={25} shouldUpdateScroll={false}>

                    <Column width={45} align="center" >
                        <CustomHeaderCell>TT</CustomHeaderCell>
                        <CustomCell>{(rowData, rowIndex) => (rowIndex + 1)}</CustomCell>
                    </Column>
                    <Column minWidth={150} flexGrow={1}>
                        <CustomHeaderCell align={"center"}>Tên dân tộc, tôn giáo</CustomHeaderCell>
                        <CustomCell>{(rowData) => (<span className={rowData.type == 1 ? "bold" : "padl-1"}>{rowData.value0}</span>)}</CustomCell>
                    </Column>
                    <ColumnGroup header="Đảng viên chia theo dân tộc, tôn giáo" align={"center"} resizable groupHeaderHeight={60}>
                        <Column width={120}>
                            <CustomHeaderCell align={"center"}>Tổng số</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={120} resizable>
                            <CustomHeaderCell align={"center"}>Trong đó: nữ</CustomHeaderCell>
                            <CustomCell dataKey="value2" align={"center"} />
                        </Column>
                    </ColumnGroup>
                    <Column width={100}>
                        <CustomHeaderCell align={"center"}>Tỷ lệ (%)</CustomHeaderCell>
                        <CustomCell align={"center"} >{(rowData) => (~~(rowData.value2 * 100 / rowData.value1))}</CustomCell>
                    </Column>


                    <Column width={45} align="center" >
                        <CustomHeaderCell>TT</CustomHeaderCell>
                        <CustomCell>{(rowData, rowIndex) => (rowIndex + 1 + listData.length)}</CustomCell>
                    </Column>
                    <Column minWidth={150} flexGrow={1}>
                        <CustomHeaderCell align={"center"}>Tên dân tộc, tôn giáo</CustomHeaderCell>
                        <CustomCell>{(rowData) => (<span className={rowData.type1 == 1 ? "bold" : "padl-1"}>{rowData.value01}</span>)}</CustomCell>
                    </Column>
                    <ColumnGroup header="Đảng viên chia theo dân tộc, tôn giáo" align={"center"} resizable groupHeaderHeight={60}>
                        <Column width={120}>
                            <CustomHeaderCell align={"center"}>Tổng số</CustomHeaderCell>
                            <CustomCell dataKey="value11" align={"center"} />
                        </Column>
                        <Column width={120} resizable>
                            <CustomHeaderCell align={"center"}>Trong đó: nữ</CustomHeaderCell>
                            <CustomCell dataKey="value21" align={"center"} />
                        </Column>
                    </ColumnGroup>
                    <Column width={100}>
                        <CustomHeaderCell align={"center"}>Tỷ lệ (%)</CustomHeaderCell>
                        <CustomCell align={"center"} >{(rowData) => (~~(rowData.value21 * 100 / rowData.value11))}</CustomCell>
                    </Column>

                </Table>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};


