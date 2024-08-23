import { useMemo, useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./EventMap.css";
import { useEventContext } from "../../Contexts/CreateEventContext"; // Import the context

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAnliOx4Yo5jCupy2J4j58bvA7jN7EIR5I", // Replace with your actual API key
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <MapComponent />;
}

const MapComponent = () => {
  const center = useMemo(() => ({ lat: -33.8688, lng: 151.2195 }), []);
  const { setEventInfo } = useEventContext(); // Get the context's setEventInfo function
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleLocationChange = (
    lat: number,
    lng: number,
    venueAddress: any
  ) => {
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
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = useCallback(
    async (address: string) => {
      setValue(address, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address });
        console.log("Geocode results:", results);

        if (results.length > 0) {
          const { lat, lng } = await getLatLng(results[0]);
          const addressComponents = results[0].address_components;

          // Extracting establishment name from formatted_address without zip code and country
          const formattedAddressParts = results[0].formatted_address.split(",");
          const establishmentName = formattedAddressParts
            .slice(0, -2)
            .join(",")
            .trim();

          // Extracting city and other details
          const city = getAddressComponent(addressComponents, [
            "locality",
            "administrative_area_level_3",
            "administrative_area_level_2",
            "postal_town",
            "sublocality",
          ]);

          // Extracting the zip code
          let zipcode = getAddressComponent(addressComponents, ["postal_code"]);
          if (!zipcode) {
            zipcode = "Not available"; // Fallback value for when zipcode is null
          }

          const venueAddress = {
            name: establishmentName || formattedAddressParts[0].trim(), // Fallback to first part if no valid name is extracted
            city:
              city ||
              getAddressComponent(addressComponents, [
                "administrative_area_level_1",
              ]) ||
              "Unknown City",
            country: getAddressComponent(addressComponents, ["country"]),
            zipcode: zipcode,
          };

          console.log("Venue Address:", venueAddress);

          setLocation(lat, lng, venueAddress);
        }
      } catch (error) {
        console.error("Error: ", error);
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

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
