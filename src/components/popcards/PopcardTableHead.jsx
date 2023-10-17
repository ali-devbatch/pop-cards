// styling
import '../../styles/BestPerforming.css';
import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  // Checkbox,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
// utils
import { headCells } from '../../utils/constants';
import PropTypes from 'prop-types';

const PopcardTableHead = (props) => {
  const {
    order,
    orderBy,
    onRequestSort,
    // numSelected,
    // onSelectAllClick,
    // rowCount,
  } = props;

  const maxWidth1920 = useMediaQuery('(max-width:1920px)');

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" className='bestPerformingTableCell'>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all popcards"
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className='bestPerformingTableCell'
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={headCell.sort && createSortHandler(headCell.id)}
              hideSortIcon={headCell.sort ? false : true}
              className='bestPerformingTableSortLabel'
              style={{
                fontSize: maxWidth1920 ? "12px" : "14px",
                cursor: headCell.sort ? "pointer" : "default",
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

PopcardTableHead.propTypes = {
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(["", "asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
};

export default PopcardTableHead;