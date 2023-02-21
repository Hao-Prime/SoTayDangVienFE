import { useEffect, useState } from 'react';
import { Icon, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Popover, Whisper, Checkbox, CheckboxGroup, Dropdown, IconButton, Progress, Pagination, Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import Services from 'app/services';
import dangVienUtil from 'app/utils/modules/DangVien';
import FormatDate from 'app/common/FormatDate';
import { Paragraph } from 'app/components/Typography';
import { Nav } from 'rsuite';
import { Table, CustomCell, CustomHeaderCell2, Column, Container, ColumnGroup } from 'app/components/TableRsuite/TableCustomRsuite';

import { Calendar, Badge } from 'rsuite';

const events = [
    {
        startDate: new Date(2023, 1, 6),
        endDate: new Date(2023, 1, 8),
        title: 'Sinh hoạt chi...',
        bgcolor: '#f7e6ff',
        color: '#aa00ff',
    },
    {
        startDate: new Date(2023, 1, 16),
        endDate: new Date(2023, 1, 17),
        title: 'Học tập nghị...',
        bgcolor: '#cce6ff',
        color: '#0059b3',
    },
    {
        startDate: new Date(2023, 1, 22),
        endDate: new Date(2023, 1, 24),
        title: 'Thực hiện nhi...',
        bgcolor: '#bfffc2ac',
        color: '#00ce2d',
    },
];

function CustomEvent({ event }) {
    return (
        <Badge content={event.title} style={{ color: event.color, backgroundColor: event.bgcolor, width: '100%', display: 'flex', height: '25px', alignItems: 'center', justifyContent: 'center' }} />
    );
}
export default function LichCongTacTable() {

    return (
        <Container>
            {/* <DangVienModal dangVienUp={dangVienUp} open={openDangVienModal} setOpen={setOpenDangVienModal} reloadList={reloadList} />
            <DanhGiaModal listDangVien={listDangVienSelect} namXepLoai={namXepLoai} open={openDanhGiaModal} setOpen={setOpenDanhGiaModal} reloadList={reloadList} />
            <ChiTietDangVienModal dangVienID={dangVienUp.id} open={openChiTietDangVienModal} setOpen={setOpenChiTietDangVienModal} /> */}
            <Breadcrumb routeSegments={[{ name: "Lịch công tác Đáng", path: "/par/dangvien" }]} />

            <SimpleCard >
                <Grid container spacing={1} >
                    <Grid item lg={3} md={3} sm={6} xs={6}>
                        <Grid container spacing={1} >
                            <Grid item lg={12} md={12} sm={12} xs={12} className='ps-3 pe-2'>
                                <Button color='red' appearance="primary" className='div-flex t-center' style={{ justifyContent: 'center', width: "100%" }} size="md">
                                    <Icon className="icon icon-search">add</Icon> Thêm lịch cá nhân
                                </Button>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div style={{ width: '100%' }}>
                                    <Calendar compact bordered />{' '}
                                </div>
                                <CheckboxGroup value={['A', 'B', 'C', 'D']}>

                                    <Checkbox sx={{ color: 'red' }} value="A"><span className='bg-timx0'>Sinh hoạt thường kỳ</span></Checkbox>
                                    <Checkbox color="danger" value="B"><span className='bg-tim1'>Sinh hoạt cấp ủy</span></Checkbox>
                                    <Checkbox color="danger" value="C"><span className='bg-tim0'>Sinh hoạt chuyên đề</span></Checkbox>
                                    <Checkbox color="danger" value="D"><span className='bg-green1'>Cá nhân</span></Checkbox>


                                </CheckboxGroup>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <Calendar
                            bordered
                            events={events}
                            renderCell={(date, dateLabel) => {
                                const filteredEvents = events.filter(
                                    (event) =>
                                        event.startDate.getTime() <= date.getTime() &&
                                        event.endDate.getTime() >= date.getTime()
                                );
                                if (filteredEvents.length > 0) {
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div>{dateLabel}</div>
                                            {filteredEvents.map((event) => (
                                                <CustomEvent key={event.title} event={event} />
                                            ))}
                                        </div>
                                    );
                                }
                                return dateLabel;
                            }}
                        />
                    </Grid>

                </Grid>

            </SimpleCard>
        </Container >
    );
};

