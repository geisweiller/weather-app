import { Text, Icon } from "../../components";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchCurrentWeather } from "../../services/api";

const Weather = () => {
  const location = useLocation();
  const currentPlace = location.state;

  const {
    data: currentWeatherData,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
  } = useQuery({
    queryKey: ["weather", currentPlace],
    queryFn: () => FetchCurrentWeather(currentPlace.lat, currentPlace.lon),
    enabled: !!currentPlace,
  });
  return (
    <div>
      <div className="flex flex-col min-w-80 bg-transparent border-transparent shadow-none items-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
        <>
          <div className="flex items-center gap-5 justify-between">
            <Text className="text-2xl font-bold">
              {currentPlace.name} (
              {currentPlace.state && `${currentPlace.state}, `}
              {currentPlace.country})
            </Text>
          </div>
          <div className="flex gap-2 items-center">
            <Icon code={currentWeatherData?.current.weather[0].icon} />
            <div className="flex  flex-col items-center justify-center">
              <Text className="text-4xl font-bold">
                {currentWeatherData?.current.temp}°C
              </Text>
              <Text>{currentWeatherData?.current.weather[0].description}</Text>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Text>{currentWeatherData?.current.humidity}%</Text>
            <Text>{currentWeatherData?.current.wind_speed}km/h</Text>
          </div>
        </>
      </div>
    </div>
  );
};

export default Weather;
