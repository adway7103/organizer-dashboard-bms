import { baseUrl } from "../utils";
import axios from "axios";

type UserSignupDataType = {
  fname: string;
  lname: string;
  gender: string;
  phone: string;
  email: string;
  fcmToken: string;
  password: string;
  isTnCAccepted: boolean;
  isPrivacyPolicyAccepted: boolean;
};

type UserLoginDataType = {
  email: string;
  password: string;
};

const extractCountryCode = (phoneNumber: string) => {
  const countryCode = phoneNumber.split(" ")[0].replace("+", "");
  return countryCode;
};

const useSignUp = async (userData: UserSignupDataType) => {
  try {
    const countryCode = extractCountryCode(userData.phone);

    const phoneWithoutCountryCode = userData.phone.replace(
      `+${countryCode} `,
      ""
    );

    const finalPayload = {
      ...userData,
      phone: phoneWithoutCountryCode,
      countryCode: countryCode,
    };
    const response = await axios.post(
      `https://${baseUrl}/api/v1/users/signup`,
      finalPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useLogin = async (userData: UserLoginDataType) => {
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v1/users/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { useSignUp, useLogin };
