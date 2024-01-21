const tempUnitConversion = (unit: string) => {
  if (unit === "metric") {
    return "°C";
  }
  return "°F";
};

const windUnitConversion = (unit: string) => {
  if (unit === "metric") {
    return "km/h";
  }
  return "mph";
};

export { tempUnitConversion, windUnitConversion };
