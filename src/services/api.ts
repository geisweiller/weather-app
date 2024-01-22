import axios from "axios";

import { geocodingUrl, weatherUrl } from "./urls/urls";

const apiKey = process.env.OPEN_WEATHER_API_KEY as string;

const fetchDirectGeocoding = async (
  city: string
): Promise<GeocodingService[]> => {
  if (!city) return [];
  const response = await axios.get(geocodingUrl(city, apiKey));
  return response.data;
};

const fetchCurrentWeather = async (
  lat: number,
  lon: number,
  unit: string
): Promise<CurrentWeatherService> => {
  const response = await axios.get(weatherUrl(lat, lon, unit, apiKey));

  return response.data;
};

export { fetchDirectGeocoding, fetchCurrentWeather };
