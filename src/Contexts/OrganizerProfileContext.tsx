import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrganizationProfile } from "../api/fetchProfileApi";

interface EventCategory {
  _id: string;
  categoryName: string;
}

interface OrganizerProfile {
  countryCode: any;
  orgId: string;
  name: string;
  slug: string;
  logoUrl: string;
  eventCategories: EventCategory[];
  facebookAccUrl: string;
  instagramAccUrl: string;
  twiiterAccUrl: string;
  followersCount: number;
  followingCount: number;
  phone: string;
  tiktokAccUrl: string;
}

interface OrganizerContextValue {
  organizerProfile: OrganizerProfile | null;
  loading: boolean;
  error: string | null;
}

const OrganizerContext = createContext<OrganizerContextValue>({
  organizerProfile: null,
  loading: true,
  error: null,
});

export const OrganizerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [organizerProfile, setOrganizerProfile] =
    useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await fetchOrganizationProfile();
        console.log(profileData);

        setOrganizerProfile(profileData);
      } catch (err) {
        setError("Failed to fetch organizer profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <OrganizerContext.Provider value={{ organizerProfile, loading, error }}>
      {children}
    </OrganizerContext.Provider>
  );
};

export const useOrganizerContext = () => {
  return useContext(OrganizerContext);
};
