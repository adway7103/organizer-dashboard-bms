import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { MuiTelInput } from "mui-tel-input";
import { useSignUp } from "../../api/authApi";
import { useAuth } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [gender, setGender] = useState("male"); // State for gender
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await useSignUp({
        email,
        password,
        fname: firstName,
        lname: lastName,
        gender,
        fcmToken: "test token",
        phone,
        isTnCAccepted: true,
        isPrivacyPolicyAccepted: true,
      });
      const token = response.data.accessToken;
      login(token);
      toast.success("Sign up successfull");
      navigate("/createanaccount");
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error("Email or phone number already in use.");
      } else {
        console.error("signup error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen ">
        <div className="md:w-1/2 md:block hidden">
          <img
            src="/OrganizerLogin.png"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="h-screen w-full md:w-1/2 flex justify-center items-center">
          <div className="md:px-[10vw]">
            <form
              onSubmit={handleSubmit}
              className="h-full p-4 w-full space-y-3"
            >
              <div className="flex flex-col items-center">
                {/* <Link to={"/"}>
                  <img
                    src="/logo-nobg.png"
                    alt="logo"
                    className="max-h-[10vh] max-w-[40vw]"
                  />
                </Link> */}
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required={true}
                  value={firstName}
                  placeholder="First name *"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required={true}
                  placeholder="Last name *"
                  value={lastName}
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex w-full gap-8 custom-radio">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    required={true}
                    checked={gender === "male"}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    required={true}
                    checked={gender === "female"}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
              </div>

              <div className="">
                <MuiTelInput
                  value={phone}
                  onChange={setPhone}
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  defaultCountry="US"
                  variant="outlined"
                  className="w-full"
                />
              </div>

              <div className="">
                <input
                  type="email"
                  name="email"
                  required={true}
                  value={email}
                  placeholder="Email Address *"
                  id="email"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>

              <div className="">
                <input
                  type="password"
                  value={password}
                  required={true}
                  placeholder="Password *"
                  name="password"
                  id="password"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full text-[1rem] flex flex-col gap-1">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-4 bg-black w-full text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                  {loading && <Loader2 className="size-4 animate-spin" />}
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="h-[2px] bg-black"></div>
                <p className="text-center text-sm">
                  By registering, you agree to KAFSCO's{" "}
                  <a
                    target="blank"
                    href="/terms"
                    className="text-blue-600 font-bold"
                  >
                    T&Cs
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 font-bold">
                    Privacy Policy.
                  </a>
                </p>
                <div className="flex justify-center items-center font-semibold gap-x-2">
                  {/* <div className="text-red-500">{error}</div> */}
                  Already a member ?{" "}
                  <Link to="/login" className="text-[#8C3E87]">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
