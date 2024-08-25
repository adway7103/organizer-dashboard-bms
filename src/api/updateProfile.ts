import axios from "axios";

export type UpdateDataType = {
  name: string;
  phone: string;
  eventCategories: string[];
  logoUrl: string;
  facebookAccUrl: string;
  instagramAccUrl: string;
  twiiterAccUrl: string;
  tiktokAccUrl: string;
  orgWebsiteUrl: string;
  //   about:string;
};

const extractCountryCode = (phoneNumber: string) => {
  const countryCode = phoneNumber.split(" ")[0].replace("+", "");
  return `+${countryCode}`; // Add + back
};

export const updateProfile = async (data: UpdateDataType, id: string) => {
  console.log("update profile api page", data, id);
  const token = localStorage.getItem("accessToken");

  try {
    const countryCode = extractCountryCode(data.phone);

    const phoneWithoutCountryCode = data.phone.replace(`${countryCode} `, "");

    const finalPayload = {
      ...data,
      phone: phoneWithoutCountryCode,
      countryCode: countryCode, // Include + in the country code
    };

    const response = await axios.put(
      `https://kafsbackend-106f.onrender.com/api/v1/organizers/update/${id}`,
      finalPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
