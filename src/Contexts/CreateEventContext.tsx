import React, { createContext, useState, useContext, ReactNode } from "react";
import { Dayjs } from "dayjs";

interface VenueAddress {
  name: string;
  city: string;
  country: string;
  zipcode: string;
}

interface VenueLocation {
  latitude: number;
  longitude: number;
}

export interface EventInfo {
  title: string;
  organizer: string;
  eventCategories: string[];
  genres: string[];
  description: string;
  posterUrl: string;
  cheapestTicket: {
    currency: string;
    amount: string;
  };
  eventStartDate?: Dayjs | null;
  eventStartTime?: Dayjs | null;
  eventEndDate?: Dayjs | null;
  eventEndTime?: Dayjs | null;
  eventMode: string;
  venueAddress: VenueAddress;
  venueLocation: VenueLocation;
  refundPolicy: {
    refundTimeframe: string;
    policyType: boolean;
    allRefundsApproved: boolean;
  };
  isRep: boolean;
  periodicity: string;
  eventStart?: string;
  eventEnd?: string;
  duration: string;
}

interface EventContextProps {
  eventInfo: EventInfo;
  setEventInfo: React.Dispatch<React.SetStateAction<EventInfo>>;
}

const defaultEventInfo: EventInfo = {
  title: "",
  organizer: "",
  eventCategories: [],
  genres: [],
  description: "",
  posterUrl: "",
  cheapestTicket: {
    currency: "",
    amount: "",
  },
  eventStartDate: null,
  eventStartTime: null,
  eventEndDate: null,
  eventEndTime: null,
  eventMode: "",
  venueAddress: { name: "", city: "", country: "", zipcode: "" },
  venueLocation: { latitude: 0, longitude: 0 },
  refundPolicy: {
    refundTimeframe: "",
    policyType: false,
    allRefundsApproved: false,
  },
  isRep: false,
  periodicity: "",
  eventStart: "",
  eventEnd: "",
  duration: "",
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
