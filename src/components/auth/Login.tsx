import { useLogin } from "../../api/authApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // const {root:{auth}} = useStore();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
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
    const userData = {
      email,
      password,
    };
    try {
      const response = await useLogin(userData);
      if (process.env.NODE_ENV === "development") {
        console.log("Signup successful:", response);
      }
      const token = response.data.accessToken;
      login(token);
      navigate("/");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <>
      <div className="md:flex">
        <div className="h-screen">
          <div className="py-[7vh] 2xl:py-[12vh] px-[10vw] h-full md:w-[54vw]">
            <form
              onSubmit={handleSubmit}
              className="h-full p-4 flex flex-col justify-around"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Log In</h1>
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

              <button
                type="submit"
                className="bg-black text-white font-bold py-2 px-4 rounded"
              >
                Continue
              </button>

              <p>
                Didn't have an account?{" "}
                <span className="underline">
                  <Link to={"/signup"}>signup</Link>
                </span>
              </p>

              <div className="flex flex-col gap-1">
                <div className="h-[2px] bg-black"></div>
                <p className="text-center text-sm">
                  By registering, you agree to FIXIR's T&Cs and Privacy Policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
