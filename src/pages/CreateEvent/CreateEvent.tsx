import "./CreateEvent.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { tagsOptions } from "../../utils/Constant";

const CreateEvent = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <section className="create-event w-3/4 p-10 max-h-screen">
      <h1 className="font-semibold text-2xl pb-4">Create Event</h1>
      <form className="event-form flex flex-col gap-5">
        <TextField
          id="eventName"
          label="Event Name"
          placeholder="Be clear and descriptive with the title that tells people what your event is about."
          variant="outlined"
        />

        <div>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={age}
            onChange={handleChange}
            className="w-full"
          >
            <MenuItem value={10}>Category 1</MenuItem>
            <MenuItem value={20}>Category 2</MenuItem>
            <MenuItem value={30}>Category 3</MenuItem>
          </Select>
        </div>

        <div>
          <InputLabel id="periodicity-label">Periodicity (optional)</InputLabel>
          <Select
            labelId="periodicity-label"
            id="periodicity"
            className="w-full"
          >
            <MenuItem value={10}>Periodicity 1</MenuItem>
            <MenuItem value={20}>Periodicity 2</MenuItem>
            <MenuItem value={30}>Periodicity 3</MenuItem>
          </Select>
        </div>

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          placeholder="Grab people's attention with a short description about your event."
        />

        <Autocomplete
          multiple
          id="tags"
          options={tagsOptions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Add Tags" />}
        />

        <div>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            id="currency"
            value={age}
            onChange={handleChange}
            className="w-full"
          >
            <MenuItem value={10}>Category 1</MenuItem>
            <MenuItem value={20}>Category 2</MenuItem>
            <MenuItem value={30}>Category 3</MenuItem>
          </Select>
        </div>

        <div>
          <h3>Date of evenets</h3>
          <div className="event-timing mb-5">
            <h4 className="w-full block">Event Starts</h4>
            <div className="flex items-center justify-between">
              <input type="date" name="event-start-date" id="event-start-date" placeholder="DD-MM-YYYY" />
              <span>at</span>
              <input type="time" name="event-start-time" id="event-start-time" />
            </div>
          </div>
          <div className="event-timing">
            <h4 className="w-full block">Event Starts</h4>
            <div className="flex items-center justify-between">
              <input type="date" name="event-start-date" id="event-start-date" placeholder="DD-MM-YYYY" />
              <span>at</span>
              <input type="time" name="event-start-time" id="event-start-time" />
            </div>
          </div>
        </div>

        <div className="location">
          <h3>Location</h3>
          <div className="flex gap-1 items-center">
            <input id="02" type="radio" name="r" value="2" />
            <label htmlFor="02" className="mr-2">Offline</label>
            <input id="03" type="radio" name="r" value="3" />
            <label htmlFor="03">Online</label>
          </div>
          <input type="search" name="loaction-search" id="location-search" placeholder="Seaciuhi"/>
        </div>


      </form>
    </section>
  );
};

export default CreateEvent;
