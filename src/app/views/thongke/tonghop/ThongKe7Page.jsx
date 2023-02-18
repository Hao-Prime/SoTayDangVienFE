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
import { Table, Checkbox } from 'rsuite';

import { CheckCell, CustomCell, CustomHeaderCell, CustomHeaderCellCheck, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';
export default function ThongKe7Page() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const [listData, setListData] = useState([
        { type: 1, value1: "0", value0: "1. Số có mặt đến thời điểm KĐ, ĐG, XL chất lượng (1= 2+3+4)" },
        { type: 1, value1: "0", value0: "2. Số được miễn KĐ, ĐG, XL chất lượng" },
        { type: 1, value1: "0", value0: "3. Số chưa được KĐ, ĐG, XL chất lượng" },
        { type: 1, value1: "0", value0: "4. Số đã KĐ, ĐG, XL chất lượng" },
        { type: 0, value1: "0", value0: "Đảng viên HTXSNV" },
        { type: 0, value1: "0", value0: "Đảng viên HTTNV" },
        { type: 0, value1: "0", value0: "Đảng viên HTNV" },
        { type: 0, value1: "0", value0: "Đảng viên không HTNV" },
        { type: 0, value1: "0", value0: "Trong đó: -Cấp có thẩm quyền kết luận có biểu hiện suy thoái" },
        { type: 0, value1: "0", value0: "- Chỉ hoàn  thành dưới  50% số chỉ tiêu" },
        { type: 0, value1: "0", value0: "- Đảng viên là công chức,viên chức xếp loại KHTNV" },
        { type: 0, value1: "0", value0: "- Bị xử lý kỷ luật trong năm" },
        { type: 0, value1: "0", value0: "- Khác" },





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
                        <h3 className='tieude-tt red'>THỐNG KÊ KIỂM ĐIỂM, ĐÁNH GIÁ, XẾP LOẠI CHẤT LƯỢNG ĐẢNG VIÊN</h3>
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
                <Table height={570} data={listData} headerHeight={150} id="table " className='table table-thongke-cus-2 ' loading={false} bordered={true} cellBordered={true} rowHeight={25} shouldUpdateScroll={false}>


                    <Column width={320} fixed>
                        <CustomHeaderCell align={"center"} >Tiêu chí</CustomHeaderCell>
                        <CustomCell>{(rowData) => (<span className={rowData.type == 1 ? "bold" : "padl-1"}>{rowData.value0}</span>)}</CustomCell>
                    </Column>
                    <Column width={100}>
                        <CustomHeaderCell align={"center"}>Tổng số</CustomHeaderCell>
                        <CustomCell align={"center"} >{(rowData) => (~~(rowData.value1 * 100 / rowData.value2))}</CustomCell>

                    </Column>
                    <Column width={90}>
                        <CustomHeaderCell align={"center"}>Xã (4)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <Column width={90} resizable>
                        <CustomHeaderCell align={"center"}>Phường (5)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <Column width={90} resizable>
                        <CustomHeaderCell align={"center"}>Thị trấn(6)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <Column width={90}>
                        <CustomHeaderCell align={"center"}>Cơ quan Đảng, MTTQ, tổ chức CT-XH (7)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <Column width={90} resizable>
                        <CustomHeaderCell align={"center"}>Cơ quan Nhà nước (8)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>

                    <ColumnGroup header="Đơn vị sự nghiệp" align={"center"} groupHeaderHeight={35} >
                        <Column width={90} >
                            <CustomHeaderCell align={"center"}>Tổng số (9)</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90}>
                            <CustomHeaderCell align={"center"}>Công lập</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}>Ngoài công lập</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                    </ColumnGroup>


                    <Column width={90} resizable>
                        <CustomHeaderCell align={"center"}>Quân đội (12)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <Column width={90}>
                        <CustomHeaderCell align={"center"}>Công an (13)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <ColumnGroup header="Doanh nghiệp và Hợp tác xã" align={"center"} groupHeaderHeight={35} >
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}>Tổng số (14)</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}>Tổng số</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>


                        <ColumnGroup header="Doanh nghiệp và Hợp tác xã" align={"center"} groupHeaderHeight={35} >
                            <Column width={90}>
                                <CustomHeaderCell align={"center"}><span className='gray05'>Nắm giữ 100% vốn điều lệ</span></CustomHeaderCell>
                                <CustomCell dataKey="value1" align={"center"} />
                            </Column>
                            <Column width={90} resizable>
                                <CustomHeaderCell align={"center"}><span className='gray05'>Nắm giữ từ 50% vốn điều lệ trở lên</span></CustomHeaderCell>
                                <CustomCell dataKey="value1" align={"center"} />
                            </Column>
                            <Column width={90} resizable>
                                <CustomHeaderCell align={"center"}><span className='gray05'>Nắm giữ dưới 50% vốn điều lệ</span></CustomHeaderCell>
                                <CustomCell dataKey="value1" align={"center"} />
                            </Column>
                        </ColumnGroup>




                        <Column width={90}>
                            <CustomHeaderCell align={"center"}>Tổng số </CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}><span className='gray02'>CTCP</span></CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}><span className='gray02'>CTTNHH</span></CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90}>
                            <CustomHeaderCell align={"center"}><span className='gray02'>CT Hợp danh</span></CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}>Tổng số</CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90} resizable>
                            <CustomHeaderCell align={"center"}><span className='gray03'>Trđó: 100% vốn NN</span></CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                        <Column width={90}>
                            <CustomHeaderCell align={"center"}><span className='gray04'>HTXM</span></CustomHeaderCell>
                            <CustomCell dataKey="value1" align={"center"} />
                        </Column>
                    </ColumnGroup>
                    <Column width={90} resizable>
                        <CustomHeaderCell align={"center"}>Tổ chức đảng ở ngoài nước (27)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>
                    <Column width={90} resizable>
                        <CustomHeaderCell align={"center"}>Cơ sở khác (28)</CustomHeaderCell>
                        <CustomCell dataKey="value1" align={"center"} />
                    </Column>




                </Table>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};


