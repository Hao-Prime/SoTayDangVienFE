import { Table, Checkbox } from 'rsuite';
import { styled } from '@mui/material';
const { Column, HeaderCell, Cell, ColumnGroup } = Table;
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
    <div style={{ lineHeight: '36px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some(item => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);
const CustomCell = props => <Cell {...props} style={{ padding: "2px 10px" }} />;
const CustomCell2 = props => <Cell {...props} style={{ padding: " 10px" }} />;
const CustomHeaderCell = props => <HeaderCell {...props} style={{ padding: 10, fontWeight: "bold", fontSize: "13px" }} />;
const CustomHeaderCell2 = props => <HeaderCell {...props} style={{ padding: 10, fontSize: "13px" }} />;
const CustomHeaderCellCheck = props => <HeaderCell {...props} style={{ padding: 0 }} />;

export {
  CheckCell,
  CustomCell,
  CustomHeaderCell,
  CustomHeaderCellCheck,
  CustomCell2,
  CustomHeaderCell2,
  Column,
  ColumnGroup,
  Container,
  Table
};

const TableCustomRsuite = {
  CheckCell,
  CustomCell,
  CustomHeaderCell,
  CustomHeaderCellCheck,
  Column,
  ColumnGroup,
  Container,
  Table

};
export default TableCustomRsuite;
