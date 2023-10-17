// styling
import "../../styles/PieChart.css";
import {
  Skeleton,
  Box,
  useMediaQuery,
  Container,
  Typography,
} from "@mui/material";

function PieChartSkeleton() {
  const isMaxWidth350 = useMediaQuery("(max-width: 350px)");
  const isBetween1280And1800 = useMediaQuery(
    "(min-width: 1280px) and (max-width: 1800px)"
  );
  const isBetween350And540 = useMediaQuery(
    "(min-width: 350px) and (max-width: 540px)"
  );
  let skeletonWidth = 400;
  let skeletonHeight = 400;

  if (isMaxWidth350) {
    skeletonWidth = 200;
    skeletonHeight = 200;
  } else if (isBetween350And540) {
    skeletonWidth = 250;
    skeletonHeight = 250;
  } else if (isBetween1280And1800) {
    skeletonWidth = 250;
    skeletonHeight = 250;
  }

  return (
    <Box className="pieChartSkeletonContainer">
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
      <Skeleton
        animation="pulse"
        variant="circular"
        width={skeletonWidth}
        height={skeletonHeight}
        sx={{ marginTop: "10px" }}
      />
    </Box>
  );
}

export default PieChartSkeleton;
