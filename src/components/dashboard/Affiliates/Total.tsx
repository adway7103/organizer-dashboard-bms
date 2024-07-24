import HomeContainerCard from "../HomeContainerCard";
import AffiliatePieChart from "../Affiliates/AffiliatePieChart";
import img from "../../../../public/affiliates/image.png";
import yellow from "../../../../public/affiliates/yellow.png";
import blue from "../../../../public/affiliates/blue.png";
import purple from "../../../../public/affiliates/purple.png";

interface PropsType {
  heading: string;
}
const Total = ({ heading }: PropsType) => {
  return (
    <HomeContainerCard className="h-auto border border-gray-300 rounded-3xl min-w-[300px] w-full xl:pr-10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center">
          <AffiliatePieChart />
        </div>
        <div className="xl:pl-14 flex flex-col justify-center items-center pb-2 gap-y-6">
          <div className="font-semibold text-xl">{heading}</div>
          <div className="text-sm pr-8 space-y-2">
            <div className="flex items-center justify-between pl-4 lg:p-0 space-x-6 gap-x-8 lg:space-x-0 lg:gap-x-0">
              <div className="flex justidy-center items-center">
                <div>
                  <img src={img} alt="" className="" />
                </div>
                <div className="pl-3">WEFVWRFWE</div>
              </div>
              <div className="flex pl-2 justify-center items center">
                <div>
                  <img src={yellow} alt="" className="mt-1 xl:mt-2" />
                </div>
                <div className="pl-1">2,000</div>
              </div>
            </div>
            <div className="flex items-center justify-between pl-4 lg:p-0 space-x-6 gap-x-8 lg:space-x-0 lg:gap-x-0">
              <div className="flex justidy-center items-center">
                <div>
                  <img src={img} alt="" className="" />
                </div>
                <div className="pl-3">WEFVWRFWE</div>
              </div>
              <div className="flex pl-2 justify-center items center">
                <div>
                  <img src={blue} alt="" className="mt-1 xl:mt-2" />
                </div>
                <div className="pl-1">2,000</div>
              </div>
            </div>
            <div className="flex items-center justify-between pl-4 lg:p-0 space-x-6 gap-x-8 lg:space-x-0 lg:gap-x-0">
              <div className="flex justidy-center items-center">
                <div>
                  <img src={img} alt="" className="" />
                </div>
                <div className="pl-3">WEFVWRFWE</div>
              </div>
              <div className="flex pl-2">
                <div>
                  <img src={purple} alt="" className="mt-1 xl:mt-2" />
                </div>
                <div className="pl-1">2,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default Total;
