import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Button, Icon, Loader, Text } from "../../components";
import { fetchCurrentWeather } from "../../services/api";
import { GeocodingService } from "../../services/types/geocoding";
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
      className="bg-dark-blue border-dark-blue bg-opacity-70 p-5 min-h-32 items-center justify-center"
      onClick={() =>
        navigate(`/${location.name}`, {
          state: { location, weather: currentWeatherData },
        })
      }
    >
      <div className="flex items-center justify-between w-full">
        <span className="flex flex-col items-start">
          <Text className="text-1xl font-bold text-left">
            {location.name} ({location.state && `${location.state}, `}
            {location.country})
          </Text>

          <Text className="text-sm first-letter:capitalize">
            {currentWeatherData?.current.weather[0].description}
          </Text>
        </span>

        {isWeatherFetching && isWeatherLoading && <Loader />}
        {currentWeatherData && (
          <div className="flex items-center">
            <Text className="text-2xl font-bold">
              {currentWeatherData?.current.temp.toFixed(0)}
              {tempUnitConversion(unitValue)}
            </Text>

            <Icon
              className="hidden sm:block"
              code={currentWeatherData?.current.weather[0].icon}
              width={80}
            />
          </div>
        )}
      </div>
    </Button>
  );
};

export default StarredLocation;
