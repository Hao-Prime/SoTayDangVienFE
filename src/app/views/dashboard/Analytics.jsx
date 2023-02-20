import { Card, Grid, styled, useTheme } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import { Breadcrumb } from 'app/components';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import ThongKeDangVienSuDung from './shared/ThongKeDangVienSuDung';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>

      <ContentBox className="analytics">
        <Breadcrumb routeSegments={[{ name: "Trang chủ", path: "/par/dangvien" }]} />
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            <TopSellingTable />
            {/* <StatCards2 /> */}

            {/* <H4>Ongoing Projects</H4>
            <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Tỉ lệ Đảng viên</Title>
              <SubTitle>{FormatDate.convertDDMMYYYY(FormatDate.getNgayHienTai())}</SubTitle>

              <DoughnutChart
                height="300px"
                color={["#ff0000", "#ff7b00", "#ffb041"]}
              />
            </Card>

            <Campaigns />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ThongKeDangVienSuDung />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
