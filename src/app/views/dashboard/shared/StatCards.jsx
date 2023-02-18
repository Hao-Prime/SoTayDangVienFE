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
            { name: 'Số lượng Chi bộ', amount: '16', icon: 'local_police', link: "/quanly/chibo" },
            { name: 'Số lượng Đảng viên', amount: 198, icon: 'badge', link: "/quanly/dangvien" },
            { name: 'Văn bản cần xử lý', amount: '12', icon: 'file_present', link: "/quanly/vanban/dangxuly?loai=1" },
            { name: 'Công việc cần thực hiện', amount: '7', icon: 'work_history', link: "/quanly/congviec/dangxuly?loai=1" },
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
                                <Heading>{item.amount}</Heading>
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
