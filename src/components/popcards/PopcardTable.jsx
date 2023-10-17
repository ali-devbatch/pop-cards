import { useState } from "react";
// components
import PopcardTableHead from "./PopcardTableHead";
import User from "./best_performing/User";
import Target from "./best_performing/Target";
import Status from "./best_performing/Status";
import LastSevenDays from "./best_performing/LastSevenDays";
import PopcardTablePagination from "./PopcardTablePagination";
// styling
import "../../styles/BestPerforming.css";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@mui/material";
import TableSkeleton from "../skeletons/TableSkeleton";
// utils
import { formatDateAgo, customRounding } from "../../utils/functions";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PopcardTable = (props) => {
  const {
    popcards,
    popcardLoading,
    visibleRows,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    setPage,
  } = props;

  const [dense] = useState(false);
  const navigate = useNavigate();

  const handleRequestSort = async (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = async (event, name, id) => {
    // navigate to the popcard details page
    navigate(`/popcards/${id}`);
    // get the current date
    const currentDate = new Date();
    // create a new date that is 7 days before the current date
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
  };

  const handlePageChange = async (page) => {
    setPage(page);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ?
    Math.max(0, 1 + page - popcards?.results?.length) : 0;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: "none",
        }}
      >
        <TableContainer>
          <Table>
            <PopcardTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            {
              popcardLoading ? (
                <TableSkeleton />
              ) : (
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name, row._id)}
                        tabIndex={-1}
                        key={row._id}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          className="bestPerformingTableCell"
                        >
                          <User image={row?.image} name={row?.name} />
                        </TableCell>
                        <Tooltip title={row.target.label?.length > 0
                          ? row.target.label || row.target.value
                          : ""}>
                          <TableCell
                            align="right"
                            className="bestPerformingTableCell"
                          >
                            <Target
                              type={row.target.target_type}
                              value={
                                row.target.label
                                  ? row.target.label
                                  : row.target.value
                              }
                            />
                          </TableCell>
                        </Tooltip>
                        <TableCell
                          align="right"
                          className="bestPerformingTableCell"
                        >
                          <Status status={row.active} />
                        </TableCell>
                        <TableCell
                          align="right"
                          className="bestPerformingTableCell"
                        >
                          <Box
                            component="span"
                            className="bestPerformingLastScanned"
                          >
                            {row.last_scanned
                              ? formatDateAgo(new Date(row.last_scanned))
                              : "N/A"}
                          </Box>
                        </TableCell>
                        <TableCell
                          align="right"
                          className="bestPerformingTableCell"
                        >
                          <Box
                            component="span"
                            className="bestPerformingScansPerHour"
                          >
                            {row.scans_per_hour
                              ? customRounding(row.scans_per_hour)
                              : "N/A"}
                          </Box>
                        </TableCell>
                        <TableCell align="right" className='bestPerformingTableCell'>
                          <LastSevenDays
                            chartData={row.last_7_days_chart_data}
                            trend={row.current_trend}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} className="bestPerformingTableCell" />
                    </TableRow>
                  )}
                </TableBody>
              )
            }
          </Table>
        </TableContainer>
        <PopcardTablePagination
          totalPages={popcards?.totalPages}
          onPageChange={handlePageChange}
          page={page}
        />
      </Paper>
    </Box>
  );
};

PopcardTable.propTypes = {
  popcards: PropTypes.object.isRequired,
  popcardLoading: PropTypes.bool.isRequired,
  visibleRows: PropTypes.array.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  setOrder: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
};

export default PopcardTable;
