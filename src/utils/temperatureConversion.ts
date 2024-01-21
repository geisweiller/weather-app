const temperatureConversion = (temp: number, from: string, to: string) => {
  if (from === "C" && to === "F") {
    return temp * 1.8 + 32;
  }
  if (from === "F" && to === "C") {
    return (temp - 32) / 1.8;
  }
  if (from === "K" && to === "C") {
    return temp - 273.15;
  }
  if (from === "C" && to === "K") {
    return temp + 273.15;
  }
};

export { temperatureConversion };
