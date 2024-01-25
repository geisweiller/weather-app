import { Drop, Wind, Star, Warning, ArrowLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { Text, Icon, Box, Button, Loader, Map, Switch } from "../../components";
import { switchOptions } from "../../helpers/switch-options";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { EmptyState } from "../../layouts";
import { fetchCurrentWeather } from "../../services/api";
import { CurrentWeatherService } from "../../services/types/currentweather";
import {
  tempUnitConversion,
  windUnitConversion,
} from "../../utils/unit-conversion";

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { location: currentLocation } = location.state;
  const { weather: currentWeather } = location.state;

  const { storedValue: unitValue, setValue: setUnitValue } = useLocalStorage(
    "unit",
    "metric"
  );
  const { storedValue: storedLocation, setValue: setLocation } =
    useLocalStorage("locations", "[]");

  const {
    data: currentWeatherData,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
    isError: isWeatherError,
  } = useQuery<CurrentWeatherService>({
    queryKey: ["weather", currentLocation, unitValue],
    queryFn: () =>
      fetchCurrentWeather(currentLocation.lat, currentLocation.lon, unitValue),
    enabled: !!currentLocation && !currentWeather,
    retry: false,
    initialData: currentWeather as CurrentWeatherService,
  });

  const handleLocationFavorite = () => {
    const parsedLocations = JSON.parse(storedLocation);

    const existsIndex = parsedLocations.findIndex(
      (location: { lat: number; lon: number }) =>
        location.lat === currentLocation.lat &&
        location.lon === currentLocation.lon
    );

    if (existsIndex !== -1) {
      const updatedLocations = [...parsedLocations];
      updatedLocations.splice(existsIndex, 1);
      const stringifiedLocations = JSON.stringify(updatedLocations);
      setLocation(stringifiedLocations);
    } else {
      const stringifiedNewValue = JSON.stringify([
        ...parsedLocations,
        currentLocation,
      ]);

      setLocation(stringifiedNewValue);
    }
  };

  const isFavorited = () => {
    const parsedLocations = JSON.parse(storedLocation);
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

  if (
    (!currentWeatherData && !currentWeather) ||
    !currentLocation ||
    isWeatherError
  ) {
    return (
      <EmptyState
        description="Something went wrong, please try again."
        buttonText="Back to search"
        onClick={() => navigate("/")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      <div className="flex bg-transparent border-transparent shadow-none items-center justify-between">
        <Button
          className="w-min bg-dark-blue text-sm border-dark-blue"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={32} color="white" />
        </Button>

        <div className="flex flex-col items-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <div className="flex items-center gap-5 justify-between">
            <Text className="text-2xl font-bold text-center">
              {currentLocation.name} (
              {currentLocation.state && `${currentLocation.state}, `}
              {currentLocation.country})
            </Text>
          </div>

          <div className="flex gap-2 items-center">
            <Icon code={currentWeatherData?.current.weather[0].icon} />

            <div className="flex  flex-col items-centerjustify-center">
              <Text className="text-4xl font-bold text-center">
                {currentWeatherData?.current.temp.toFixed(0)}
                {tempUnitConversion(unitValue)}
              </Text>

              <Text className=" first-letter:capitalize">
                {currentWeatherData?.current.weather[0].description}
              </Text>
            </div>
          </div>

          <div className="flex gap-10 items-center w-full justify-center">
            <span className="flex flex-col items-center gap-1">
              <Drop size={32} color="dodgerblue" />

              <Text>{currentWeatherData?.current.humidity}%</Text>
            </span>

            <span className="flex flex-col items-center gap-1">
              <Wind size={32} color="gray" />

              <Text>
                {currentWeatherData?.current.wind_speed}
                {windUnitConversion(unitValue)}
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
            color="gold"
            {...(isFavorited() && { weight: "fill" })}
          />
        </Button>
      </div>

      <Map coordinates={[currentLocation.lat, currentLocation.lon]} />

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
          <div className="flex justify-between">
            <Text className="text-xl font-bold">Forecast</Text>

            <Switch
              options={switchOptions(unitValue)}
              onClick={(id) => {
                setUnitValue(id);
              }}
            />
          </div>

          <div className="flex flex-col gap-5 container">
            {currentWeatherData?.daily.map((day) => (
              <div
                key={day.dt}
                className="flex items-center justify-between gap-5"
              >
                <div className="flex gap-2 items-center">
                  <Text className="text-sm font-bold w-8">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </Text>

                  <Icon code={day.weather[0].icon} />

                  <Text className="text-sm font-bold">
                    {day.temp.day.toFixed(0)}
                    {tempUnitConversion(unitValue)}
                  </Text>
                </div>

                <Text className="hidden sm:block text-xs max-w-80 text-center">
                  {day.summary}
                </Text>

                <div className="flex gap-3 items-center w-24 justify-between">
                  <span className="flex flex-col items-center gap-1">
                    <Drop size={24} color="white" />

                    <Text className="text-sm">{day.humidity}%</Text>
                  </span>

                  <span className="flex flex-col items-center gap-1">
                    <Wind size={24} color="white" />

                    <Text className="text-sm">
                      {day.wind_speed}
                      {windUnitConversion(unitValue)}
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
