// styling
import "../../styles/Main.css";
import "../../styles/PieChart.css";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import ChartDataLabels from "chartjs-plugin-datalabels";
import noDataFoundIllustration from "../../assets/noDataFound1.svg";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
ChartJS.defaults.font.family = "'sans-serif', 'Helvetica Neue', 'Helvetica', 'Font Awesome 6 Free', 'Font Awesome 6 Brands'";
ChartJS.defaults.font.weight = "510"

// const counter = {
//   id: 'counter',
//   beforeDraw(chart, args, options) {
//     const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
//     ctx.save();
//     ctx.font = options.fontSize + ' ' + options.fontFamily;
//     ctx.textAlign = 'center';
//     ctx.fillStyle = options.fontColor;
//     ctx.fillText(100, width / 2, (height / 2) + 80);
//   }
// };
const PieChart = ({ chartData }) => {
  const maxWidth1440 = useMediaQuery("(max-width: 1440px)");
  const minWidth1280 = useMediaQuery("(min-width: 1280px)");

  const labelFontSize = minWidth1280 && maxWidth1440 ? "10px" : "14px";
  const options = {
    responsive: true,
    spacing: 20,
    borderRadius: 5,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const datapoints = context.chart.data.datasets[0].data;

          function totalSum(total, datapoints) {
            return total + datapoints;
          }
          const totalvalue = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalvalue) * 100).toFixed(1);

          return `${percentageValue}%`;
        },
        color: "#fff",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: labelFontSize,
            },
          },
        }
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        intersect: false,
        mode: 'nearest',
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
            return 'Scans: ' + tooltipItems[0].raw;
          },
          label: function (tooltipItem) {
            return tooltipItem.label;
          }
        },
      },
    },
  };

  const extractCountProperty = (objectsArray) => {
    const countArray = [];

    for (const obj of objectsArray) {
      if (obj.hasOwnProperty("count")) {
        countArray.push(obj.count);
      }
    }

    return countArray;
  };

  const extractTargetValues = (objectsArray) => {
    const targetValueArray = [];
    for (const obj of objectsArray) {
      if (obj.hasOwnProperty("_id") && (obj._id.hasOwnProperty("target_value") || obj._id.hasOwnProperty("label"))) {
        let target_type = obj._id.target_type;
        let icon = null;
        if (target_type === "google") {
          icon = '\uf1a0';
        } else if (target_type === "instagram") {
          icon = `\uf16d`;
        } else if (target_type === "url") {
          icon = "\uf0ac";
        }

        let label = obj._id.label || '';
        let targetValue = obj._id.target_value || '';

        if (label.length > 35) {
          label = label.substring(0, 35) + '...';
        }

        if (targetValue.length > 35) {
          targetValue = targetValue.substring(0, 35) + '...';
        }

        let targetValueString = `${icon} ${label || targetValue}`;
        targetValueArray.push(targetValueString);
      }
    }
    return targetValueArray;
  };

  return (
    <Box container className="pieChartContainer">
      <Container className="pieChartHeader">
        <Container className="pieChartHeaderTitle">
          <Typography
            style={{
              color: "#A1A5B7",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Statistics
          </Typography>
          <Typography
            style={{
              color: "#3F4254",
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Scans per target
          </Typography>
        </Container>
      </Container>
      {chartData.length > 0 ? (
        <Doughnut
          data={{
            labels: extractTargetValues(chartData),
            datasets: [
              {
                label: "# of Scans",
                data: extractCountProperty(chartData),
                backgroundColor: ["#5EEAD4", "#A78BFA", "#FFC700", "#FB923C"],
                borderColor: ["#5EEAD4", "#A78BFA", "#FFC700", "#FB923C"],
                borderWidth: 1,
              },
            ],
          }}
          options={options}
          plugins={[
            // counter,
            ChartDataLabels,
          ]}
          className="pieChartSize"
        />
      ) : (
        <Box className="noDataFoundIllustrationLineChart">
          <img
            src={noDataFoundIllustration}
            alt="No pie chart data found"
            style={{ maxWidth: "500px", width: "auto", marginTop: "50px" }}
          />
          <Typography className="noDataFoundIllustrationLineChartText">
            No data matches your request at this time.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

PieChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};

export default PieChart;
