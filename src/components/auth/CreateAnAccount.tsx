import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AccountInfo } from "../../Contexts/createAnAccountContext";
import { useAccountContext } from "../../Contexts/createAnAccountContext";
import { getCategories } from "../../api/createEventApi";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel, MenuItem } from "@mui/material";
import FileDragNDrop from "../DragNDrop/FileDragNDrop";
import { uploadImage } from "../../api/uploadImage";
import { createAccount } from "../../api/createAnAccount";

const CreateAnAccount = () => {
  const { accountInfo, setAccountInfo } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInfo((prevAccountInfo) => ({
      ...prevAccountInfo,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target;

    setAccountInfo((prevAccountInfo) => {
      if (name === "eventCategories") {
        return {
          ...prevAccountInfo,
          eventCategories: value as string[],
        };
      }
      return prevAccountInfo;
    });
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (accountInfo.eventCategories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const accountData: AccountInfo = {
        name: accountInfo.name,
        eventCategories: accountInfo.eventCategories,
        logoUrl: imageUrl,
        facebookAccUrl: accountInfo.facebookAccUrl,
        instagramAccUrl: accountInfo.instagramAccUrl,
        twiiterAccUrl: accountInfo.twiiterAccUrl,
      };

      // Create account
      await createAccount(accountData);
      toast.success("Organization created successfully");
      setAccountInfo({
        name: "",
        eventCategories: [],
        logoUrl: "",
        facebookAccUrl: "",
        instagramAccUrl: "",
        twiiterAccUrl: "",
      });
      navigate("/profile");
    } catch (error) {
      console.error(error);
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
              onSubmit={handleOnSubmit}
              className="h-full p-4 w-full space-y-3"
            >
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center">
                  Create An Account
                </h1>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={accountInfo.name}
                  onChange={handleChange}
                  placeholder="Organization Name"
                  className="w-full"
                />
              </div>
              <div>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="eventCategories"
                  multiple
                  value={accountInfo.eventCategories}
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
                    ".MuiSelect-select": {
                      padding: "10px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
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

              <FileDragNDrop onFileSelect={handleFileSelect} />

              <div className="">
                <input
                  type="text"
                  name="facebookAccUrl"
                  value={accountInfo.facebookAccUrl}
                  onChange={handleChange}
                  placeholder="Facebook Page"
                  id="facebook"
                  className="w-full"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="instagramAccUrl"
                  value={accountInfo.instagramAccUrl}
                  onChange={handleChange}
                  placeholder="Instagram Account"
                  id="instagram"
                  className="w-full"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="twitterAccUrl"
                  value={accountInfo.twiiterAccUrl}
                  onChange={handleChange}
                  placeholder="Twitter Account"
                  id="twitter"
                  className="w-full"
                />
              </div>

              <div className="w-full text-[1rem] flex flex-col gap-1">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-4 bg-black w-full text-white font-bold py-2 px-4 rounded"
                >
                  Submit{" "}
                  {loading && <Loader2 className="size-4 animate-spin" />}
                </button>
                {/* <Link to={"/profile"} className="text-center">
                  skip
                </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAnAccount;
