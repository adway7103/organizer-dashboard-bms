import { useLogin } from "../../api/authApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

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

  // const responseGoogle = async (response: CredentialResponse) => {
  //   try {
  //     console.log(response);
  //     setLoading(true);
  //     if (!response.credential) {
  //       throw new Error("Cannot Login");
  //     }
  //     await auth.googleLogin(response.credential);
  //     navigate("/");
  //   } catch (error: any) {
  //     setError("An error occurred during login. Please try again later.");
  //     console.error("Login error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await useLogin({ email, password });
      const token = response.data.accessToken;
      login(token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again later.");
        console.error("Login error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="md:flex w-full justify-between md:p-0 p-8 min-w-screen">
        <div className="md:block hidden w-[70vw]">
          <img src="/OrganizerLogin.png" className="h-screen w-full" alt="" />
        </div>
        <div className="h-screen flex justify-center w-full">
          <div className="flex justify-center h-full w-full">
            <form
              onSubmit={handleSubmit}
              className="h-full flex flex-col justify-center gap-6 w-[25rem]"
            >
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-3xl font-bold">Login</h1>
                {/* <h6 className="text-md">
                  Please enter your login details to sign in
                </h6> */}
              </div>
              <div className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    name="password"
                    id="password"
                    className="w-full"
                    onChange={handleInputChange}
                  />
                  <div className="text-[#8C3E87] text-end hover:text-[#763572]">
                    <Link to="/forgot">Forgot Password?</Link>
                  </div>
                </div>
              </div>

              <div className="w-full text-[1rem] flex flex-col gap-1">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-4 bg-black w-full text-white font-bold py-2 px-4 rounded"
                >
                  Sign In
                  {loading && <Loader2 className="size-4 animate-spin" />}
                </button>
                <div className="text-red-600 ">{error}</div>
              </div>
              {/* <GoogleLogin onSuccess={responseGoogle} /> */}
              <div className="flex w-full justify-around gap-2 items-center">
                <div className="h-[2px] w-full bg-black"></div>
                <div className="text-center">or</div>
                <div className="w-full h-[2px] bg-black"></div>
              </div>

              <div className="flex justify-center gap-1">
                <Link to="/signup" className="text-[#8C3E87]">
                  Create an account
                </Link>
              </div>

              {/* <div className="flex flex-col gap-4">
                <div className="h-[2px] bg-black"></div>
                <button className="bg-black w-full text-white font-semibold py-2 px-4 rounded">
                  <Link to="/organizer/login">I'm an organizer</Link>
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
