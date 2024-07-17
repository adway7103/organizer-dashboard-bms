import axios from "axios";

type UserSignupDataType = {
  fname: string;
  lname: string;
  gender: string;
  phone: string;
  email: string;
  countryCode: string;
  password: string;
  isTnCAccepted: boolean;
  isPrivacyPolicyAccepted: boolean;
};

type UserLoginDataType = {
  email: string;
  password: string;
};

const useSignUp = async (userData: UserSignupDataType) => {
  try {
    const response = await axios.post(
      `https://kafsbackend-106f.onrender.com/api/v1/users/signup`,
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

const useLogin = async (userData: UserLoginDataType) => {
  try {
    const response = await axios.post(
      `https://kafsbackend-106f.onrender.com/api/v1/users/login`,
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
