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
export default function ThongKe2Page() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChiBoMD, setListChiBoMD] = useState([]);
    const [listChiBo, setListChiBo] = useState([]);
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const [listData, setListData] = useState([
        { type: 1, value1: "9", value2: "10", value3: "", value0: "I. Tổng số đảng viên mới kết nạp" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "- Nữ" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Người theo tôn giáo" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Đoàn viên Đoàn TNCS Hồ Chí Minh" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "- Chủ doanh nghiệp tư nhân" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Quần chúng vi phạm chính sách KHHGĐ " },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Có quan hệ hôn nhân với người nước ngoài " },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Kết nạp lại" },
        { type: 1, value1: "2", value2: "1", value3: "", value0: "II. Phân tích đảng viên mới kết nạp" },
        { type: 1, value1: "1", value2: "3", value3: "", value0: "1. Nghề nghiệp" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Cán bộ, công chức cơ quan Nhà nước tính từ cấp huyện trở lên" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Cán bộ, công chức cơ quan Đảng, Mặt trận Tổ quốc, đoàn thể chính trị - xã hội tính từ cấp huyện trở lên" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Cán bộ, công chức; người hoạt động không chuyên trách ở xã, phường, thị trấn" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Người hoạt động không chuyên trách thôn, tổ dân phố, bản (ấp, khóm)" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "- Viên chức trong các đơn vị sự nghiệp công lập" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Người lao động trong các đơn vị sự nghiệp ngoài công lập" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Lãnh đạo, quản lý và lao động trong các doanh nghiệp, chia ra:" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "+ Người lãnh đạo, quản lý doanh nghiệp" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "+ Nhân viên, người gián tiếp sản xuất " },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "+ Công nhân, lao động trực tiếp sản xuất " },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Người làm nông, lâm, ngư nghiệp" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Sỹ quan, chiến sỹ quân đội và công an (lực lượng vũ trang)" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Sinh viên" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Học sinh" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "- Khác (lao động hợp đồng, tự do…)" },
        { type: 1, value1: "2", value2: "1", value3: "", value0: "2. Tuổi đời:" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Từ 18 - 30 tuổi" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Từ 36 - 40 tuổi" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Từ 41 - 45 tuổi" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "- Từ 46 - 50 tuổi" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Từ 51 - 55 tuổi" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Từ 56 - 60 tuổi" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Trên 60 tuổi" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Tuổi bình quân" },
        { type: 1, value1: "1", value2: "3", value3: "", value0: "3. Trình độ giáo dục phổ thông" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Biết đọc, biết viết chữ quốc ngữ" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Tiểu học " },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Trung học cơ sở " },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Trung học phổ thông " },
        { type: 1, value1: "1", value2: "3", value3: "", value0: "4. Trình độ chuyên môn nghiệp vụ" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Công nhân kỹ thuật, nhân viên nghiệp vụ, sơ cấp" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Trung cấp" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Cao đẳng" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "- Thạc sỹ" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "- Tiến Sỹ" },
        { type: 1, value1: "2", value2: "1", value3: "", value0: "5. Chức danh khoa học" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "Phó Giáo sư" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "Giáo sư" },
        { type: 1, value1: "2", value2: "1", value3: "", value0: "III. Số tổ chức cơ sở đảng có đến cuối kỳ báo cáo" },
        { type: 1, value1: "1", value2: "3", value3: "", value0: "1. Đảng bộ cơ sở" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "Trong đó: + Có kết nạp đảng viên" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "+ Không còn quần chúng " },
        { type: 1, value1: "2", value2: "1", value3: "", value0: "2. Chi bộ cơ sở" },
        { type: 0, value1: "2", value2: "1", value3: "", value0: "Trong đó: + Có kết nạp đảng viên" },
        { type: 0, value1: "1", value2: "3", value3: "", value0: "+ Không còn quần chúng " },

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
                        <h3 className='tieude-tt red'>THỐNG KÊ ĐẢNG VIÊN MỚI KẾT NẠP NĂM</h3>
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


