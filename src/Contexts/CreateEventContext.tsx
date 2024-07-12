import React, { createContext, useState, useContext, ReactNode } from "react";
import { Dayjs } from 'dayjs';

interface EventInfo {
  eventName: string;
  category: string;
  periodicity: string;
  description: string;
  image: File | null;
  tags: string[];
  currency: string;
  eventStartDate: Dayjs | null;
  eventStartTime: Dayjs | null;
  eventEndDate: Dayjs | null;
  eventEndTime: Dayjs | null;
  locationType: string;
  location: string;
  repEvent: boolean;
  eventPolicy: boolean;
  allRefundsApproved: boolean;
  lastEntry: boolean;
  entryCondition: boolean;
  eventIsPrivate: boolean;
  separateBooking: boolean;
  limitTotal: boolean;
}

interface EventContextProps {
  eventInfo: EventInfo;
  setEventInfo: React.Dispatch<React.SetStateAction<EventInfo>>;
}

const defaultEventInfo: EventInfo = {
  eventName: "",
  category: "",
  periodicity: "",
  description: "",
  image: null,
  tags: [],
  currency: "",
  eventStartDate: null,
  eventStartTime: null,
  eventEndDate: null,
  eventEndTime: null,
  locationType: "",
  location: "",
  repEvent: false,
  eventPolicy: false,
  allRefundsApproved: false,
  lastEntry: false,
  entryCondition: false,
  eventIsPrivate: false,
  separateBooking: false,
  limitTotal: false,
};

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [eventInfo, setEventInfo] = useState<EventInfo>(defaultEventInfo);
  return (
    <EventContext.Provider value={{ eventInfo, setEventInfo }}>
      {children}
    </EventContext.Provider>
  );
};
