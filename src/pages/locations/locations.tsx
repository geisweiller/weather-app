import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { FetchCurrentWeather, FetchDirectGeocoding } from "../../services/api";
import { Button, Text, Input, Loader, Toggler } from "../../components";
import { temperatureConversion } from "../../utils/temperature-conversion";

const Locations = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [tempUnit, setTempUnit] = useState<string>("C");

  const {
    data: currentPlaceData,
    isLoading: isPlaceLoading,
    isFetching: isPlaceFetching,
  } = useQuery({
    queryKey: ["city", query],
    queryFn: () => FetchDirectGeocoding(query),
    enabled: query.length > 3,
  });

  const handleTemperatureConversion = (temp: number) => {
    if (tempUnit === "C") {
      return temperatureConversion(temp, tempUnit, "F");
    }
    return temperatureConversion(temp, tempUnit, "C");
  };

  return (
    <div className="bg-dark-blue  gap-5 h-full flex flex-col p-10 rounded-lg bg-opacity-70">
      <div className="flex justify-between">
        <Text className="text-3xl font-bold">Weather App</Text>
        <Toggler
          options={[
            {
              id: "C",
              label: "°C",
              selected: tempUnit === "C",
            },
            {
              id: "F",
              label: "°F",
              selected: tempUnit === "F",
            },
          ]}
          onClick={setTempUnit}
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
              state: place,
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
        className="min-w-80 bg-light-blue bg-opacity-50 border-light-blue"
        onClick={() => navigate(`/Salvador`)}
      >
        <div className="flex items-center justify-between w-full">
          <Text className="text-1xl font-bold">Salvador (Bahia, BR)</Text>
          <Text className="text-2xl font-bold">30 °C</Text>
        </div>
        <Text>Clear sky</Text>
      </Button>
    </div>
  );
};

export default Locations;
