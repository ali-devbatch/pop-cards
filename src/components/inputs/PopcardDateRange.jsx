import { useState } from "react";
// styling
import "../../styles/Dashboard.css";
import "../../styles/RSuite.css";
import "../../styles/PopcardDetails.css";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DateRangePicker } from "rsuite";
// utils
import { TimeIntervals } from "../../utils/constants";
import { formatDateRange } from "../../utils/functions";
import { setNavbarOpened, navbarOpenedSelector } from "../../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import PropTypes from "prop-types";

function PopcardDateRange(props) {
  const {
    title,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

  const [selectedFilter, setSelectedFilter] = useState("7 Days");
  const [customFilter, setCustomFilter] = useState(false);
  const navbarOpened = useSelector(navbarOpenedSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Media Queries */
  const maxWidth1100 = useMediaQuery("(max-width:1100px)");
  const maxWidth1280 = useMediaQuery("(max-width:1300px)");
  const minWidth850 = useMediaQuery("(min-width:850px)");
  const maxWidth850 = useMediaQuery("(max-width:850px)");
  const maxWidth700 = useMediaQuery("(max-width:700px)");
  const maxWidth420 = useMediaQuery("(max-width:420px)");

  // const currentPath = window.location.pathname;

  const handleFilterButton = async (filter) => {
    let localStartDate = TimeIntervals.oneWeekAgo;
    setSelectedFilter(filter);

    if (filter === "7 Days") {
      setStartDate(TimeIntervals.oneWeekAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.oneWeekAgo;
    } else if (filter === "1 Month") {
      setStartDate(TimeIntervals.oneMonthAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.oneMonthAgo;
    } else if (filter === "3 Months") {
      setStartDate(TimeIntervals.threeMonthsAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.threeMonthsAgo;
    } else if (filter === "1 Year") {
      setStartDate(TimeIntervals.oneYearAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.oneYearAgo;
    }

    localStartDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    localStartDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
  };

  const handleFilterSelect = async (event) => {
    event.preventDefault();
    const { value } = event.target;

    let localStartDate = TimeIntervals.oneWeekAgo;

    setSelectedFilter(value);
    if (value === "7 Days") {
      setStartDate(TimeIntervals.oneWeekAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.oneWeekAgo;
      setCustomFilter(false);
    } else if (value === "1 Month") {
      setStartDate(TimeIntervals.oneMonthAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.oneMonthAgo;
      setCustomFilter(false);
    } else if (value === "3 Months") {
      setStartDate(TimeIntervals.threeMonthsAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.threeMonthsAgo;
      setCustomFilter(false);
    } else if (value === "1 Year") {
      setStartDate(TimeIntervals.oneYearAgo);
      setEndDate(TimeIntervals.today);
      localStartDate = TimeIntervals.oneYearAgo;
      setCustomFilter(false);
    } else if (value === "Custom") {
      setCustomFilter(true);
    }

    localStartDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
  };

  const handleDateRange = async (datesArray) => {
    // for when the calendar icon is clicked
    if (datesArray === null) return;

    setStartDate(datesArray[0]);
    setEndDate(datesArray[1]);
    setSelectedFilter("Custom");

    datesArray[0].setHours(0, 0, 0, 0);
    datesArray[1].setHours(23, 59, 59, 999);
  };

  const formatDateToCustomFormat = () => {
    if (!startDate || !endDate) {
      return ""; // Return an empty string for null dates
    }
    const formattedStartDate = format(startDate, "do MMM yyyy");
    const formattedEndDate = format(endDate, "do MMM yyyy");

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const containerStyle = maxWidth850 ?
    { display: 'flex', flexDirection: 'column', paddingTop: '5px' } : {};

  return (
    <>
      <Grid item xs={12} className="dashboardHeader">
        <Container className="dashboardTitleContainer">
          {maxWidth1100 && (
            <IconButton
              disableRipple={true}
              disableFocusRipple={true}
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(setNavbarOpened(!navbarOpened))}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          {title === "Popcard" && (
            <IconButton
              onClick={() => navigate(-1)}
              size="medium"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box component="span">
            <Tooltip
              title={title}
              disable={title === "popcard"}
            >
              <Typography className="dashboardTitle">{title}</Typography>
            </Tooltip>
            <Typography className="dashboardSubtitle">
              {maxWidth420 ? formatDateRange(startDate, endDate, "short")
                : formatDateRange(startDate, endDate, "long")}
            </Typography>
          </Box>
        </Container>
        {/* for screens larger than 1280  */}
        {!maxWidth1280 && (
          <Container className="dashboardFilterButtonsContainer">
            <Box className="dashboardFilterButtonsContainer">
              <Button
                variant="contained"
                className="filterButton"
                style={{
                  backgroundColor: selectedFilter === "7 Days" ? "#F1F1F2" : "",
                }}
                onClick={() => handleFilterButton("7 Days")}
              >
                7 Days
              </Button>
              <Button
                variant="contained"
                className="filterButton"
                style={{
                  backgroundColor:
                    selectedFilter === "1 Month" ? "#F1F1F2" : "",
                }}
                onClick={() => handleFilterButton("1 Month")}
              >
                1 Month
              </Button>
              <Button
                variant="contained"
                className="filterButton"
                style={{
                  backgroundColor:
                    selectedFilter === "3 Months" ? "#F1F1F2" : "",
                }}
                onClick={() => handleFilterButton("3 Months")}
              >
                3 Months
              </Button>
              <Button
                variant="contained"
                className="filterButton"
                style={{
                  backgroundColor: selectedFilter === "1 Year" ? "#F1F1F2" : "",
                }}
                onClick={() => handleFilterButton("1 Year")}
              >
                1 Year
              </Button>
            </Box>
            <DateRangePicker
              format="dd-MM-yyyy"
              size="lg"
              value={[startDate, endDate]}
              defaultCalendarValue={[startDate, endDate]}
              onChange={(newValue) => {
                handleDateRange(newValue);
              }}
              renderValue={formatDateToCustomFormat}
            />
          </Container>
        )}
        {/* for screens less than 1280  */}
        {(minWidth850 && maxWidth1280) || (maxWidth850) ? (
          <Container className="dashboardFilterButtonsContainer" style={containerStyle}>
            <FormControl sx={{ m: 1, width: 150 }}>
              <InputLabel id="filter-selection">Filter</InputLabel>
              <Select
                className="dashboardFilterSelect"
                labelId="filter-selection"
                id="filter-selection"
                value={selectedFilter}
                onChange={handleFilterSelect}
                input={<OutlinedInput id="filter-selection" label="Chip" />}
                renderValue={() => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip key={selectedFilter} label={selectedFilter} />
                  </Box>
                )}
              >
                <MenuItem value="7 Days">7 Days</MenuItem>
                <MenuItem value="1 Month">1 Month</MenuItem>
                <MenuItem value="3 Months">3 Months</MenuItem>
                <MenuItem value="1 Year">1 Year</MenuItem>
                {!minWidth850 && <MenuItem value="Custom">Custom</MenuItem>}
              </Select>
            </FormControl>
            {
              (minWidth850) &&
              <DateRangePicker
                format="dd-MM-yyyy"
                size="lg"
                value={[startDate, endDate]}
                defaultCalendarValue={[startDate, endDate]}
                onChange={(newValue) => {
                  handleDateRange(newValue);
                }}
                renderValue={formatDateToCustomFormat}
              />
            }
            {
              ((maxWidth850) && customFilter) &&
              <DateRangePicker
                showOneCalendar={maxWidth700}
                format="dd-MM-yyyy"
                size="lg"
                value={[startDate, endDate]}
                defaultCalendarValue={[startDate, endDate]}
                onChange={(newValue) => {
                  handleDateRange(newValue);
                }}
                renderValue={formatDateToCustomFormat}
              />
            }
          </Container>
        ) : null}
      </Grid>
    </>
  );
}

PopcardDateRange.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  setEndDate: PropTypes.func.isRequired,
};

export default PopcardDateRange;
