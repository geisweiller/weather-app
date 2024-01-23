# Weather app

You can see the app live [here](https://geisweiller.github.io/weather-app/).

![ScreenRecording2024-01-23at11 35 38-ezgif com-video-to-gif-converter](https://github.com/geisweiller/global-components/assets/50842954/eec853ce-3973-4826-9f27-37cd24d3f055)

### Description:

- This is a simple weather app that shows the weather forecast for searched cities.

  - Features:
    - Search for any city in the world.
    - Shows the current weather, humidity, wind speed, alerts and forecast for next 7 days.
    - Switch between Celsius and Fahrenheit
    - Star your favorite cities and access them quickly.

- The app uses the [OpenWeatherMap](https://openweathermap.org/) API to get the weather data.

- The app is built with React + Vite + Typescript.

- The app use Storybook to develop the components.

- The app is tested with Vitest + React Testing Library.

- The app is deployed in Github Pages.

## Instructions:

You can run through a docker container or locally.

### Docker:

1. Build the image

```
$ docker build -t weather-app .

```

2. Run the container

```
$ docker run -p 8000:8000 weather-app

```

3. Open up your browser and browser your server's IP

e.g:

```
localhost:8000/weather-app/

```

### Locally:

1. Install dependencies with your favorite package manager

```
$ pnpm install

```

2. Set OPEN_WEATHER_API_KEY environment variable

```
$ export OPEN_WEATHER_API_KEY=<your api key>

```

3. To run the app

```
$ cd weather-app
$ pnpm dev

```

4. Open up your browser and browser your server's IP

e.g:

```

http://localhost:5173/weather-app/


```

$ pnpm test

```

5. To run storybook

```

$ pnpm storybook

```

6. To collect tests coverage

```

$ npm coverage

```
$ pnpm coverage

```
