const switchOptions = (unit: string) => [
  {
    id: "metric",
    label: "°C",
    selected: unit === "metric",
  },
  {
    id: "imperial",
    label: "°F",
    selected: unit === "imperial",
  },
];

export { switchOptions };
