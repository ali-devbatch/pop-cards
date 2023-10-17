// styling
import "../../styles/BestPerforming.css";
import {
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
} from "@mui/material";

function TableSkeleton() {
  return (
    <TableBody>
      {Array.from(new Array(10)).map((_, index) => (
        <TableRow key={index}>
          <TableCell sx={{ display: "flex", gap: "10px" }}>
            <Skeleton variant="rectangular" width={50} height={50} />
            <Skeleton
              variant="text"
              width={60}
              height={15}
              sx={{ marginTop: "20px" }}
            />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={25} />
          </TableCell>
          <TableCell>
            <Skeleton width={30} sx={{ float: "right" }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={30} sx={{ float: "right" }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={80} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableSkeleton;
