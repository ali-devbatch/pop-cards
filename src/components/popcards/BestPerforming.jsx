import { useEffect, useState, useRef } from "react";
// components
import PopcardSearch from "../inputs/PopcardSearch";
import PopcardTable from "./PopcardTable";
import PopcardTableFilter from "./PopcardTableFilter";
import PopcardSnackbar from "../feedback/PopcardSnackbar";
// styling
import "../../styles/BestPerforming.css";
import {
  Container,
  Typography,
  Box,
  Button,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import filter from "../../assets/filter.svg";
import ClearIcon from "@mui/icons-material/Clear";
import NoDataImage from "../../assets/noTableData.svg";
// utils
import { useGetPopcardsQuery } from "../../api/services/popcardApiSlice";

const BestPerforming = () => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [searched, setSearched] = useState("");
  // const [rowsPerPage] = useState(10);
  // const [visibleRows, setVisibleRows] = useState([]);
  const [filterSelected, setFilterSelected] = useState(false);
  const [filterButtonFocus, setFilterButtonFocus] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTargetType, setFilterTargetType] = useState("");
  const [distinctFilterTargetType, setDistinctFilterTargetType] = useState([]);

  const [filterTargetValue, setFilterTargetValue] = useState("");
  const [targetTypeOptions, setTargetTypeOptions] = useState([]);

  const [searchedVal, setSearchedVal] = useState("");

  const {
    data: popcards,
    isLoading: popcardLoading,
    isError: isPopcardsError,
    error: popcardsError,
  } = useGetPopcardsQuery({
    page: page,
    limit: 10,
    sortBy: `${orderBy && order ? `${orderBy}:${order}` : "default"}`,
    filter: `${filterStatus !== "" ? `active:${filterStatus},` : ""}${
      filterTargetType ? `target.target_type:${filterTargetType},` : ""
    }${filterTargetValue ? `target.value:${filterTargetValue}` : "default"}`,
    search: searchedVal,
  });

  const minWidth600 = useMediaQuery("(min-width:600px)");

  const debounce = useRef();

  const requestSearch = async (searchedText) => {
    clearTimeout(debounce.current);

    setSearched(searchedText);
    if (searchedText === "") {
      setPage(1);
    }

    debounce.current = setTimeout(() => {
      setSearchedVal(searchedText);
    }, 350);
  };

  const handleFilter = () => {
    setFilterSelected(!filterSelected);
  };

  const handleRestore = async () => {
    setSearchedVal("");
  };

  const getDistinctTargetTypes = (popcardFilters) => {
    const targetTypeSet = new Set();
    for (const item of popcardFilters) {
      targetTypeSet.add(item.targetType);
    }
    return Array.from(targetTypeSet);
  };

  // useEffect(() => {
  //   setVisibleRows(popcards?.results || []);
  // }, [popcards?.results, order, orderBy, page, rowsPerPage]);

  return (
    <Box className="bestPerformingContainer">
      <Box className="bestPerformingHeader">
        <Container className="bestPerformingTitleContainer">
          <Typography className="bestPerformingTitle">
            Best Performing
          </Typography>
          <Typography className="bestPerformingSubtitle">
            {popcards?.totalResults ? popcards.totalResults : ""} All time
            Popcards
          </Typography>
        </Container>
        <Box component="div" className="bestPerformingHeaderButtons">
          <Button
            variant="contained"
            className="bestPerformingFilterButton"
            onClick={handleFilter}
            style={{
              backgroundColor: filterSelected && "#F1F1F2",
            }}
            onFocus={() => setFilterButtonFocus(true)}
          >
            {filterSelected && filterButtonFocus ? (
              <ClearIcon className="bestPerformingClearIcon" />
            ) : (
              <img
                src={filter}
                alt="filter icon"
                className="bestPerformingIcon"
              />
            )}
          </Button>
          {minWidth600 && (
            <PopcardSearch
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              className="bestPerformingSearch"
              onRestore={handleRestore}
            />
          )}
          {/* <PopcardButton
            value="Export"
            startIcon={<img src={exportIcon} alt="export icon" className='bestPerformingExportIcon' />}
            style={{
              width: "auto",
              padding: "0px 15px",
              margin: 0,
              maxHeight: "40px",
              height: "40px",
              marginLeft: "15px",
            }}
          /> */}
        </Box>
      </Box>
      {
        <Collapse in={filterSelected}>
          <PopcardTableFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterTargetType={filterTargetType}
            setFilterTargetType={setFilterTargetType}
            filterTargetValue={filterTargetValue}
            targetTypeOptions={targetTypeOptions}
            setTargetTypeOptions={setTargetTypeOptions}
            setFilterTargetValue={setFilterTargetValue}
            distinctFilterTargetType={distinctFilterTargetType}
            setDistinctFilterTargetType={setDistinctFilterTargetType}
            getDistinctTargetTypes={getDistinctTargetTypes}
          />
        </Collapse>
      }
      {popcards?.results.length > 0 ? (
        <PopcardTable
          popcards={popcards}
          visibleRows={popcards?.results}
          popcardLoading={popcardLoading}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          page={page}
          setPage={setPage}
        />
      ) : (
        <Box className="bestPerformingTableNoDataContainer">
          <img
            className="bestPerformingTableNoDataImage"
            src={NoDataImage}
            alt="no table data"
          />
          <Typography className="noDataFoundIllustrationLineChartText">
            We couldn't locate any entries in the table; or your search
            terms/current filters do not match any entry.
          </Typography>
        </Box>
      )}
      {isPopcardsError && (
        <PopcardSnackbar
          message={popcardsError?.data?.message}
          severity="error"
        />
      )}
    </Box>
  );
};

export default BestPerforming;
