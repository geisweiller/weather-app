import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Button, Text, Input, Loader, Switch, Box } from "../../components";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { fetchDirectGeocoding } from "../../services/api";

const Locations = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const {
    data: currentLocationData,
    isLoading: isLocationLoading,
    isFetching: isLocationFetching,
    isError: isLocationError,
  } = useQuery({
    queryKey: ["city", query],
    queryFn: () => fetchDirectGeocoding(query),
    enabled: query.length > 3,
  });

  const { storedValue: storedLocations } = useLocalStorage("locations", "[]");
  const { storedValue: unitValue, setValue: setUnitValue } = useLocalStorage(
    "unit",
    "metric"
  );

  const starredLocations = JSON.parse(storedLocations);

  return (
    <Box className=" h-max">
      <div className="flex justify-between">
        <Text className="text-3xl font-bold">Weather App</Text>

        <Switch
          options={[
            {
              id: "metric",
              label: "°C",
              selected: unitValue === "metric",
            },
            {
              id: "imperial",
              label: "°F",
              selected: unitValue === "imperial",
            },
          ]}
          onClick={(id) => {
            setUnitValue(id);
          }}
        />
      </div>

      <Input
        placeholder="Search for a city"
        query={query}
        setQuery={setQuery}
      />

      {currentLocationData?.map((location) => (
        <Button
          key={location.lat + location.lon}
          className="flex flex-row shadow-none items-start bg-transparent border-transparent text-light-gray hover:bg-light-blue"
          onClick={() =>
            navigate(`/${location.name}`, {
              state: { ...location },
            })
          }
        >
          <Text>{location.name}</Text>
          <Text>
            ({location.state && `${location.state}, `}
            {location.country})
          </Text>
        </Button>
      ))}

      {(isLocationLoading || isLocationFetching) &&
        !currentLocationData?.length && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}

      {!currentLocationData?.length &&
        query.length > 3 &&
        !isLocationLoading &&
        !isLocationFetching &&
        !isLocationError && (
          <div className="p-2 container text-light-gray">
            <Text>No results found for "{query}"</Text>
          </div>
        )}

      {isLocationError && (
        <div className="p-2 container text-light-gray">
          <Text>Something went wrong, please try again.</Text>
        </div>
      )}

      {starredLocations?.map((location: GeocodingService) => (
        <Button
          className="min-w-80 bg-light-blue border-light-blue p-5"
          onClick={() => navigate(`/${location.name}`, { state: location })}
        >
          <div className="flex items-center justify-between w-full">
            <Text className="text-1xl font-bold">
              {location.name} ({location.state && `${location.state}, `}
              {location.country})
            </Text>
          </div>
        </Button>
      ))}

      {!starredLocations?.length && (
        <div className="flex p-2 container text-light-gray items-center justify-center">
          <Text className="text-xl">
            Your favorited locations will show up here
          </Text>
        </div>
      )}
    </Box>
  );
};

export default Locations;
