import React from "react";
import { Link } from "react-router-dom";

interface ProfileSocialProps {
  site: string;
  link: string;
  img?: string;
}

const ProfileSocial: React.FC<ProfileSocialProps> = ({
  site,
  link,
  img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8WEJEU9Zmrt_U-WdctDumYnDEumr1Jv0UEw&s",
}) => {
  return (
    <div className="profile-border p-2 flex">
      <img src={img} alt="social-img" className="social-img p-1 rounded-full" />
      <div className="ml-2">
        <p className="text-xs font-semibold text-gray-600">{site}</p>
        {link ? (
          <Link to={link} target="blank">
            <p className="text-xs text-blue-900 underline">Link</p>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileSocial;
