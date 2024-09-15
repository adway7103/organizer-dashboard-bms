import styled from 'styled-components';
import eye from "../../../../../public/eye.png";

const StyledPageVisitByChannels = styled.div`
  background: #f0f1f5;
  border-radius: 1.5rem;
  padding-top: 0.5rem;
  height: 550px;
  overflow-y: auto;

  /* Scoped styles for WebKit-based browsers */
  &::-webkit-scrollbar {
    width: 12px; /* Width of the vertical scrollbar */
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px; /* Rounded corners of the track */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #924d7b; /* Purple color for the scrollbar thumb */
    border-radius: 10px; /* Rounded corners of the thumb */
    border: 2px solid #f0f1f5; /* Border color around the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #7a3a6a; /* Darker purple on hover */
  }
`;

const DirectTrafficComponent = () => {
  return (
    <div className="bg-white ml-6 mr-6 rounded-lg p-4 space-y-1">
      <div className="flex justify-between items-center">
        <div className="text-lg sm:text-xl font-medium">Direct Traffic</div>
        <img src={eye} alt="" className="h-4" />
      </div>
      <div className="flex justify-between items-center gap-14">
        <div className="text-xs sm:text-sm">Marketing created outside of eventbrite</div>
        <div className="flex flex-row gap-2 max-sm:text-sm">
          <div>400 </div> 56%
        </div>
      </div>
    </div>
  );
};

const PageVisitByChannels = () => {
  return (
    <StyledPageVisitByChannels>
      <div>
        <h1 className="text-2xl flex justify-center font-medium">
          Page visits by channels
        </h1>
      </div>
      <div className="flex justify-end mr-6">
        <div className="bg-[#dfe4ea] flex p-2 px-3 gap-2 rounded-lg">
          <div>
            <img src={eye} alt="" className="h-4" />
          </div>{" "}
          <div className="text-xs">Hide All</div>{" "}
        </div>
      </div>
      <div className="space-y-4 pt-2">
        <DirectTrafficComponent />
        <DirectTrafficComponent />
        <DirectTrafficComponent />
        <DirectTrafficComponent />
        <DirectTrafficComponent />
        <DirectTrafficComponent />
        <DirectTrafficComponent />
        <DirectTrafficComponent />
      </div>
    </StyledPageVisitByChannels>
  );
};

export default PageVisitByChannels;
