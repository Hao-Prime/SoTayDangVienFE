import { useEffect, useState } from 'react';
import { Avatar, Hidden, Icon, IconButton, MenuItem, useMediaQuery } from '@mui/material';
import { SelectPicker } from 'rsuite'
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import ShoppingCart from '../../ShoppingCart';
import avatar from "../../../assets/images/logouser.png"
import DoiMatKhauModal from './DoiMatKhauModal';
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
    // padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}));

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: { display: 'none !important' },
}));
const IconBoxPC = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: { display: 'none !important' },
}));
const IconBoxPhone = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: { display: 'none !important' },
}));
const Layout1Topbar = () => {
    const theme = useTheme();
    const { settings, updateSettings } = useSettings();
    const { logout, user } = useAuth();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openDoiMatKhauModal, setOpenDoiMatKhauModal] = useState(false);

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: { leftSidebar: { ...sidebarSettings } },
        });
    };

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings;
        let mode;
        if (isMdScreen) {
            mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
        } else {
            mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
        }
        updateSidebarMode({ mode });
    };
    const doiMatKhau = () => {
        setOpenDoiMatKhauModal(true)
    }

    return (
        <>
            <DoiMatKhauModal open={openDoiMatKhauModal} setOpen={setOpenDoiMatKhauModal}></DoiMatKhauModal>
            <TopbarRoot>

                <TopbarContainer>
                    <Box display="flex">
                        <StyledIconButton onClick={handleSidebarToggle}>
                            <Icon>menu</Icon>
                        </StyledIconButton>

                        <IconBox>
                            {/* <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton> */}

                            <StyledIconButton>
                                <Icon>web_asset</Icon>
                            </StyledIconButton>

                            <StyledIconButton>
                                <Icon>star_outline</Icon>
                            </StyledIconButton>
                        </IconBox>
                    </Box>

                    <Box display="flex" alignItems="center">
                        {/* <MatxSearchBox /> */}
                        <IconBoxPC>
                            <Icon className='red-001 me-1'>assignment_ind</Icon>
                            <SelectPicker className='red-quyen' data={[{ value: 1, label: "Bí thư - Chi bộ III - Khối văn phòng" }, { value: 2, label: "Đảng ủy viên - Đảng bộ Viễn Thông Long An" }]} searchable={false} cleanable={false} appearance="subtle" defaultValue={1} placeholder="Bí thư - Chi bộ III - Khối văn phòng" style={{ width: "auto" }} />
                            <Icon className='red-001 me-1'>equalizer</Icon><span className='pointer me-2'> Điểm tích lũy: 15</span>
                        </IconBoxPC>
                        <IconBoxPhone>
                            <Icon className='red-001 me-1'>assignment_ind</Icon>
                            <SelectPicker className='red-quyen' data={[{ value: 1, label: "Bí thư - Chi bộ III - Khối văn phòng" }, { value: 2, label: "Đảng ủy viên - Đảng bộ Viễn Thông Long An" }]} searchable={false} cleanable={false} appearance="subtle" defaultValue={1} placeholder="Bí thư - Chi bộ III - Khối văn phòng" style={{ width: "100px" }} />

                        </IconBoxPhone>
                        <NotificationProvider>
                            <NotificationBar />
                        </NotificationProvider>

                        {/* <ShoppingCart /> */}

                        <MatxMenu
                            menuButton={
                                <UserMenu>
                                    <Hidden xsDown>
                                        <Span>
                                            <strong>{user.hoTen}</strong>
                                        </Span>
                                    </Hidden>
                                    <Avatar src={avatar} sx={{ cursor: 'pointer' }} />
                                </UserMenu>
                            }
                        >

                            <StyledItem>
                                <Link to="/">
                                    <Icon> home </Icon>
                                    <Span> Trang chủ </Span>
                                </Link>
                            </StyledItem>

                            {/* <StyledItem>
                                <Link to="#">
                                    <Icon> person </Icon>
                                    <Span> Thông tin cá nhân </Span>
                                </Link>
                            </StyledItem> */}

                            <StyledItem onClick={doiMatKhau}>

                                <Icon> settings </Icon>
                                <Span> Đổi mật khẩu </Span>
                            </StyledItem>

                            <StyledItem onClick={logout}>
                                <Icon> power_settings_new </Icon>
                                <Span> Đăng xuất </Span>
                            </StyledItem>
                        </MatxMenu>
                    </Box>
                </TopbarContainer>
            </TopbarRoot>
        </>
    );
};

export default React.memo(Layout1Topbar);
