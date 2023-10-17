// styling
import "../../styles/BestPerforming.css";
import { Container, Box, FormControl, Select, MenuItem } from "@mui/material";
// utils
import PropTypes from "prop-types";
import { useGetFilterPopcardsQuery } from "../../api/services/popcardApiSlice";
import { useEffect } from "react";
import Target from "./best_performing/Target";

const PopcardTableFilter = (props) => {
  const {
    filterStatus,
    setFilterStatus,
    filterTargetType,
    setFilterTargetType,
    targetTypeOptions,
    setTargetTypeOptions,
    filterTargetValue,
    setFilterTargetValue,
    distinctFilterTargetType,
    setDistinctFilterTargetType,
    getDistinctTargetTypes,
  } = props;

  const {
    data: popcardFilters,
    isLoading,
    // isError: isFilterError,
    // error: filterError
  } = useGetFilterPopcardsQuery();
  useEffect(() => {
    if (popcardFilters) {
      const distinctTargetTypes = getDistinctTargetTypes(popcardFilters);
      setDistinctFilterTargetType(distinctTargetTypes);
    }
  }, [popcardFilters]);

  useEffect(() => {
    if (popcardFilters && filterTargetType) {
      const filteredValues = popcardFilters
        .filter((item) => item.targetType === filterTargetType)
        .map((item) => ({
          targetType: item?.targetType,
          value: item?.value,
          label: item?.label,
        }));

      setTargetTypeOptions(filteredValues);
    } else {
      setTargetTypeOptions(popcardFilters);
    }
  }, [filterTargetType, popcardFilters]);

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFilterTargetType(event.target.value);
    setFilterTargetValue("");
  };

  const handleValueChange = (event) => {
    setFilterTargetValue(event.target.value);
  };

  const clearFilters = () => {
    setFilterStatus("");
    setFilterTargetType("");
    setFilterTargetValue("");
  };

  return (
    <Container className="bestPerformingFilterContainer">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Box component="span" className="bestPerformingTableSortLabel">
          Status
        </Box>
        <Select value={filterStatus} onChange={handleStatusChange} displayEmpty>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem key={"active"} value={true}>
            Active
          </MenuItem>
          <MenuItem key={"inactive"} value={false}>
            Inactive
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Box component="span" className="bestPerformingTableSortLabel">
          Target Type
        </Box>
        <Select
          value={filterTargetType}
          onChange={handleTypeChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {distinctFilterTargetType?.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {/* {item} */}
                <Target type={item} value={item} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Box component="span" className="bestPerformingTableSortLabel">
          Target Value
        </Box>
        <Select
          value={filterTargetValue}
          onChange={handleValueChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {targetTypeOptions?.map((item, index) => {
            return (
              <MenuItem key={index} value={item?.value}>
                <Target
                  type={item?.targetType}
                  value={item?.label ? item?.label : item.value}
                />
                {/* {item?.label ? item?.label : item.value} */}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {(filterStatus !== "" ||
        filterTargetType !== "" ||
        filterTargetValue !== "") && (
        <Box
          onClick={!isLoading ? clearFilters : undefined}
          style={{
            color: "#A1A5B7",
            cursor: "pointer",
            margin: "18px 0 0 15px",
            fontSize: "14px",
          }}
        >
          Clear
        </Box>
      )}
      {/* <PopcardButton
        value={isLoading ? <CircularProgress className="loader" size={20} /> : "Apply"}
        style={{
          width: "auto",
          padding: "0px 15px",
          maxHeight: "40px",
          height: "40px",
          margin: "18px 0 0 15px",
        }}
        onClick={applyFilter}
        disabled={filterStatus === '' && filterTargetType === '' && filterTargetValue === '' && !isLoading}
      /> */}
    </Container>
  );
};

PopcardTableFilter.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  filterTargetType: PropTypes.string.isRequired,
  setFilterTargetType: PropTypes.func.isRequired,
  filterTargetValue: PropTypes.string.isRequired,
  setFilterTargetValue: PropTypes.func.isRequired,
};

export default PopcardTableFilter;
