import { useMemo, useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./EventMap.css";
import { useEventContext } from "../../Contexts/CreateEventContext";

//places component
export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAxh0ks8s9JDC182Ls7PUmTJ2ahN-azosU",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <MapComponent />;
}

//map component
const MapComponent = () => {
  const { setEventInfo } = useEventContext();
  const center = useMemo(() => ({ lat: -33.8688, lng: 151.2195 }), []); //default center
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleLocationChange = (
    lat: number,
    lng: number,
    venueAddress: any
  ) => {
    console.log("handleLocationChange function", lat, lng, venueAddress); //log
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

//places auto complete component
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
      fields: ["name", "geometry", "formatted_address", "address_components"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location!.toJSON();
        const venueAddress = {
          name: place.name,
          city: getAddressComponent(place.address_components, [
            "locality",
            "postal_town",
          ]),
          country: getAddressComponent(place.address_components, ["country"]),
          zipcode:
            getAddressComponent(place.address_components, ["postal_code"]) ||
            "Not available",
        };

        setLocation(lat, lng, venueAddress);
      }
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [setLocation]);

  const getAddressComponent = (components: any, types: string[]) => {
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

    if (inputValue.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue, types: ["establishment"] },
        (predictions, status) => {
          setPredictions(
            status === google.maps.places.PlacesServiceStatus.OK && predictions
              ? predictions
              : []
          );
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
          console.log(placeDetails);
          
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            placeDetails
          ) {
            const { lat, lng } = placeDetails.geometry!.location!.toJSON();
            const venueAddress = {
              name: placeDetails.name,
              city: getAddressComponent(placeDetails.address_components, [
                "administrative_area_level_1",
              ]),
              country: getAddressComponent(placeDetails.address_components, [
                "country",
              ]),
              zipcode:
                getAddressComponent(placeDetails.address_components, [
                  "postal_code",
                  "postal_town",
                ]) || "Not available",
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
