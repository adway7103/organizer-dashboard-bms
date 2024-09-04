interface CountComponentProps {
  image: string;
  text: string;
  num:  any;
}
const CountComponent = ({ image, text, num }: CountComponentProps) => {
  return (
    <div className="border rounded-3xl h-60 w-60 flex justify-center items-center flex-col space-y-4">
      <div>
        {image ? (
          <img src={image} alt="" className="size-6"/>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>
      <div className="text-xl">{text}</div>
      <div className="text-3xl font-medium pt-4">{num}</div>
    </div>
  );
};

export default CountComponent;
