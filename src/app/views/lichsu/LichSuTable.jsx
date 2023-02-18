import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Box, styled, Icon, Divider } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Pagination } from 'rsuite';
import { Input, InputGroup, Button, Stack, SelectPicker } from 'rsuite';

import Services from 'app/services';
import congViecUtil from 'app/utils/modules/CongViec';
import FormatDate from 'app/common/FormatDate';

const { Column, HeaderCell, Cell } = Table;
const Container = styled("div")(({ theme }) => ({
    margin: "20px 20px 5px 20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "20px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);
const LichSuTable = () => {
    const [totalElements, setTotalElements] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [listLichSuMD, setListLichSuMD] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);
    const [listLichSu, setListLichSu] = useState([]);

    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList();
        return () => { isMounted = false; };
    }, [page, limit]);
    function reloadList(click) {
        setLoading(true);
        loadData(page - 1, limit)
    }
    function loadData(page, limit) {
        Services.getLichSuService().getPage(page, limit).then(
            (response) => {
                if (isMounted) {
                    if (response.data != null) {
                        setListLichSu(response.data?.content)
                        setListLichSuMD(response.data?.content)
                        setTotalElements(response.data?.totalElements)
                        setLoading(false)
                    }
                }
            }
        );
    }

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };
    function timKiem(key) {
        if (key != "") {
            setListLichSu([]);
            listLichSuMD.forEach((ls) => {
                if (ls.noiDung?.toUpperCase().includes(key.toUpperCase())) {
                    setListLichSu((listLichSu) => [...listLichSu, ls])
                }
            })

        } else {
            reloadList();
        }

    }

    return (
        <Container>

            <Breadcrumb routeSegments={[{ name: "Lịch sử", path: "/par/lichsu" }]} />

            <SimpleCard >
                {/* <div className='form-table'> */}
                <Stack wrap className="table-toolbar" justifyContent="space-between">
                    <Stack wrap spacing={6}>


                    </Stack>

                    <Stack spacing={6}>
                        <Button className='div-flex' onClick={() => reloadList("click")}>
                            <Icon className="icon icon-search">replay </Icon>
                        </Button>
                        <InputGroup inside>
                            <Input placeholder="Tìm kiếm" value={searchKeyword} onChange={setSearchKeyword}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        timKiem(searchKeyword);
                                    }
                                }} />
                            <InputGroup.Addon>
                                <Icon className="icon icon-search">search</Icon>
                            </InputGroup.Addon>
                        </InputGroup>

                    </Stack>
                </Stack>
                <Table virtualized height={550} data={listLichSu} id="table" className='table' loading={loading}>

                    <Column width={45} align="center" >
                        <HeaderCell>STT</HeaderCell>
                        <Cell>{(rowData, rowIndex) => (limit * (page - 1) + (rowIndex + 1))}</Cell>
                    </Column>
                    <Column width={150} resizable>
                        <HeaderCell>THỜI GIAN</HeaderCell>
                        <Cell>{(rowData) => (FormatDate.formatDate(FormatDate.setTimeZoneUTC7(rowData.thoiGian)))}</Cell>
                    </Column>
                    <Column width={100} resizable>
                        <HeaderCell>PHÂn LOẠI</HeaderCell>
                        <Cell dataKey="phanLoai" />
                    </Column>
                    <Column width={600} flexGrow={1} fullText>
                        <HeaderCell>NỘI DUNG</HeaderCell>
                        <Cell dataKey="noiDung" />
                    </Column>

                </Table>
                <div style={{ padding: "7px" }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        maxButtons={3}
                        size="xs"
                        layout={['-', 'limit', '|', 'pager']}
                        total={totalElements}
                        limitOptions={[50, 100, 300, 1000, 2000]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
                {/* </div> */}
            </SimpleCard>
        </Container >
    );
};

export default LichSuTable;
