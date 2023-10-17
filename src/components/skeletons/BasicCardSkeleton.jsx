// styling
import { Skeleton, Container } from "@mui/material";
import "../../styles/BasicCard.css";

function BasicCardSkeleton() {
  return (
    <Container className="basicCardSkeleton">
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton width={50} height={30} />
      <Skeleton width={100} />
    </Container>
  );
}

export default BasicCardSkeleton;
