import React, { createContext, useState, useContext, ReactNode } from "react";
import { Dayjs } from "dayjs";

// organizer genres venueLocation[map] trailerUrls timezone duration ageRestriction isBookingRequired bookingOpeningDate bookingClosingDate languages missing

export interface EventInfo {
  title: string;
  organizer: string;
  eventCategories: string[];
  genres: string[];
  description: string;
  periodicity?: string;
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
  venueAddress: {
    name: string;
    city: string;
    country: string;
    zipcode: string;
  };
  venueLocation: {
    latitude: number;
    longitude: number;
  };
  trailerUrls: string[];
  timezone: string;
  duration: string;
  ageRestriction: string;
  isBookingRequired: boolean;
  bookingOpeningDate: string;
  bookingClosingDate:string;
  languages: string[];
  repEvent?: boolean;
  eventPolicy?: boolean;
  allRefundsApproved?: boolean;
  lastEntry?: boolean;
  entryCondition?: boolean;
  eventIsPrivate?: boolean;
  separateBooking?: boolean;
  limitTotal?: boolean;
  eventStart?:string;
  eventEnd?:string
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
  periodicity: "",
  posterUrl: "",
  cheapestTicket: {
    currency:"currency 1",
    amount: "",
  },
  eventStartDate: null,
  eventStartTime: null,
  eventEndDate: null,
  eventEndTime: null,
  eventMode: "",
  venueAddress: {
    name: "",
    city: "",
    country: "",
    zipcode: "",
  },
  venueLocation: {
    latitude: 0,
    longitude: 0,
  },
  trailerUrls: [],
  timezone: "",
  duration: "",
  ageRestriction: "",
  isBookingRequired: false,
  bookingOpeningDate: "",
  bookingClosingDate: "",
  languages: [],
  repEvent: false,
  eventPolicy: false,
  allRefundsApproved: false,
  lastEntry: false,
  entryCondition: false,
  eventIsPrivate: false,
  separateBooking: false,
  limitTotal: false,
  eventStart:"",
  eventEnd:"",
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
