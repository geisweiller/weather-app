import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { FetchDirectGeocoding } from "../../services/api";
import { Button, Text, Input, Loader, Toggler, Box } from "../../components";

const Locations = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("metric");

  const {
    data: currentPlaceData,
    isLoading: isPlaceLoading,
    isFetching: isPlaceFetching,
  } = useQuery({
    queryKey: ["city", query],
    queryFn: () => FetchDirectGeocoding(query),
    enabled: query.length > 3,
  });

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
      {currentPlaceData?.map((place) => (
        <button
          key={place.lat + place.lon}
          className="p-2 container flex items-start bg-transparent text-light-gray hover:bg-light-blue hover:text-white hover:cursor-pointer gap-1"
          onClick={() =>
            navigate(`/${place.name}`, {
              state: { ...place, unit },
            })
          }
        >
          <Text>{place.name}</Text>
          <Text>
            ({place.state && `${place.state}, `}
            {place.country})
          </Text>
        </button>
      ))}
      {(isPlaceLoading || isPlaceFetching) && !currentPlaceData?.length && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      {!currentPlaceData?.length &&
        query.length > 3 &&
        !isPlaceLoading &&
        !isPlaceFetching && (
          <div className="p-2 container text-light-gray">
            <Text>No results found for "{query}"</Text>
          </div>
        )}
      <Button
        className="min-w-80 bg-light-blue border-light-blue p-5"
        onClick={() => navigate(`/Salvador`)}
      >
        <div className="flex items-center justify-between w-full">
          <Text className="text-1xl font-bold">Salvador (Bahia, BR)</Text>
          <Text className="text-2xl font-bold">30 °C</Text>
        </div>
        <Text>Clear sky</Text>
      </Button>
    </Box>
  );
};

export default Locations;
