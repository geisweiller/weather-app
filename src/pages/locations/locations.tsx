import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { FetchCurrentWeather, FetchDirectGeocoding } from "../../services/api";
import {
  Card,
  Text,
  SearchInput,
  Icon,
  Loader,
  Toggler,
} from "../../components";
import { temperatureConversion } from "../../utils/temperatureConversion";

const Locations = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentPlace, setCurrentPlace] = useState<any>();
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

  // const {
  //   data: currentWeatherData,
  //   isLoading: isWeatherLoading,
  //   isFetching: isWeatherFetching,
  // } = useQuery({
  //   queryKey: ["weather", currentPlace],
  //   queryFn: () => FetchCurrentWeather(currentPlace.lat, currentPlace.lon),
  // });

  const handleTemperatureConversion = (temp: number) => {
    if (tempUnit === "C") {
      return temperatureConversion(temp, tempUnit, "F");
    }
    return temperatureConversion(temp, tempUnit, "C");
  };

  return (
    <div className="bg-gradient-to-br from-bg-white to-bg-blue w-screen h-screen flex flex-col p-5">
      <div className="bg-dark-blue  gap-5 h-full flex flex-col p-10 rounded-lg bg-opacity-70">
        <Text className="text-3xl font-bold">Weather App</Text>
        <SearchInput
          placeholder="Search for a city"
          list={currentPlaceData || []}
          query={query}
          isLoading={isPlaceLoading || isPlaceFetching}
          setQuery={setQuery}
          onSelected={setCurrentPlace}
        />
        {/* {currentWeatherData && (
          <div className="grid grid-cols-2">
            <Card className="min-w-80 bg-light-blue bg-opacity-50 border-light-blue">
              <>
                <div className="flex items-center gap-5 justify-between">
                  <Text className="text-2xl font-bold">
                    {currentPlace.name}
                  </Text>
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
                    onClick={(id) => {
                      setTempUnit(id);
                    }}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Icon code={currentWeatherData?.current.weather[0].icon} />
                  <div className="flex  flex-col items-center justify-center">
                    <Text className="text-4xl font-bold">
                      {handleTemperatureConversion(
                        currentWeatherData?.current.temp
                      )}
                      °{tempUnit}
                    </Text>
                    <Text>
                      {currentWeatherData?.current.weather[0].description}
                    </Text>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Text>{currentWeatherData?.current.humidity}%</Text>
                  <Text>{currentWeatherData?.current.wind_speed}km/h</Text>
                </div>
              </>
            </Card>
          </div>
        )} */}
        {currentPlaceData?.map((place) => (
          <button
            key={place.lat + place.lon}
            className="p-2 container flex items-start bg-transparent text-light-gray hover:bg-light-blue hover:text-white hover:cursor-pointer gap-1"
            onClick={() =>
              navigate(`/${place.name}`, {
                state: {
                  place: place,
                },
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
        <Card
          className="min-w-80 bg-light-blue bg-opacity-50 border-light-blue"
          onClick={() => navigate(`/Salvador`)}
        >
          <div className="flex items-center justify-between w-full">
            <Text className="text-1xl font-bold">Salvador</Text>
            <Text className="text-2xl font-bold">30 °C</Text>
          </div>
          <Text>Clear sky</Text>
        </Card>
      </div>
    </div>
  );
};

export default Locations;
