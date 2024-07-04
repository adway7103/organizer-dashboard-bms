import React, { createContext, useState, ReactNode } from 'react';

interface EventInfos {
  eventName: string | null;
  eventCategory: string | null;
  eventPeriodicity: string | null;
  eventDescription: string | null;
  eventImage: string | null;
  eventTags: string[];
  eventCurrency: string | null;
  eventStartDate: string | null;
  eventStartTime: string | null;
  eventEndDate: string | null;
  eventEndTime: string | null;
  eventLocation: string | null;
}

interface EventContextProps {
  eventInfos: EventInfos;
  setEventInfos: React.Dispatch<React.SetStateAction<EventInfos>>;
}

export const EventContext = createContext<EventContextProps | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [eventInfos, setEventInfos] = useState<EventInfos>({
    eventName: null,
    eventCategory: null,
    eventPeriodicity: null,
    eventDescription: null,
    eventImage: null,
    eventTags: [],
    eventCurrency: null,
    eventStartDate: null,
    eventStartTime: null,
    eventEndDate: null,
    eventEndTime: null,
    eventLocation: null,
  });

  const providerValue = { eventInfos, setEventInfos };

  return (
    <EventContext.Provider value={providerValue}>
      {children}
    </EventContext.Provider>
  );
};
