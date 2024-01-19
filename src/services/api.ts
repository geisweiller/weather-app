import axios from "axios";

const apiKey = process.env.OPEN_WEATHER_API_KEY;

const FetchDirectGeocoding = async (city: string) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  );
  return response.data;
};

const FetchCurrentWeather = async (lat: number, lon: number) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return response.data;
};

export { FetchDirectGeocoding, FetchCurrentWeather };
