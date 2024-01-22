import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { FetchDirectGeocoding } from "../../services/api";
import { Button, Text, Input, Loader, Toggler, Box } from "../../components";
import { useLocalStorage } from "../../hooks/use-local-storage";

const Locations = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("metric");

  const {
    data: currentLocationData,
    isLoading: isPlaceLoading,
    isFetching: isPlaceFetching,
  } = useQuery({
    queryKey: ["city", query],
    queryFn: () => FetchDirectGeocoding(query),
    enabled: query.length > 3,
  });

  const { storedValue } = useLocalStorage("locations", "[]");

  const favoritedLocations = JSON.parse(storedValue);

  return (
    <Box className=" h-max">
      <div className="flex justify-between">
        <Text className="text-3xl font-bold">Weather App</Text>
        <Toggler
          options={[
            {
              id: "metric",
              label: "°C",
              selected: unit === "metric",
            },
            {
              id: "imperial",
              label: "°F",
              selected: unit === "imperial",
            },
          ]}
          onClick={setUnit}
        />
      </div>

      <Input
        placeholder="Search for a city"
        query={query}
        setQuery={setQuery}
      />
      {currentLocationData?.map((location) => (
        <button
          key={location.lat + location.lon}
          className="p-2 container flex items-start bg-transparent text-light-gray hover:bg-light-blue hover:text-white hover:cursor-pointer gap-1"
          onClick={() =>
            navigate(`/${location.name}`, {
              state: { ...location, unit },
            })
          }
        >
          <Text>{location.name}</Text>
          <Text>
            ({location.state && `${location.state}, `}
            {location.country})
          </Text>
        </button>
      ))}
      {(isPlaceLoading || isPlaceFetching) && !currentLocationData?.length && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      {!currentLocationData?.length &&
        query.length > 3 &&
        !isPlaceLoading &&
        !isPlaceFetching && (
          <div className="p-2 container text-light-gray">
            <Text>No results found for "{query}"</Text>
          </div>
        )}
      {favoritedLocations?.map((location: GeocodingService) => (
        <Button
          className="min-w-80 bg-light-blue border-light-blue p-5"
          onClick={() => navigate(`/${location.name}`, { state: location })}
        >
          <div className="flex items-center justify-between w-full">
            <Text className="text-1xl font-bold">
              {location.name} ({location.state && `${location.state}, `}
              {location.country})
            </Text>
            <Text className="text-2xl font-bold">30 °C</Text>
          </div>
          <Text>Clear sky</Text>
        </Button>
      ))}
    </Box>
  );
};

export default Locations;
