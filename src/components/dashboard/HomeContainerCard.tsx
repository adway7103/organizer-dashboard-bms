import { cn } from "../../utils/index";

function HomeContainerCard({ children, className }: any) {
  return (
    <div
      className={cn(
        "h-[400px] rounded-lg flex flex-col gap-1 bg-blue-box shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

export default HomeContainerCard;
