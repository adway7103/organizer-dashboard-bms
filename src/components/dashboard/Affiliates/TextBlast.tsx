import HomeContainerCard from "../HomeContainerCard";

interface Props {
  className?: string;
  heading?: string;
}
const TextBlast = ({ className, heading }: Props) => {
  return (
    <HomeContainerCard className="h-auto sm:h-[10vh] mt-4 shadow-none">
      <div
        className={`flex h-16 justify-center items-center pl-4 text-[1rem] border border-gray-700 rounded-full text-white ${className}`}
      >
        {heading ? heading : "Send A Text Blast"}{" "}
      </div>
    </HomeContainerCard>
  );
};

export default TextBlast;
