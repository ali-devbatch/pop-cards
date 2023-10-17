// styling
import "../../styles/ProfilePopcard.css";
import { Box, Container, Skeleton } from "@mui/material";

function ProfilePopcardSkeleton() {
  return (
    <Container>
      <Box className="profileSkeletonContainer">
        {/* copy button */}
        <Box display={"flex"} gap={1}>
          <Skeleton variant="text" width={200} />
          <Skeleton width={30} height={30} />
        </Box>
        {/* image */}
        <Skeleton
          variant="rounded"
          width={150}
          height={150}
        />
        {/* name */}
        <Box display={"flex"} gap={1}>
          <Skeleton variant="text" width={120} />
          <Skeleton width={30} height={30} />
        </Box>
        {/* active button */}
        <Skeleton width={80} height={40} />

        {/* target and other buttons */}
        <Box>
          <Skeleton variant="text" width={120} />
          <Skeleton width={450} height={80} />
          <Skeleton width={450} height={80} />
          <Skeleton variant="text" width={200} />
          <Skeleton width={450} height={80} />
          <Skeleton width={450} height={80} />
        </Box>
      </Box>
    </Container>
  );
}

export default ProfilePopcardSkeleton;
