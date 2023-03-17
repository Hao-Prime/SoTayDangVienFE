import { Box, styled } from '@mui/material';
import logo from '../assets/images/logo-VNPT.png';
import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';
import { Icon } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 5px 20px 25px',
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 17,
  marginLeft: '.5rem',
  fontWeight: "bold",
  display: mode === 'compact' ? 'none' : 'block',
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot className='pointer' onClick={() => navigate("/")} >
      <Box display="flex" alignItems="center">
        <img src={logo} width="27" />
        <StyledSpan mode={mode} className="sidenavHoverShow ps-2">
          HỒ SƠ ĐẢNG VỤ

        </StyledSpan>
      </Box>

      {/* <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
        {children || null}
      </Box> */}
    </BrandRoot>
  );
};

export default Brand;
