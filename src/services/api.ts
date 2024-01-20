import axios from "axios";
import { currentWeatherMock } from "./mocks/currentweather";

const apiKey = "83fe18e215e2f2765d9cb5069addda55";
console.log(process.env);

const FetchDirectGeocoding = async (city: string) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  );
  return response.data;
};

const FetchCurrentWeather = async (lat: number, lon: number) => {
  // const response = await axios.get(
  //   `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  // );
  // return response.data;
  return currentWeatherMock as CurrentWeatherService;
};

export { FetchDirectGeocoding, FetchCurrentWeather };
