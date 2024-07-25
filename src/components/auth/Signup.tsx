import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { MuiTelInput } from "mui-tel-input";
import { useSignUp } from "../../api/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [gender, setGender] = useState("male"); // State for gender
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    const missingFields = [];
    if (!firstName) missingFields.push("First Name");
    if (!lastName) missingFields.push("Last Name");
    if (!gender) missingFields.push("Gender");
    if (!phone) missingFields.push("Phone");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");

    if (missingFields.length > 0 && missingFields.length < 5) {
      setError(
        `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`
      );
      return;
    } else {
      setError("All field are required");
    }

    try {
      setLoading(true);
      await useSignUp({
        email,
        password,
        fname: firstName,
        lname: lastName,
        gender,
        phone,
        isTnCAccepted: true,
        isPrivacyPolicyAccepted: true,
      });
      navigate("/login");
      toast.success("Sign up successfull");
    } catch (error: any) {
      if (error.response.status === 409) {
        setError(
          "Email or phone number already in use. Please try again with a different one."
        );
      } else {
        console.error("signup error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="md:flex">
        <div className="md:w-[46vw] md:block hidden">
          <img src="/OrganizerLogin.png" className="h-screen w-full" alt="" />
        </div>
        <div className="h-screen">
          <div className="py-[7vh] 2xl:py-[12vh] px-[10vw] h-full md:w-[54vw]">
            <form
              onSubmit={handleSubmit}
              className="h-full p-4 flex flex-col justify-around"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-center items-center">
                  Sign Up
                </h1>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  placeholder="First name"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name"
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
                  value={email}
                  placeholder="Email Address"
                  id="email"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>

              <div className="">
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
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
                  <a href="/terms">T&Cs</a> and
                  <a href="/privacy">Privacy Policy.</a>
                </p>
                <div>
                  <div className="text-red-500">{error}</div>
                  <div className="flex justify-center gap-1">
                    Already an organizer?
                    <Link to="/login" className="text-[#8C3E87] pl-2">
                      Login
                    </Link>
                  </div>
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
