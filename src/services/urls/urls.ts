const geocodingUrl = (city: string, apiKey: string) =>
  `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

const weatherUrl = (lat: number, lon: number, unit: string, apiKey: string) =>
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&&appid=${apiKey}`;

export { geocodingUrl, weatherUrl };
