import "./Profile.css";
import "./ProfileSocial.tsx";
import ProfileSocial from "./ProfileSocial.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrganizationProfile } from "../../api/fetchProfileApi.ts";
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
  about: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<OrganizerProfile>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedCategories = await fetchOrganizationProfile();
        if (fetchedCategories) {
          setProfileData(fetchedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchProfile();
  }, []);

  const profileSocials = [
    {
      site: "Kafsco",
      link: `https://www.kafsco.com/organization/${profileData?.orgId}`,
      img: "/kafsco.png",
    },
    {
      site: "Instagram",
      link: profileData?.instagramAccUrl ?? "",
      img: "/ig_icon.png",
    },
    {
      site: "Tiktok",
      link: profileData?.tiktokAccUrl ?? "",
      img: "/tiktok_icon.png",
    },
    {
      site: "Facebook",
      link: profileData?.twiiterAccUrl ?? "",
      img: "/fb_icon.png",
    },
    {
      site: "Twitter",
      link: profileData?.instagramAccUrl ?? "",
      img: "/twitter_icon.png",
    },
    {
      site: "Your website",
      link: "",
      img: "/link_icon.png",
    },
  ];

  console.log(profileSocials);

  return (
    <section className="md:w-1/2 w-full md:px-5 mx-auto pb-10">
      <h1 className="font-semibold text-2xl pb-4">Profile Details</h1>
      <div className="flex flex-col items-center gap-4 w-full p-5 border-2 rounded-2xl">
        {profileData?.logoUrl ? (
          <img
            src={profileData?.logoUrl}
            className="pfp object-cover rounded-full"
            alt=""
          />
        ) : (
          <SizeAvatars />
        )}

        <h3 className="font-semibold text-lg">{profileData?.name}</h3>

        <div className="profile-info grid sm:grid-cols-2 gap-4 w-full">
          <span className="text-center text-sm text-black py-2 profile-border">
            {profileData?.phone ? profileData.phone : "Phone Number"}
          </span>
          <span className="flex items-center text-sm text-black  py-2 profile-border overflow-x-auto whitespace-nowrap">
            {profileData?.eventCategories?.map((category, index, array) => (
              <span key={category._id}>
                {category.categoryName}
                {index < array.length - 1 && "  , "}
              </span>
            ))}
          </span>
        </div>

        <div className="profile-border profile-desc px-3 py-1 w-full">
          {profileData?.about}{" "}
        </div>

        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 w-full">
          {profileSocials.map((social, index) => (
            <ProfileSocial
              key={index}
              link={social.link}
              site={social.site}
              img={social.img}
            />
          ))}
        </div>
        <Link
          to={"/profile/edit"}
          className="ms-auto text-center px-5 p-1 btn text-white text-sm rounded-full"
        >
          Edit Profile
        </Link>
      </div>
    </section>
  );
};

export default Profile;

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function SizeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt=""
        src="/static/images/avatar/1.jpg"
        sx={{ width: 150, height: 150 }}
      />
    </Stack>
  );
}
