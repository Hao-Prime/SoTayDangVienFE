import { useEffect, useState } from 'react';

import {
    Icon,
    Card,
    Grid,
    Avatar,
    useTheme,
} from '@mui/material';
import Chart from 'react-apexcharts';
import avatar from "app/assets/images/logouser.png"
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite'
const ThongKeDangVienSuDung = () => {
    const [barChartValue2, setBarChartValue2] = useState({
        series: [{
            name: 'Số lượng ',
            data: [31, 40, 28, 51, 42, 22, 99, 31, 23, 28, 51, 42, 31, 40, 28, 51, 42, 130, 51, 31, 40, 28, 51, 42]
        }]
        , type: "area",

        options: {
            chart: {
                height: 350,
                type: 'area'

            },
            stroke: {
                width: 1

            },
            dataLabels: {
                enabled: false,

            },
            labels: [
                "2022-02-10",
                "2022-02-11",
                "2022-02-12",
                "2022-02-13",
                "2022-02-14",
                "2022-02-15",
                "2022-02-16",
                "2022-02-17",
                "2022-02-18",
                "2022-02-19",
                "2022-02-20",
                "2022-02-21",
                "2022-02-10",
                "2022-02-11",
                "2022-02-12",
                "2022-02-13",
                "2022-02-14",
                "2022-02-15",
                "2022-02-16",
                "2022-02-17",
                "2022-02-18",
                "2022-02-19",
                "2022-02-20",
                "2022-02-21"],

        }


    });
    const data2 = ['Năm 2023', 'Năm 2022', 'Năm 2021'].map(
        item => ({ label: item, value: item })
    );
    const data = ['Huỳnh Chí Tường', 'Trần Hoàng Sơn', 'Huỳnh Quang Cường', "Nguyễn Thanh Khiêm"].map(
        item => ({ label: item, value: item })
    );
    return (
        <Card elevation={3} sx={{ pt: '20px', pb: '20px', pl: "10px" }}>
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12} >
                    <div className="ps-3" >
                        <div className="ps-3" >
                            <p className='p-2'><b>Thống kê theo thời gian</b></p>
                            <p><span className="ant-badge-status-dot ant-badge-status-blue me-2"></span>Trong 1 phút vừa qua: 0 người dùng</p>
                            <p><span className="ant-badge-status-dot ant-badge-status-green me-2"></span>Trong 1 giờ vừa qua: 1 người dùng</p>
                            <p><span className="ant-badge-status-dot ant-badge-status-red me-2"></span>Trong 1 ngày vừa qua: 3 người dùng</p>
                        </div>

                        <Chart {...barChartValue2} height="400px" />
                    </div>

                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: '20px' }}>
                    <p className='pb-2 pt-2 '><b>Sử dụng nhiều nhất</b></p>
                    <Grid container spacing={1} className="form-cus-36">

                        <Grid item lg={6} md={6} sm={6} xs={6} >
                            <SelectPicker size="sm" searchable={false} data={[{ value: "Theo ngày", label: "Theo ngày" }, { value: "Theo giờ", label: "Theo giờ" }]} placeholder="Theo ngày" cleanable={false} style={{ width: "100%" }} />

                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} >
                            <SelectPicker size="sm" searchable={false} data={[{ value: "1", label: "12 tiếng" }, { value: "Theo giờ", label: "24 tiếng " }]} placeholder="12 tiếng" cleanable={false} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} >
                            <SelectPicker size="sm" searchable={false} data={[{ value: "1", label: "20 người" }, { value: "Theo giờ", label: "50 người" }]} placeholder="20 người" cleanable={false} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3} >
                            <Button disabled appearance="ghost" className='div-flex t-center' size="sm" style={{ width: "100%", justifyContent: "space-around" }} >
                                <Icon className="icon icon-search">refresh</Icon>
                            </Button>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3} >
                            <Button appearance="ghost" className='div-flex t-center' size="sm" style={{ width: "100%", justifyContent: "space-around" }}>
                                <Icon className="icon icon-search">save</Icon>
                            </Button>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            {
                                data?.map((db, index) =>
                                    <div className='div-flex-2 pointer mb-1 hovergray p-2 item-sltruycap'>
                                        <Avatar className='me-3 mt-1' src={avatar} sx={{ cursor: 'pointer' }} />
                                        <span>
                                            <b>{db.label}</b> - Sử dụng: 54 lần<br />
                                            <span className='gray01'>Chi bộ III - Khối văn phòng - Đảng bộ Viễn Thông Long An</span>
                                        </span>
                                    </div>
                                )
                            }
                            <div>
                                <Pagination
                                    next
                                    first
                                    maxButtons={3}
                                    size="xs"
                                    layout={['-', 'pager']}
                                    total={3}
                                    limitOptions={[30, 50, 70, 100]}
                                    limit={4}
                                    activePage={0}
                                // onChangePage={setPage}
                                // onChangeLimit={handleChangeLimit}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};


export default ThongKeDangVienSuDung;
