import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Button, Loader, Text } from "../../components";
import { fetchCurrentWeather } from "../../services/api";
import { tempUnitConversion } from "../../utils/unit-conversion";

interface StarredLocationProps {
  location: GeocodingService;
  unitValue: string;
}

const StarredLocation = ({ location, unitValue }: StarredLocationProps) => {
  const navigate = useNavigate();

  const {
    data: currentWeatherData,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
  } = useQuery({
    queryKey: ["weather", location, unitValue],
    queryFn: () => fetchCurrentWeather(location.lat, location.lon, unitValue),
    enabled: !!location,
    retry: false,
    staleTime: 300000, // 5 minutes,
  });

  return (
    <Button
      key={location.lat + location.lon}
      className="min-w-80 bg-dark-blue border-dark-blue p-5"
      onClick={() =>
        navigate(`/${location.name}`, {
          state: { location, weather: currentWeatherData },
        })
      }
    >
      <div className="flex items-center justify-between w-full">
        <span className="flex flex-col items-start">
          <Text className="text-1xl font-bold">
            {location.name} ({location.state && `${location.state}, `}
            {location.country})
          </Text>
          <Text className="text-sm first-letter:capitalize">
            {currentWeatherData?.current.weather[0].description}
          </Text>
        </span>

        {isWeatherFetching && isWeatherLoading && <Loader />}
        {currentWeatherData && (
          <Text className="text-2xl font-bold">
            {currentWeatherData?.current.temp.toFixed(0)}
            {tempUnitConversion(unitValue)}
          </Text>
        )}
      </div>
    </Button>
  );
};

export default StarredLocation;
