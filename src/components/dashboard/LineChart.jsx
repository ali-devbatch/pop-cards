import { useEffect, useState } from "react";
// styling
import "../../styles/Main.css";
import "../../styles/LineChart.css";
import {
  Container,
  Typography,
  Box,
  // Button
} from "@mui/material";
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import noDataFoundIllustration from "../../assets/noDataFound1.svg";
// utils
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDatesToDayMonth } from "../../utils/functions";
import { PropTypes } from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      displayColors: false,
      intersect: false,
      mode: "nearest",
      backgroundColor: "white",
      titleAlign: "center",
      titleColor: "#667085",
      titleFont: { size: "12px" },
      bodyAlign: "center",
      bodyColor: "#667085",
      bodyFont: { size: 14 },
      bodySpacing: 5,
      xPadding: 15,
      yPadding: 15,
      caretPadding: 10,
      footerAlign: "center",
      footerColor: "black",
      footerFont: { size: 12 },
      borderColor: "#f0f1f3",
      borderWidth: 1,
      cornerRadius: 5,
      caretSize: 0,
      padding: 15,
      callbacks: {
        // This callback swaps scans and date
        title: function (tooltipItems) {
          return "Scans: " + tooltipItems[0].raw;
        },
        label: function (tooltipItem) {
          return tooltipItem.label;
        },
      },
    },
  },
};

const LineChart = ({ title, chartData, unit }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (!chartData) setLabels([]);
    chartData?.x && setLabels(formatDatesToDayMonth(chartData.x, unit));
    chartData?.y && setValues(chartData.y);
  }, [chartData]);

  return (
    <>
      <Box container className="lineChartContainer">
        <Container className="lineChartHeader">
          <Container className="lineChartHeaderTitleContainer">
            <Container className="lineChartHeaderTitle">
              <Typography
                style={{
                  color: "#A1A5B7",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Activity
              </Typography>
              <Typography
                style={{
                  color: "#3F4254",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>
            </Container>
            {/* <Container className='lineChartHeaderSubtitle'>
            <Typography
              style={{
                marginRight: "20px",
                color: "#3F4254",
                fontSize: "34px",
                fontWeight: 600,
              }}
            >
              635
            </Typography>
            <Box className='trendStat'>
              <ArrowUpwardIcon className='trendStatIcon' />
              21.01%
            </Box>
          </Container> */}
          </Container>
          {/* <Container className='lineChartHeaderButtons'>
          <Button
            variant="contained"
            className='filterButton'
          >
            2021
          </Button>
          <Button
            variant="contained"
            className='filterButton'
          >
            2022
          </Button>
          <Button
            variant="contained"
            className='filterButton'
          >
            Month
          </Button>
        </Container> */}
        </Container>
        <Container className="lineChart">
          {labels.length === 0 ? (
            <Box className="noDataFoundIllustrationLineChart">
              <img
                src={noDataFoundIllustration}
                alt="No line chart data found"
                style={{ maxWidth: "500px", width: "auto" }}
              />
              <Typography className="noDataFoundIllustrationLineChartText">
                We couldn't find any relevant data; please review your selected
                date range on the top.
              </Typography>
            </Box>
          ) : (
            <Line
              data={{
                labels,
                datasets: [
                  {
                    label: "Online Scans",
                    data: labels?.map((l, index) => values[index]),
                    borderColor: "#FFBF00",
                    // pointStyle: false,
                    // pointStyle: "circle",
                  },
                ],
              }}
              options={options}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

LineChart.propTypes = {
  title: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default LineChart;
