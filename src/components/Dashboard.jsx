import { useState, useEffect } from "react";
// components
import LineChart from "./dashboard/LineChart";
import PieChart from "./dashboard/PieChart";
import BestPerforming from "./popcards/BestPerforming";
import PopcardDateRange from "./inputs/PopcardDateRange";
import PieChartSkeleton from "./skeletons/PieChartSkeleton";
import LineChartSkeleton from "./skeletons/LineChartSkeleton";
import PopcardSnackbar from "./feedback/PopcardSnackbar";
// styling
import "../styles/Main.css";
import "../styles/Dashboard.css";
import "../styles/RSuite.css";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// utils
import {
  navbarSelectedSelector,
  setNavbarSelected,
} from "../redux/userReducer";
import { TimeIntervals } from "../utils/constants";
import { getGreeting } from "../utils/functions";
import { useGetPopcardsStatsQuery } from "../api/services/popcardApiSlice";

export default function Dashboard() {
  const [startDate, setStartDate] = useState(TimeIntervals.oneWeekAgo);
  const [endDate, setEndDate] = useState(TimeIntervals.today);

  const dispatch = useDispatch();
  const navbarSelected = useSelector(navbarSelectedSelector);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;

  const {
    data: popcardStats,
    isLoading,
    isError: isStatusError,
    error: statusError,
    refetch: refetchPopcardsStats,
  } = useGetPopcardsStatsQuery({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  const maxWidth1280 = useMediaQuery("(max-width:1280px)");

  useEffect(() => {
    if (navbarSelected !== "dashboard") {
      dispatch(setNavbarSelected("dashboard"));
    }
  }, []);

  useEffect(() => {
    refetchPopcardsStats({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  }, [startDate, endDate]);

  return (
    <>
      <Box className="dashboardContainer">
        <Grid container>
          <PopcardDateRange
            title={getGreeting(userName)}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <Grid container className="dashboardBody">
            <Grid container>
              <Grid
                item
                xs={maxWidth1280 ? 12 : 7}
                className="dashboardLineChartContainer"
              >
                {isLoading ? (
                  <LineChartSkeleton title="Online Scans" />
                ) : (
                  <LineChart
                    title={"Online Scans"}
                    chartData={popcardStats?.scan_chart_data || []}
                    unit={popcardStats?.unit || ""}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={maxWidth1280 ? 12 : 5}
                className="dashboardPieChartContainer"
              >
                {isLoading ? (
                  <PieChartSkeleton />
                ) : (
                  <PieChart chartData={popcardStats?.target_chart_data || []} />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <BestPerforming />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {isStatusError && (
        <PopcardSnackbar
          message={statusError?.data?.message}
          severity="error"
        />
      )}
    </>
  );
}
