import { useEffect, useState } from 'react';
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import Services from 'app/services';
import chiBoUtil from 'app/utils/modules/ChiBo';
import FormatDate from 'app/common/FormatDate';
import PhanLoai from 'app/common/PhanLoai';

const { Column, HeaderCell, Cell } = Table;
const Container = styled("div")(({ theme }) => ({
    margin: "20px 20px 5px 20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "20px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const CompactCell = props => <Cell {...props} style={{ padding: 7 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 7 }} />;

const BaoCaoKetQuaDanhGiaTable = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listDV, setListDV] = useState([]);
    const [listDangVienXSMD, setlistDangVienXSMD] = useState([]);
    const [listIDSearch, setListIDSearch] = useState([]);
    const [soLuong, setSoLuong] = useState();
    const [listNamDanhGia, setListNamDanhGia] = useState([]);
    const [namXepLoai, setNamXepLoai] = useState(FormatDate.getNgayHienTai().substring(0, 4));
    const CustomCell = CompactCell;
    const CustomHeaderCell = CompactHeaderCell;
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        return () => { isMounted = false; };
    }, [namXepLoai]);
    function reloadList(click) {
        setLoading(true);
        setSearchKeyword('')
        Services.getThongKeService().getBaoCaoKetQuaDanhGia(namXepLoai).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setSoLuong(response.data);

                    }
                }
            }
        );
        let listNam = FormatDate.exportArrayYear("2016-01-01", FormatDate.thayDoiSoNgay(FormatDate.getNgayGioHienTai(), 365))
        listNam.reverse()
        let rs = []
        listNam.forEach(nam => {
            rs.push({
                key: nam,
                label: nam,
                width: 200,
                danhGia: true,
            })

        });

        setListNamDanhGia(rs)
    }

    function timKiem(key) {
        if (key != "") {
            setListIDSearch([])
            listDV.forEach((dv) => {
                if (dv.hoTen?.toUpperCase().includes(key.toUpperCase())) {
                    setListIDSearch((list) => [...list, dv.id])
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

                    </Stack>

                    <Stack spacing={6}>
                        <Button className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                        <Dropdown title={"Xếp loại năm " + namXepLoai} placement="bottomEnd" onSelect={(eventKey) => setNamXepLoai(eventKey)}>
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

                    </Stack>
                </Stack>
                <div style={{ height: "620px" }}>
                    <div>
                        <h2 style={{ textAlign: "center" }}><b>BÁO CÁO</b></h2>
                        <p style={{ textAlign: "center" }}><b>Kết quả đánh giá chất lượng đảng viên năm  <span className='red'>{namXepLoai}</span></b></p>
                        <div style={{ paddingLeft: "35px" }}>
                            <br />
                            <p><b>1. Tổng số đảng viên hiện có đến thời điểm đánh giá chất lượng:</b></p>
                            <p>Đảng viên chính thức: <b className='red'>{soLuong?.soLuongDangVienChinhThuc}</b>, đảng viên dự bị: <b className='red'>{soLuong?.soLuongDangVienDuBi}</b></p>
                            <br />
                            <p><b>2. Đảng viên thuộc diện không đánh giá chất lượng: <b className='red'>{soLuong?.soLuongKhongDanhGia}</b> trong đó:</b></p>
                            <p>+ Được miễn công tác, miễn sinh hoạt Đảng: <b className='red'>{soLuong?.soLuongMienCongTac}</b></p>
                            <p>+ Đảng viên dự bị chưa đủ 6 tháng: <b className='red'>{soLuong?.soLuongDuBiChuaDuSauThang}</b></p>
                            <br />
                            <p><b>3. Đảng viên thuộc diện đánh giá chất lượng: <b className='red'>{soLuong?.soLuongDanhGia}</b> trong đó:</b></p>
                            <p>+ Đã đánh giá: <b className='red'>{soLuong?.soLuongDaDanhGia}</b></p>
                            <p>+ Chưa đánh giá: <b className='red'>{soLuong?.soLuongChuaDanhGia}</b></p>
                            <br />
                            <p><b>4. Kết quả đánh giá phân loại:</b></p>
                            <p><b><i>+ Đảng viên hoàn thành xuất sắc nhiệm vụ: </i><span className='red'>{soLuong?.soLuongHTXSNV}</span></b></p>
                            <p><b><i>+ Đảng viên hoàn thành tốt nhiệm vụ: </i><span className='red'>{soLuong?.soLuongHTTNV}</span></b></p>
                            <p><b><i>+ Đảng viên hoàn thành nhiệm vụ: </i><span className='red'>{soLuong?.soLuongHTNV}</span></b>, trong đó còn hạn chế từng mặt:</p>
                            <div style={{ paddingLeft: "20px" }}>
                                <p>a. Chưa tận tụy công việc: <b className='red'>{soLuong?.soLuongHTNV1}</b></p>
                                <p>b. Có khuyết điểm nhưng chưa đến mức kỷ luật: <b className='red'>{soLuong?.soLuongHTNV2}</b></p>
                                <p>c. Lãnh đạo đơn vị chưa hoàn thành nhiệm vụ: <b className='red'>{soLuong?.soLuongHTNV3}</b></p>

                            </div>
                            <p><b><i>+ Đảng viên không hoàn thành nhiệm vụ: </i><span className='red'>{soLuong?.soLuongKHTNV}</span></b>, trong đó:</p>

                            <div style={{ paddingLeft: "20px" }}>
                                <p>a. Là đảng viên đang chấp hành kỹ luật Đảng, chính quyền, đoàn thể trong 01 năm: <b className='red'>{soLuong?.soLuongKHTNV1}</b></p>
                                <p>b. Không hoàn thành nhiệm vụ chi bộ giao: <b className='red'>{soLuong?.soLuongKHTNV2}</b></p>
                                <p>c. Phân loại cán bộ công chức viên chức ở mức không hoàn thành nhiệm vụ: <b className='red'>{soLuong?.soLuongKHTNV3}</b></p>
                                <p>d. Vi phạm quy định về những điều đảng viên không được làm hoặc vi phạm khác ảnh hưởng đến ủy tín của tổ chức đảng và vị trí công tác của đảng viên đó: <b className='red'>{soLuong?.soLuongKHTNV4}</b></p>
                                <p>đ. Không chấp hành sự phân công của tổ chức hoặc là nguyên nhân gây mất đoàn kết: <b className='red'>{soLuong?.soLuongKHTNV5}</b></p>

                            </div>

                        </div>



                    </div>
                </div>

                <div style={{ padding: "10px" }}>

                </div>
            </SimpleCard>
        </Container >
    );
};

export default BaoCaoKetQuaDanhGiaTable;
