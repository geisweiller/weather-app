import { Drop, Wind, Star, Warning } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { Text, Icon, Box, Button, Loader } from "../../components";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { fetchCurrentWeather } from "../../services/api";
import {
  tempUnitConversion,
  windUnitConversion,
} from "../../utils/unit-conversion";

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.state;
  const { unit } = location.state;

  const {
    data: currentWeatherData,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
  } = useQuery({
    queryKey: ["weather", currentLocation],
    queryFn: () =>
      fetchCurrentWeather(currentLocation.lat, currentLocation.lon, unit),
    enabled: !!currentLocation,
    retry: false,
  });

  const { storedValue, setValue } = useLocalStorage("locations", "[]");

  const handleLocationFavorite = () => {
    const parsedLocations = JSON.parse(storedValue);

    const existsIndex = parsedLocations.findIndex(
      (location: { lat: number; lon: number }) =>
        location.lat === currentLocation.lat &&
        location.lon === currentLocation.lon
    );

    if (existsIndex !== -1) {
      const updatedLocations = [...parsedLocations];
      updatedLocations.splice(existsIndex, 1);
      const stringifiedLocations = JSON.stringify(updatedLocations);
      setValue(stringifiedLocations);
    } else {
      const stringifiedNewValue = JSON.stringify([
        ...parsedLocations,
        currentLocation,
      ]);

      setValue(stringifiedNewValue);
    }
  };

  const isFavorited = () => {
    const parsedLocations = JSON.parse(storedValue);
    const existsIndex = parsedLocations.findIndex(
      (location: { lat: number; lon: number }) =>
        location.lat === currentLocation.lat &&
        location.lon === currentLocation.lon
    );
    return existsIndex !== -1;
  };

  if (isWeatherLoading || isWeatherFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!currentWeatherData || !currentLocation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <Text className="text-2xl font-bold">
          Something went wrong, please try again.
        </Text>
        <Button
          className="bg-dark-blue w-fit border-dark-blue"
          onClick={() => navigate("/")}
        >
          <Text>Back to search</Text>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex bg-transparent border-transparent shadow-none items-center justify-between">
        <Button
          className="w-min bg-dark-blue text-sm border-dark-blue"
          onClick={() => navigate("/")}
        >
          <Text className="text-sm">Back</Text>
        </Button>

        <div className="flex flex-col items-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <div className="flex items-center gap-5 justify-between">
            <Text className="text-2xl font-bold">
              {currentLocation.name} (
              {currentLocation.state && `${currentLocation.state}, `}
              {currentLocation.country})
            </Text>
          </div>

          <div className="flex gap-2 items-center">
            <Icon code={currentWeatherData?.current.weather[0].icon} />
            <div className="flex  flex-col items-centerjustify-center">
              <Text className="text-4xl font-bold">
                {currentWeatherData?.current.temp}
                {tempUnitConversion(unit)}
              </Text>
              <Text className=" first-letter:capitalize">
                {currentWeatherData?.current.weather[0].description}
              </Text>
            </div>
          </div>

          <div className="flex gap-10 items-center w-full justify-center">
            <span className="flex flex-col items-center gap-1">
              <Drop size={32} color="white" />
              <Text>{currentWeatherData?.current.humidity}%</Text>
            </span>
            <span className="flex flex-col items-center gap-1">
              <Wind size={32} color="white" />
              <Text>
                {currentWeatherData?.current.wind_speed}
                {windUnitConversion(unit)}
              </Text>
            </span>
          </div>
        </div>

        <Button
          className="w-min bg-dark-blue text-sm border-dark-blue"
          onClick={handleLocationFavorite}
        >
          <Star
            size={32}
            color="#d4af37"
            {...(isFavorited() && { weight: "fill" })}
          />
        </Button>
      </div>

      {currentWeatherData?.alerts && (
        <Box>
          <span className="flex items-center gap-5">
            <Warning size={32} color="white" />
            <Text className="text-xl font-bold">Alerts</Text>
          </span>

          <Text className="text-sm">
            {currentWeatherData?.alerts[0].description}
          </Text>
        </Box>
      )}

      {currentWeatherData?.daily && (
        <Box className="bg-opacity-70">
          <Text className="text-xl font-bold">Next 7 days</Text>

          <div className="flex flex-col gap-5">
            {currentWeatherData?.daily.map((day) => (
              <div
                key={day.dt}
                className="flex items-center justify-between gap-5"
              >
                <div className="flex gap-2 items-center">
                  <Icon code={day.weather[0].icon} />
                  <Text className="text-sm font-bold">
                    {day.temp.day}
                    {tempUnitConversion(unit)}
                  </Text>
                </div>

                <Text className="hidden lg:block text-sm  max-w-96 text-center">
                  {day.summary}
                </Text>

                <div className="flex gap-3 items-center w-32 justify-between">
                  <span className="flex flex-col items-center gap-1">
                    <Drop size={32} color="white" />
                    <Text className="text-sm">{day.humidity}%</Text>
                  </span>

                  <span className="flex flex-col items-center gap-1">
                    <Wind size={32} color="white" />
                    <Text className="text-sm">
                      {day.wind_speed}
                      {windUnitConversion(unit)}
                    </Text>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}
    </div>
  );
};

export default Weather;
