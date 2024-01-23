import { useState } from "react";

import { CloudSun } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import StarredLocation from "./starred-location";
import { Button, Text, Input, Loader, Switch, Box } from "../../components";
import { switchOptions } from "../../helpers/switch-options";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { fetchDirectGeocoding } from "../../services/api";
import { GeocodingService } from "../../services/types/geocoding";

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
        <span className="flex items-center gap-2">
          <Text className="text-3xl font-bold">Weather</Text>
          <CloudSun size={40} color="white" />
        </span>

        <Switch
          options={switchOptions(unitValue)}
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
              state: { location: location, weather: null },
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

      {query.length < 4 &&
        starredLocations?.map((location: GeocodingService) => (
          <StarredLocation
            key={location.lat + location.lon}
            location={location}
            unitValue={unitValue}
          />
        ))}

      {query.length < 4 && !starredLocations?.length && (
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
