import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { useEffect, useState } from 'react';
import Services from 'app/services';
import { Input, InputGroup } from 'rsuite';
import { Icon } from '@mui/material';
const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '10px',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [navigationsInit, setNavigationsInit] = useState(navigations);
  const [searchKeyword, setSearchKeyword] = useState('');
  var isMounted = true;
  useEffect(() => {
    isMounted = true;
    Services.getThongKeService().getTongSoLuongDashboard().then(
      (response) => {
        if (isMounted) {
          if (response.data != null) {
            let rs = [...navigationsInit]
            // rs[2].badge.value = response.data.soLuongVanBan == 0 ? null : response.data.soLuongVanBan
            // rs[2].children[1].badge.value = response.data.soLuongVanBan == 0 ? null : response.data.soLuongVanBan
            // rs[3].badge.value = response.data.soLuongCongViec == 0 ? null : response.data.soLuongCongViec
            // rs[3].children[1].badge.value = response.data.soLuongCongViec == 0 ? null : response.data.soLuongCongViec
            setNavigationsInit(rs);
          }
        }
      }
    );
    return () => { isMounted = false; };
  }, []);
  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <div className='div-search-nav' >
        <InputGroup inside>
          <Input placeholder="Tìm kiếm văn bản" value={searchKeyword} onChange={setSearchKeyword}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = "/quanly/vanban/tatca?search=" + searchKeyword
              }
            }} />
          <InputGroup.Addon>
            <Icon className="icon icon-search">search</Icon>
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={navigationsInit} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
