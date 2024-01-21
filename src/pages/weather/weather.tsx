import { Text, Icon, Box, Button } from "../../components";
import { Drop, Wind } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchCurrentWeather } from "../../services/api";
import {
  tempUnitConversion,
  windUnitConversion,
} from "../../utils/unit-conversion";

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPlace = location.state;
  const { unit } = location.state;
  const {
    data: currentWeatherData,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
  } = useQuery({
    queryKey: ["weather", currentPlace],
    queryFn: () =>
      FetchCurrentWeather(currentPlace.lat, currentPlace.lon, unit),
    enabled: !!currentPlace,
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex bg-transparent border-transparent shadow-none items-center justify-between">
        <Button
          className="w-min bg-dark-blue text-sm"
          onClick={() => navigate("/")}
        >
          <Text className="text-sm">Back</Text>
        </Button>
        <div className="flex flex-col items-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <div className="flex items-center gap-5 justify-between">
            <Text className="text-2xl font-bold">
              {currentPlace.name} (
              {currentPlace.state && `${currentPlace.state}, `}
              {currentPlace.country})
            </Text>
          </div>
          <div className="flex gap-2 items-center">
            <Icon code={currentWeatherData?.current.weather[0].icon} />
            <div className="flex  flex-col items-centerjustify-center">
              <Text className="text-4xl font-bold">
                {currentWeatherData?.current.temp}
                {tempUnitConversion(unit)}
              </Text>
              <Text>{currentWeatherData?.current.weather[0].description}</Text>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full justify-center">
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
        <Button className="w-min bg-dark-blue text-sm">
          <Text className="text-sm">Add</Text>
        </Button>
      </div>
      {currentWeatherData?.alerts && (
        <Box>
          <Text className="text-xl font-bold">Alerts</Text>
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
                <div className="flex gap-3 items-center">
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
