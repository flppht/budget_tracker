import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonItems = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width={300} height={60} />
      <Skeleton variant="rounded" width={300} height={60} />
      <Skeleton variant="rounded" width={300} height={60} />
      <Skeleton variant="rounded" width={300} height={60} />
      <Skeleton variant="rounded" width={300} height={60} />
      <Skeleton variant="rounded" width={300} height={60} />
      <Skeleton variant="rounded" width={300} height={60} />
    </Stack>
  );
};

export default SkeletonItems;
