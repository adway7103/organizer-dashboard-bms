import "./Profile.css";
import "./ProfileSocial.tsx";
import ProfileSocial from "./ProfileSocial.tsx";
import { Link } from "react-router-dom";
import { useOrganizerContext } from "../../Contexts/OrganizerProfileContext.tsx";

const Profile = () => {
  const { organizerProfile } = useOrganizerContext();

  const profileSocials = [
    {
      site: "Kafsco",
      link: `https://www.kafsco.com/organization/${organizerProfile?.orgId}`,
      img: "/kafsco.png",
    },
    {
      site: "Instagram",
      link: organizerProfile?.instagramAccUrl ?? "",
      img: "/ig_icon.png",
    },
    {
      site: "Tiktok",
      link: organizerProfile?.tiktokAccUrl ?? "",
      img: "/tiktok_icon.png",
    },
    {
      site: "Facebook",
      link: organizerProfile?.twiiterAccUrl ?? "",
      img: "/fb_icon.png",
    },
    {
      site: "Twitter",
      link: organizerProfile?.instagramAccUrl ?? "",
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
    <section className="md:w-1/2 w-full md:px-0 px-5 mx-auto pb-10">
      <h1 className="font-semibold text-2xl pb-4">Profile Details</h1>
      <div className="flex flex-col items-center gap-4 w-full p-5 border-2 rounded-2xl">
        <img
          src={organizerProfile?.logoUrl}
          className="pfp object-cover rounded-full"
          alt="img"
        />
        <h3 className="font-semibold text-lg">{organizerProfile?.name}</h3>

        <div className="profile-info grid sm:grid-cols-2 gap-4 w-full">
          <span className="text-center text-sm text-black py-2 profile-border">
            {organizerProfile?.phone ? organizerProfile.phone : "Phone Number"}
          </span>
          <span className="text-center text-sm text-black py-2 profile-border">
            {organizerProfile?.eventCategories?.map(
              (category, index, array) => (
                <span key={category._id}>
                  {category.categoryName}
                  {index < array.length - 1 && ", "}
                </span>
              )
            )}
          </span>
        </div>

        <div className="profile-border profile-desc px-3 py-1 w-full">
          Description
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
