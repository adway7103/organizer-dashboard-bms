import { TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/createEventApi";
import { MuiTelInput } from "mui-tel-input";
import FileDragNDrop from "../../components/DragNDrop/FileDragNDrop";
import toast from "react-hot-toast";
import { updateProfile, UpdateDataType } from "../../api/updateProfile.ts";
import { uploadImage } from "../../api/uploadImage.ts";
import FormDialog from "./Dialog.tsx";
import { fetchOrganizationProfile } from "../../api/fetchProfileApi.ts";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
interface EventCategory {
  categoryId: string;
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

const EditProfile = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [eventCategories, setCategory] = useState<string[]>([]);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [facebookAccUrl, setFacebookAccUrl] = useState<string>("");
  const [instagramAccUrl, setInstagramAccUrl] = useState<string>("");
  const [twiiterAccUrl, setTwiitterAccUrl] = useState<string>("");
  const [tiktokAccUrl, setTiktokAccUrl] = useState<string>("");
  const [orgWebsiteUrl, setOrgWebsiteUrl] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        if (fetchedCategories) {
          setCategories(fetchedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const [profileData, setProfileData] = useState<OrganizerProfile>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await fetchOrganizationProfile();
        if (fetchedProfile) {
          setProfileData(fetchedProfile);

          if (fetchedProfile.eventCategories) {
            setCategory(
              fetchedProfile.eventCategories.map((cat: any) => cat._id)
            );
          }

          setName(fetchedProfile.name || "");
          if (fetchedProfile.countryCode && fetchedProfile.phone) {
            setPhone(`${fetchedProfile.countryCode} ${fetchedProfile.phone}`);
          } else {
            setPhone("");
          }
          setAbout(fetchedProfile.about || "");
          setFacebookAccUrl(fetchedProfile.facebookAccUrl || "");
          setInstagramAccUrl(fetchedProfile.instagramAccUrl || "");
          setTwiitterAccUrl(fetchedProfile.twiiterAccUrl || "");
          setTiktokAccUrl(fetchedProfile.tiktokAccUrl || "");
          setOrgWebsiteUrl(fetchedProfile.orgWebsiteUrl || "");
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSelectChange = (event: any) => {
    setCategory(event.target.value as string[]);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!profileData) {
      throw new Error("Organizer profile is required to update.");
    }
    setLoading(true);
    const id = profileData.orgId;
    let imageUrl = profileData.logoUrl;

    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    const data: UpdateDataType = {
      name,
      phone,
      eventCategories,
      logoUrl: imageUrl,
      facebookAccUrl,
      instagramAccUrl,
      twiiterAccUrl,
      tiktokAccUrl,
      orgWebsiteUrl,
      about,
    };

    try {
      if (Object.keys(data).length > 0) {
        await updateProfile(data as UpdateDataType, id);
        toast.success("Update successful");
        navigate("/profile");
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Failed to update profile", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((msg: string) => toast.error(msg));
        } else if (typeof errorMessage === "string") {
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [socials, setSocials] = useState([
    {
      id: "1",
      site: "Kafsco",
      link: `https://www.kafsco.com/organization/${profileData?.orgId}`,
      img: "/kafsco.png",
    },
    {
      id: "2",
      site: "Instagram",
      link: profileData?.instagramAccUrl ?? "",
      img: "/ig_icon.png",
    },
    {
      id: "3",
      site: "Tiktok",
      link: profileData?.tiktokAccUrl ?? "",
      img: "/tiktok_icon.png",
    },
    {
      id: "4",
      site: "Facebook",
      link: profileData?.facebookAccUrl ?? "",
      img: "/fb_icon.png",
    },
    {
      id: "5",
      site: "Twitter",
      link: profileData?.twiiterAccUrl ?? "",
      img: "/twitter_icon.png",
    },
    {
      id: "6",
      site: "Your website",
      link: "",
      img: "/link_icon.png",
    },
  ]);

  const handleLinkUpdate = (id: string, newLink: string) => {
    if (id === "2") {
      setInstagramAccUrl(newLink);
      return;
    }
    if (id === "3") {
      setTiktokAccUrl(newLink);
      return;
    }
    if (id === "4") {
      setFacebookAccUrl(newLink);
      return;
    }
    if (id === "5") {
      setTwiitterAccUrl(newLink);
      return;
    }
    if (id === "6") {
      setOrgWebsiteUrl(newLink);
      return;
    }
    setSocials((prevSocials) =>
      prevSocials.map((social) =>
        social.id === id ? { ...social, link: newLink } : social
      )
    );
  };

  const handleDiscard = async (e: any) => {
    e.preventDefault();

    if (!profileData) return;

    setName(profileData.name || "");
    setPhone(`${profileData.countryCode}${profileData.phone}` || "");
    setFacebookAccUrl(profileData.facebookAccUrl || "");
    setInstagramAccUrl(profileData.instagramAccUrl || "");
    setTwiitterAccUrl(profileData.twiiterAccUrl || "");
    setTiktokAccUrl(profileData.tiktokAccUrl || "");
    setOrgWebsiteUrl("");
    setCategory(profileData.eventCategories.map((cat: any) => cat._id));
    setAbout(profileData.about);
    if (profileData.countryCode && profileData.phone) {
      setPhone(`${profileData.countryCode} ${profileData.phone}`);
    } else {
      setPhone("");
    }
  };

  return (
    <>
      <form>
        <h1 className="text-2xl font-semibold md:ml-10">Edit Details</h1>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 border-2 w-[80%] sm:ml-8 min-w-[300px] p-8 gap-8 rounded-3xl">
          <div className="col-span-6 max-md:space-y-6 md:col-span-4 flex flex-col justify-between">
            <TextField
              id="eventName"
              name="title"
              label="Name of the organization"
              placeholder="Be clear and descriptive with the title that tells people what your event is about."
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  height: "56px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "16px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "darkgray", // Set border color to gray
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgray", // Maintain gray border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "darkgray", // Maintain gray border color when focused
                  },
                },
              }}
            />

            <div className="md:grid grid-cols-2 gap-8 mb-3">
              <div className="col-span-1">
                <InputLabel id="phone-label">Phone</InputLabel>
                <MuiTelInput
                  name="phone"
                  id="phone"
                  defaultCountry="US"
                  variant="outlined"
                  value={phone}
                  onChange={(e: any) => setPhone(e)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflow: "auto",
                        marginTop: "2px",
                      },
                    },
                  }}
                  sx={{
                    height: "56px",
                    borderRadius: "4px", // Same border radius as Select
                    "& .MuiOutlinedInput-root": {
                      height: "100%", // Ensure the root spans full height
                      display: "flex",
                      alignItems: "center",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                      "& input": {
                        lineHeight: "56px", // Align the text vertically
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "gray", // Keep the border color same when focused
                      },
                    },
                  }}
                />
              </div>
              <div className="col-span-1 max-md:mt-4">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="eventCategories"
                  multiple
                  value={eventCategories}
                  onChange={handleSelectChange}
                  fullWidth
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflow: "auto",
                        borderRadius: "4px",
                        marginTop: "2px",
                      },
                    },
                  }}
                  sx={{
                    height: "56px",
                    borderRadius: "4px", // Border radius for consistency
                    ".MuiSelect-select": {
                      padding: "10px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "darkgray", // Darker border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "darkgray", // Keep border color same on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "darkgray", // Keep border color same when focused
                    },
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Select category</em>
                  </MenuItem>
                  {categories.slice(1).map((category) => (
                    <MenuItem
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <TextField
              id="description"
              name="description"
              label="Description"
              multiline
              rows={2}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "darkgray", // Set the default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgray", // Keep border color same on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "darkgray", // Keep border color same when focused
                  },
                },
              }}
            />
          </div>

          <div className="col-span-6 md:col-span-2 ">
            <FileDragNDrop
              onFileSelect={handleFileSelect}
              ClassName="p-4 border-gray-400 rounded-md"
            />
          </div>

          <div className="col-span-6 max-md:space-y-4 md:grid grid-cols-3 md:gap-4 gap-2 w-full">
            {socials.map((social, index) => (
              <ProfileSocials
                id={social.id}
                key={index}
                link={social.link}
                site={social.site}
                img={social.img}
                handleLinkUpdate={handleLinkUpdate}
              />
            ))}
          </div>
          <div className="col-span-6 flex justify-center items-center gap-6">
          <button
              onClick={handleDiscard}
              className="flex flex-row items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-4 rounded"

            >
              DISCARD CHANGES
            </button>
            <button
              onClick={formSubmitHandler}
              className="flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-4 rounded"
              >
              SAVE CHANGES{" "}
              {loading && <Loader2 className="size-4 animate-spin" />}

            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;

interface ProfileSocialProps {
  site: string;
  link: string;
  img?: string;
  id: string;
  handleLinkUpdate: any;
}

const ProfileSocials: React.FC<ProfileSocialProps> = ({
  handleLinkUpdate,
  id,
  site,
  link,
  img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8WEJEU9Zmrt_U-WdctDumYnDEumr1Jv0UEw&s",
}) => {
  const [updatedLink, setUpdatedLink] = useState(link);

  useEffect(() => {
    setUpdatedLink(link);
  }, [link]);

  const handleLink = (newLink: any) => {
    handleLinkUpdate(id, newLink);
    setUpdatedLink(newLink);
  };

  return (
    <div className="profile-border p-2 flex justify-between">
      <div className="flex">
        <img
          src={img}
          alt="social-img"
          className="social-img p-1 rounded-full"
        />
        <div className="ml-2">
          <p className="text-xs font-semibold text-gray-600">{site}</p>
          {updatedLink && (
            <Link to={updatedLink} target="_blank">
              <p className="text-xs text-blue-900 underline">Link</p>
            </Link>
          )}
        </div>
      </div>
      <FormDialog id={id} currentLink={updatedLink} onUpdateLink={handleLink} />
    </div>
  );
};
