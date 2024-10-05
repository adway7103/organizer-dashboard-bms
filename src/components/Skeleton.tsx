import { Skeleton } from "@mui/material";

const SkeletonComponent = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} w-full bg-gray-100 flex flex-col justify-center items-center`}
    >
      <Skeleton variant="text" width={140} height={30} />
      <Skeleton variant="text" width={40} height={30} />
    </div>
  );
};

export default SkeletonComponent;
