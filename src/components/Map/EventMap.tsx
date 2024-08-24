
// import { useMemo, useState, useCallback } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
// import "./EventMap.css";
// import { useEventContext } from "../../Contexts/CreateEventContext";
// // const secretKey = import.meta.env.VITE_SECRET_KEY;
// // console.log(secretKey);


// export default function Places() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAnliOx4Yo5jCupy2J4j58bvA7jN7EIR5I",
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading...</div>;

//   return <MapComponent />;
// }

// const MapComponent = () => {
//   const center = useMemo(() => ({ lat: -33.8688, lng: 151.2195 }), []);
//   const { setEventInfo } = useEventContext();
//   const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
//     null
//   );

//   const handleLocationChange = (
//     lat: number,
//     lng: number,
//     venueAddress: any
//   ) => {
//     setSelected({ lat, lng });
//     setEventInfo((prevState) => ({
//       ...prevState,
//       venueLocation: { latitude: lat, longitude: lng },
//       venueAddress: venueAddress,
//     }));
//   };

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setLocation={handleLocationChange} />
//       </div>

//       <GoogleMap
//         zoom={10}
//         center={selected || center}
//         mapContainerClassName="map-container"
//       >
//         {selected && <Marker position={selected} />}
//       </GoogleMap>
//     </>
//   );
// };

// const PlacesAutocomplete = ({
//   setLocation,
// }: {
//   setLocation: (lat: number, lng: number, venueAddress: any) => void;
// }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = useCallback(
//     async (address: string) => {
//       setValue(address, false);
//       clearSuggestions();

//       try {
//         const results = await getGeocode({ address });
//         console.log("Geocode results:", results);

//         if (results.length > 0) {
//           const { lat, lng } = await getLatLng(results[0]);
//           const addressComponents = results[0].address_components;

//           const formattedAddressParts = results[0].formatted_address.split(",");
//           const establishmentName = formattedAddressParts
//             .slice(0, -2)
//             .join(",")
//             .trim();

//           const city = getAddressComponent(addressComponents, [
//             "locality",
//             "administrative_area_level_3",
//             "administrative_area_level_2",
//             "postal_town",
//             "sublocality",
//           ]);

//           let zipcode = getAddressComponent(addressComponents, ["postal_code"]);
//           if (!zipcode) {
//             zipcode = "Not available";
//           }

//           const venueAddress = {
//             name: establishmentName || formattedAddressParts[0].trim(),
//             city:
//               city ||
//               getAddressComponent(addressComponents, [
//                 "administrative_area_level_1",
//               ]) ||
//               "Unknown City",
//             country: getAddressComponent(addressComponents, ["country"]),
//             zipcode: zipcode,
//           };

//           console.log("Venue Address:", venueAddress);

//           setLocation(lat, lng, venueAddress);
//         }
//       } catch (error) {
//         console.error("Error: ", error);
//       }
//     },
//     [setValue, clearSuggestions, setLocation]
//   );

//   const getAddressComponent = (components: any, types: any) => {
//     for (const type of types) {
//       const component = components.find((component: any) =>
//         component.types.includes(type)
//       );
//       if (component) {
//         return component.long_name;
//       }
//     }
//     return null;
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e:any) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };
// googleMapsApiKey: "AIzaSyAnliOx4Yo5jCupy2J4j58bvA7jN7EIR5I",

import React, { useState, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./EventMap.css"; // Ensure this file is correctly styled
import { useEventContext } from "../../Contexts/CreateEventContext";

const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAnliOx4Yo5jCupy2J4j58bvA7jN7EIR5I", // Replace with your actual API key
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <MapComponent />;
};

const MapComponent = () => {
  const center = { lat: -33.8688, lng: 151.2195 };
  const { setEventInfo } = useEventContext();
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationChange = (lat: number, lng: number, venueAddress: any) => {
    setSelected({ lat, lng });
    setEventInfo((prevState) => ({
      ...prevState,
      venueLocation: { latitude: lat, longitude: lng },
      venueAddress: venueAddress,
    }));
  };

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setLocation={handleLocationChange} />
      </div>

      <GoogleMap
        zoom={10}
        center={selected || center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
};

const PlacesAutocomplete = ({
  setLocation,
}: {
  setLocation: (lat: number, lng: number, venueAddress: any) => void;
}) => {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: new window.google.maps.LatLng(-33.8688, 151.2195),
      radius: 20000,
    },
  });

  console.log("Suggestions status:", status); // Debugging
  console.log("Suggestions data:", data); // Debugging

  const handleSelect = useCallback(
    async (event: React.SyntheticEvent, newValue: { value: string; label: string } | null) => {
      console.log(event);
      
      if (newValue) {
        const address = newValue.label;
        setValue(address, false);
        clearSuggestions();

        try {
          const results = await getGeocode({ address });
          if (results.length > 0) {
            const { lat, lng } = await getLatLng(results[0]);
            const addressComponents = results[0].address_components;

            const formattedAddressParts = results[0].formatted_address.split(",");
            const establishmentName = formattedAddressParts
              .slice(0, -2)
              .join(",")
              .trim();

            const city = getAddressComponent(addressComponents, [
              "locality",
              "administrative_area_level_3",
              "administrative_area_level_2",
              "postal_town",
              "sublocality",
            ]);

            let zipcode = getAddressComponent(addressComponents, ["postal_code"]);
            if (!zipcode) {
              zipcode = "Not available";
            }

            const venueAddress = {
              name: establishmentName || formattedAddressParts[0].trim(),
              city:
                city ||
                getAddressComponent(addressComponents, [
                  "administrative_area_level_1",
                ]) ||
                "Unknown City",
              country: getAddressComponent(addressComponents, ["country"]),
              zipcode: zipcode,
            };

            setLocation(lat, lng, venueAddress);
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    },
    [setValue, clearSuggestions, setLocation]
  );

  const getAddressComponent = (components: any, types: any) => {
    for (const type of types) {
      const component = components.find((component: any) =>
        component.types.includes(type)
      );
      if (component) {
        return component.long_name;
      }
    }
    return null;
  };

  // Map the suggestions to the format expected by Autocomplete
  const options = data.map(({ description }: any) => ({
    value: description,
    label: description,
  }));

  return (
    <Autocomplete
      options={options}
      value={options.find(option => option.label === value) || null}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search an address"
          variant="outlined"
          disabled={!ready}
        />
      )}
    />
  );
};

export default Places;
