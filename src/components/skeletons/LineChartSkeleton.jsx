// styling
import "../../styles/LineChart.css";
import {
  Skeleton,
  Box,
  Container,
  Typography
} from "@mui/material";
// utils
import { PropTypes } from "prop-types";

function LineChartSkeleton({ title }) {
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
          </Container>
        </Container>
        {Array.from(new Array(10)).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </Box>
    </>
  );
}

LineChartSkeleton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LineChartSkeleton;
