import { useMemo, useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./EventMap.css";
import { useEventContext } from "../../Contexts/CreateEventContext";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAxh0ks8s9JDC182Ls7PUmTJ2ahN-azosU",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <MapComponent />;
}

const MapComponent = () => {
  const center = useMemo(() => ({ lat: -33.8688, lng: 151.2195 }), []);
  const { setEventInfo } = useEventContext();
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["establishment"],
      componentRestrictions: { country: [] },
      fields: ["name", "geometry", "formatted_address", "address_components"],
    });

    const handlePlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location!.toJSON();
        const addressComponents = place.address_components || [];

        const formattedAddressParts = place.formatted_address!.split(",");
        const city = getAddressComponent(addressComponents, [
          "locality",
          "administrative_area_level_3",
          "administrative_area_level_2",
          "postal_town",
          "sublocality",
        ]);
        const state = getAddressComponent(addressComponents, [
          "administrative_area_level_1",
        ]);
        const country = getAddressComponent(addressComponents, ["country"]);
        const zipcode =
          getAddressComponent(addressComponents, ["postal_code"]) ||
          "Not available";

        const addressWithoutStateAndZip = formattedAddressParts
          .slice(0, -2)
          .join(", ")
          .trim();

        const venueAddress = {
          name: addressWithoutStateAndZip || formattedAddressParts[0].trim(),
          city: city || "Unknown City",
          state: state || "Unknown State",
          country: country || "Unknown Country",
          zipcode: zipcode,
        };
        
        setLocation(lat, lng, venueAddress);
      }
    };

    autocomplete.addListener("place_changed", handlePlaceChanged);

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [setLocation]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAddress(inputValue);

    const service = new google.maps.places.AutocompleteService();
    if (inputValue.length > 2) {
      service.getPlacePredictions(
        { input: inputValue, types: ["establishment"] },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handlePlaceSelect = (
    place: google.maps.places.AutocompletePrediction
  ) => {
    if (place.place_id) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(
        {
          placeId: place.place_id,
          fields: [
            "name",
            "geometry",
            "formatted_address",
            "address_components",
          ],
        },
        (placeDetails, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            placeDetails
          ) {
            const { lat, lng } = placeDetails.geometry!.location!.toJSON();
            const addressComponents = placeDetails.address_components || [];

            const formattedAddressParts =
              placeDetails.formatted_address!.split(",");
            const city = getAddressComponent(addressComponents, [
              "locality",
              "administrative_area_level_3",
              "administrative_area_level_2",
              "postal_town",
              "sublocality",
            ]);
            const country = getAddressComponent(addressComponents, ["country"]);
            const zipcode =
              getAddressComponent(addressComponents, ["postal_code"]) ||
              "Not available";

            const addressWithoutStateAndZip = formattedAddressParts
              .slice(0, -2)
              .join(", ")
              .trim();

            const venueAddress = {
              name:
                addressWithoutStateAndZip || formattedAddressParts[0].trim(),
              city: city || "Unknown City",
              country: country || "Unknown Country",
              zipcode: zipcode,
            };

            setAddress(place.description);
            setLocation(lat, lng, venueAddress);
            setPredictions([]);
          }
        }
      );
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={address}
        onChange={handleInputChange}
        placeholder="Search an address"
        className="w-full items-center border border-gray-300 rounded-md h-[56px]"
      />
      {predictions.length > 0 && (
        <ul className="absolute top-full left-0 w-full border border-gray-300 bg-white shadow-lg mt-1 z-10">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handlePlaceSelect(prediction)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
