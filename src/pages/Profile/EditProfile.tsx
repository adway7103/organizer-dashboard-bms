import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/createEventApi";
import { MuiTelInput } from "mui-tel-input";
import FileDragNDrop from "../../components/DragNDrop/FileDragNDrop";
import { useOrganizerContext } from "../../Contexts/OrganizerProfileContext.tsx";
import toast from "react-hot-toast";
import { updateProfile, UpdateDataType } from "../../api/updateProfile.ts";
import { uploadImage } from "../../api/uploadImage.ts";
import FormDialog from "./Dialog.tsx";

const EditProfile = () => {
  const { organizerProfile } = useOrganizerContext();
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
  // const [about, setAbout] = useState<string>("");
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

  useEffect(() => {
    if (organizerProfile) {
      setName(organizerProfile.name || "");

      if (organizerProfile.countryCode && organizerProfile.phone) {
        setPhone(`${organizerProfile.countryCode} ${organizerProfile.phone}`);
      } else {
        setPhone("");
      } // setAbout("");
      setFacebookAccUrl("");
      setInstagramAccUrl(organizerProfile.instagramAccUrl || "");
      setTwiitterAccUrl(organizerProfile.twiiterAccUrl || "");
      setTiktokAccUrl(organizerProfile.tiktokAccUrl || "");
      setOrgWebsiteUrl("");
      setCategory([]);
    }
  }, [organizerProfile]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setCategory(event.target.value as string[]);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!organizerProfile) {
      throw new Error("Organizer profile is required to update.");
    }

    setLoading(true);
    const id = organizerProfile.orgId;

    let imageUrl = "";

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
      // about,
    };

    try {
      if (Object.keys(data).length > 0) {
        await updateProfile(data as UpdateDataType, id);
        toast.success("Update successful");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const [socials, setSocials] = useState([
    {
      id: "1",
      site: "Kafsco",
      link: `https://www.kafsco.com/organization/${organizerProfile?.orgId}`,
      img: "/kafsco.png",
    },
    {
      id: "2",
      site: "Instagram",
      link: organizerProfile?.instagramAccUrl ?? "",
      img: "/ig_icon.png",
    },
    {
      id: "3",
      site: "Tiktok",
      link: organizerProfile?.tiktokAccUrl ?? "",
      img: "/tiktok_icon.png",
    },
    {
      id: "4",
      site: "Facebook",
      link: organizerProfile?.facebookAccUrl ?? "",
      img: "/fb_icon.png",
    },
    {
      id: "5",
      site: "Twitter",
      link: organizerProfile?.twiiterAccUrl ?? "",
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

    if (!organizerProfile) return;

    setName(organizerProfile.name || "");
    setPhone(`${organizerProfile.countryCode}${organizerProfile.phone}` || "");
    setFacebookAccUrl(organizerProfile.facebookAccUrl || "");
    setInstagramAccUrl(organizerProfile.instagramAccUrl || "");
    setTwiitterAccUrl(organizerProfile.twiiterAccUrl || "");
    setTiktokAccUrl(organizerProfile.tiktokAccUrl || "");
    setOrgWebsiteUrl("");

    if (organizerProfile.countryCode && organizerProfile.phone) {
      setPhone(`${organizerProfile.countryCode} ${organizerProfile.phone}`);
    } else {
      setPhone("");
    }
  };

  return (
    <>
      <form>
        <div className="grid grid-cols-3 md:grid-cols-6 border-2 w-[80%] sm:ml-8 min-w-[300px] p-8 gap-8 rounded-3xl">
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
                    borderColor: "gray", // Set border color to gray
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Maintain gray border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray", // Maintain gray border color when focused
                  },
                },
              }}
            />

            <div className="md:grid grid-cols-2 gap-8">
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
                  {categories.map((category) => (
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
              // value={about}
              // onChange={(e) => setAbout(e.target.value)}
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

          <div className="col-span-6 md:col-span-2">
            <FileDragNDrop onFileSelect={handleFileSelect} />
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
          <div className="col-span-6 flex max-md:gap-4">
            <button
              onClick={handleDiscard}
              className="flex items-center bg-gray-100 text-black font-thin py-3 rounded-md shadow-md gap-2 border-2rounded-md w-fit p-[5px] px-[10px] text-sm mx-auto mt-2 sm:my-0 my-[20px]"
            >
              DISCARD CHANGES
            </button>
            <button
              onClick={formSubmitHandler}
              className="flex items-center gap-2 bg-black text-white py-3 rounded-md w-fit p-[5px] px-[10px] text-sm mx-auto mt-2 sm:my-0 my-[20px]"
            >
              {loading ? "SAVING CHANGES..." : "SAVE CHANGES "}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;

import React from "react";
import { Link } from "react-router-dom";

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
