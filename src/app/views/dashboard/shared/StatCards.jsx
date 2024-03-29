import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import Services from 'app/services';
import { useEffect, useState } from 'react';
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': { color: "black", fontSize: "14px", fontWeight: "bold" },
    '& .icon': { opacity: 0.6, fontSize: '44px', color: "red" },
}));

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.primary.main,
}));

const StatCards = () => {
    const [cardList, setCardList] = useState(
        [
            {
                name: 'Số lượng Đảng bộ/Chi bộ', amount: '16', icon: 'local_police', link: "/quanly/chibo",
                type: 2, name2: "Tổng cộng", name3: "Số Đảng bộ: ", name4: "Số Chi bộ: ",
                amount3: 0, amount4: 16
            },
            {
                name: 'Số lượng Đảng viên trong đơn vị', amount: 198, icon: 'badge', link: "/quanly/dangvien",
                type: 2, name2: "", name3: "Đảng viên cấp ủy: ", name4: "Đảng viên dự bị: ",
                amount3: 22, amount4: 10
            },
            {
                name: 'Thông tin nhiệm vụ', amount: '12', icon: 'local_play', link: "/quanly/vanban/dangxuly?loai=1",
                type: 2, name2: "Tổng số nhiệm vụ", name3: "Số nhiệm vụ đúng hạn: ", name4: "Số nhiệm vụ trễ hạn: ",
                amount3: 0, amount4: 0
            },
            {
                name: 'Học tập nghị quyết', amount: '7', icon: 'work_history', link: "/quanly/congviec/dangxuly?loai=1",
                type: 2, name2: "Số câu hỏi / ý kiến", name3: "Số câu đã trả lời: ", name4: "Số câu chưa trả lời: ",
                amount3: 0, amount4: 0
            },
        ]);

    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        Services.getThongKeService().getTongSoLuongDashboard().then(
            (response) => {
                if (response.data != null) {
                    let rs = [...cardList];
                    rs[0].amount = response.data?.soLuongChiBo
                    rs[1].amount = response.data?.soLuongDangVien
                    rs[2].amount = response.data?.soLuongVanBan
                    rs[3].amount = response.data?.soLuongCongViec
                    setCardList(rs)
                }

            }
        );
        return () => { isMounted = false; };
    }, []);
    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            {cardList.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">{item.icon}</Icon>
                            <Box ml="12px">
                                <Small>{item.name}</Small>
                                <div className='div-flex m-2'><p className='span-sl-db me-2'>{item.amount}</p> <span className='gray01'>{item.name2}</span></div>
                                {item.type == 2 && <>
                                    <p><span className="ant-badge-status-dot ant-badge-status-blue me-2"></span>{item.name3 + item.amount3}</p>
                                    <p><span className="ant-badge-status-dot ant-badge-status-red me-2"></span>{item.name4 + item.amount4}</p>
                                </>
                                }
                            </Box>
                        </ContentBox>

                        <Tooltip title="Xem chi tiết" placement="top" onClick={() => { window.location.href = item.link; }}>
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default StatCards;
