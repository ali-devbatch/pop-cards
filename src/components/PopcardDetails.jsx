import { useState, useEffect } from "react";
// components
import LineChart from "./dashboard/LineChart";
import ProfilePopcard from "./popcardDetails/ProfilePopcard";
import TopNavigation from "./popcardDetails/TopNavigation";
import BasicCard from "./popcardDetails/BasicCard";
import PopcardDateRange from "./inputs/PopcardDateRange";
import LineChartSkeleton from "./skeletons/LineChartSkeleton";
import BasicCardSkeleton from "./skeletons/BasicCardSkeleton";
import PopcardSnackbar from "./feedback/PopcardSnackbar";
// styling
import "../styles/Dashboard.css";
import "../styles/RSuite.css";
import "../styles/PopcardDetails.css";
import {
  Box,
  Grid,
  Snackbar,
  Alert,
  useMediaQuery
} from "@mui/material";
import checkLogo from "../assets/check.svg";
import groupLogo from "../assets/group.svg";
import sendLogo from "../assets/send.svg";
// utils
import { useDispatch } from "react-redux";
import { setNavbarSelected } from "../redux/userReducer";
import {
  checkWildcardRouter,
  formatDatesToDayMonth,
  extractTextAfterPopcards,
  customRounding,
} from "../utils/functions";
import { useLocation } from "react-router-dom";
import clipboardCopy from "clipboard-copy";
import {
  useGetPopcardDetailsStatsQuery,
} from "../api/services/popcardDetailsApiSlice";
import { TimeIntervals } from "../utils/constants";

const PopcardDetails = () => {
  const [tab, setTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [startDate, setStartDate] = useState(TimeIntervals.oneWeekAgo);
  const [endDate, setEndDate] = useState(TimeIntervals.today);

  const dispatch = useDispatch();
  const location = useLocation();

  const {
    data: popcardDetailStats,
    isLoading,
    isError,
    error,
    refetch: refetchPopcardDetailsStats
  } = useGetPopcardDetailsStatsQuery({
    id: extractTextAfterPopcards(location.pathname),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  /* Media Queries */
  const maxWidth768 = useMediaQuery("(max-width:768px)");
  const reduceSpacingLargeScreen = useMediaQuery(
    "(min-width:1100px) and (max-width:1300px)"
  );
  const reduceSpacingMediumScreen = useMediaQuery(
    "(min-width:768px) and (max-width:1000px)"
  );

  // set the selected in the Navbar
  useEffect(() => {
    if (checkWildcardRouter(["/popcards"], window.location.pathname)) {
      dispatch(setNavbarSelected("popcards"));
    }
  }, []);

  useEffect(() => {
    refetchPopcardDetailsStats({
      id: extractTextAfterPopcards(location.pathname),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  }, [startDate, endDate]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCopyClick = (text) => {
    clipboardCopy(text);
    setOpenSnackbar(true);
  };

  return (
    <Box className="popcardDetailsContainer">
      <Box>
        <PopcardDateRange
          title="Popcard"
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        {/* </Grid> */}
      </Box>
      {/* main cards */}
      <Grid className="popcardDetailsBody" container>
        {/*Nav tabs*/}
        {maxWidth768 && (
          <TopNavigation tabChange={handleTabChange} value={tab} />
        )}
        {/* profile card*/}
        {maxWidth768 ? (
          <>
            {tab === 0 ? (
              <Grid
                item
                className="profileContainer"
                xs={12}
                style={{
                  maxWidth: window.innerWidth - 40,
                }}
              >
                <ProfilePopcard
                  clipboardCopy={handleCopyClick}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
                <Grid
                  container
                  spacing={
                    reduceSpacingLargeScreen || reduceSpacingMediumScreen
                      ? 1
                      : 2
                  }
                >
                  <Grid item xs={12} sm={4}>
                    {isLoading ? (
                      <BasicCardSkeleton />
                    ) : (
                      <BasicCard
                        icon={checkLogo}
                        title={"Total Scans"}
                        value={
                          popcardDetailStats?.total_scans
                            ? customRounding(popcardDetailStats?.total_scans)
                            : "N/A"
                        }
                      // percentage={'9.12%'}
                      // trend={"up"}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {isLoading ? (
                      <BasicCardSkeleton />
                    ) : (
                      <BasicCard
                        icon={groupLogo}
                        title={"Scans/hour"}
                        value={
                          popcardDetailStats?.scans_per_working_hour
                            ? customRounding(
                              popcardDetailStats?.scans_per_working_hour
                            )
                            : "N/A"
                        }
                      // percentage={'7.69%'}
                      // trend={"down"}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {isLoading ? (
                      <BasicCardSkeleton />
                    ) : (
                      <BasicCard
                        icon={sendLogo}
                        value={
                          popcardDetailStats?.latest_scan
                            ? formatDatesToDayMonth([popcardDetailStats?.latest_scan])
                            : "N/A"
                        }
                        title={"Last scanned"}
                      // percentage={'9.12%'}
                      // trend={"up"}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {isLoading ? (
                      <LineChartSkeleton />
                    ) : (
                      <LineChart
                        title={"Scans"}
                        chartData={popcardDetailStats?.scan_chart_data || []}
                      />
                    )}
                  </Grid>
                  {/* <Grid item xs={12}>
                        <LineChart
                          title={'Scans per hour'}
                        />
                      </Grid> */}
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <>
            <Grid
              item
              className="profileContainer"
              xs={3.8}
              mr={reduceSpacingLargeScreen || reduceSpacingMediumScreen ? 1 : 2}
            >

              <ProfilePopcard
                clipboardCopy={handleCopyClick}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid
                container
                spacing={
                  reduceSpacingLargeScreen || reduceSpacingMediumScreen ? 1 : 2
                }
              >
                <Grid item xs={4}>
                  {isLoading ? (
                    <BasicCardSkeleton />
                  ) : (
                    <BasicCard
                      icon={checkLogo}
                      title={"Total Scans"}
                      value={
                        popcardDetailStats?.total_scans
                          ? customRounding(popcardDetailStats?.total_scans)
                          : "N/A"
                      }
                    // percentage={'9.12%'}
                    // trend={"up"}
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  {isLoading ? (
                    <BasicCardSkeleton />
                  ) : (
                    <BasicCard
                      icon={groupLogo}
                      title={"Scans/hour"}
                      value={
                        popcardDetailStats?.scans_per_working_hour
                          ? customRounding(popcardDetailStats?.scans_per_working_hour)
                          : "N/A"
                      }
                    // percentage={'7.69%'}
                    // trend={"down"}
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  {isLoading ? (
                    <BasicCardSkeleton />
                  ) : (
                    <BasicCard
                      icon={sendLogo}
                      value={
                        popcardDetailStats?.latest_scan
                          ? formatDatesToDayMonth([popcardDetailStats?.latest_scan])
                          : "N/A"
                      }
                      title={"Last scanned"}
                    // percentage={'9.12%'}
                    // trend={"up"}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <LineChartSkeleton title="Scans" />
                  ) : (
                    <LineChart
                      title={"Scans"}
                      chartData={
                        popcardDetailStats?.scan_chart_data ?
                          popcardDetailStats?.scan_chart_data[0] : []
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={"info"}
          sx={{ width: "100%" }}
        >
          Copied to clipboard
        </Alert>
      </Snackbar>
      {
        isError && (
          <PopcardSnackbar
            message={error?.data?.message}
            severity="error"
          />
        )
      }
    </Box>
  );
};

export default PopcardDetails;
