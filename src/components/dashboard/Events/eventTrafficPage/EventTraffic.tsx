import { useEffect, useState } from "react";
import img1 from "../../../../../public/eye.png";
import img2 from "../../../../../public/sold.png";
import img3 from "../../../../../public/icons.png";
import img4 from "../../../../../public/conversionRate.png";
import CountComponent from "./CountComponent";
import TrafficChart from "./TrafficChart";
// import PageVisitByChannels from "./PageVisitByChannels";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { Dayjs } from "dayjs";
// import { TextField } from "@mui/material";
import AttendeesByDevicePie from "./AttendeesByDevice";
import { fetchEventTraffic } from "../../../../api/fetchEventTrafficApi";
import NewOrReturningCustomerPie from "./NewOrReturningPie";
import { useParams } from "react-router-dom";

interface EventTrafficResponse {
  pageViews: number;
  orderSold: number;
  ticketSold: number;
  conversionRate: string;
  monthlyViewData: Record<string, number>; // Map months (e.g., Jan, Feb) to numbers
  pageVisitByChannel: {
    direct: number;
    shareUrl: number;
  };
  attendeeByDevice: {
    mobile: {
      number: number;
      percentage: string;
    };
    tablet: {
      number: number;
      percentage: string;
    };
    laptop: {
      number: number;
      percentage: string;
    };
  };
  newVsReturning: {
    returning: {
      number: string;
      percentage: string;
    };
    new: {
      number: string;
      percentage: string;
    };
  };
}

const EventTraffic = () => {
  const { eventId } = useParams();

  // const [formData, setFormData] = useState({
  //   startDate: null,
  // });
  const [eventTrafficData, setEventTrafficData] =
    useState<EventTrafficResponse | null>(null);

  const countComponentData = [
    {
      icon: img1,
      heading: "Page Views",
      count: eventTrafficData?.pageViews,
    },
    {
      icon: img2,
      heading: "Orders Sold",
      count: eventTrafficData?.orderSold,
    },
    {
      icon: img3,
      heading: "Tickets Sold",
      count: eventTrafficData?.ticketSold,
    },
    {
      icon: img4,
      heading: "Conversion Rate",
      count: eventTrafficData?.conversionRate,
    },
  ];
  const fetchData = async () => {
    const response = await fetchEventTraffic({ eventId });
    setEventTrafficData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const handleDateChange = (date: Dayjs | null, name: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: date,
  //   }));
  // };

  return (
    <div className="sm:ml-12 sm:mr-28 space-y-8 min-w-[300px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {" "}
        {countComponentData.map((item, index) => (
          <CountComponent
            key={index}
            icon={item.icon}
            heading={item.heading}
            count={item?.count}
          />
        ))}
      </div>

      <div>
        <div className="grid lg:grid-cols-3 gap-x-6 max-lg:space-y-8">
          {/* <div className="col-span-2 lg:h-[550px] flex flex-col md:justify-between"> */}
          <div className="col-span-2 lg:h-[450px] flex flex-col md:justify-between">
            <div>
              <TrafficChart data={eventTrafficData?.monthlyViewData} />
            </div>
            {/* <div>
              <div className="font-medium mb-3 text-2xl mt-6">
                Filter by Date
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
                <div className="">
                  <TextField
                    label="Custom"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "56px",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderRadius: "12px",
                        },
                      },
                    }}
                  />
                </div>
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startDate")
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              height: "56px",
                              borderRadius: "12px",
                              "& fieldset": {
                                borderRadius: "12px",
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startDate")
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              height: "56px",
                              borderRadius: "12px",
                              "& fieldset": {
                                borderRadius: "12px",
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="col-span-1">
            <PageVisitByChannels />
          </div> */}
        </div>
      </div>
      <div className="sm:flex gap-x-8 max-sm:space-y-8">
        <div>
          <AttendeesByDevicePie
            heading="Attendees by Device"
            mobile={eventTrafficData?.attendeeByDevice.mobile}
            tablet={eventTrafficData?.attendeeByDevice.tablet}
            laptop={eventTrafficData?.attendeeByDevice.laptop}
          />
        </div>
        <div>
          <NewOrReturningCustomerPie
            returning={{
              num: eventTrafficData?.newVsReturning.returning.number || "0",
              percentage:
                eventTrafficData?.newVsReturning.returning.percentage || "0%",
            }}
            newCustomer={{
              num: eventTrafficData?.newVsReturning.new.number || "0",
              percentage:
                eventTrafficData?.newVsReturning.new.percentage || "0%",
            }}
            width={220}
          />
        </div>
      </div>
    </div>
  );
};

export default EventTraffic;
