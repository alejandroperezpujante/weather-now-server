import { Router } from "../deps.ts";
import { getCurrentWeather } from "../services/index.ts";
import { isIPv4, isIPv6 } from "../utils/index.ts";

const router = new Router();

router.get("/", (context) => {
  context.response.body =
    "Hello, welcome to the Weather Now's API. Please use the app to interact with the API.";
});

router.get(
  "/getWeatherByCity/:city",
  async (context) => {
    if (!context?.params?.city) {
      context.response.status = 400;
      context.response.body = "Please provide a city name.";
      return;
    }
    const city = context.params.city;

    if (city === "" || !isNaN(Number(city))) {
      context.response.status = 400;
      context.response.body = "Please provide a valid city name.";
      return;
    }

    try {
      const weather = await getCurrentWeather(city);
      context.response.body = weather;
      return;
    } catch (error) {
      if (error instanceof Error) {
        context.response.status = 400;
        context.response.body = error.message;
        return;
      }
    }
  },
);

router.get(
  "/getWeatherByCoords/:lat/:lon",
  async (context) => {
    if (!context?.params?.lat || !context?.params?.lon) {
      context.response.status = 400;
      context.response.body = "Please provide a latitude and longitude.";
      return;
    }

    const lat = context.params.lat;
    const lon = context.params.lon;

    if (lat === "" || lon === "" || isNaN(Number(lat)) || isNaN(Number(lon))) {
      context.response.status = 400;
      context.response.body = "Please provide a valid latitude and longitude.";
      return;
    }

    const coords = `${lat},${lon}`;

    try {
      const weather = await getCurrentWeather(coords);
      context.response.body = weather;
      return;
    } catch (error) {
      if (error instanceof Error) {
        context.response.status = 400;
        context.response.body = error.message;
        return;
      }
    }
  },
);

router.get(
  "/getWeatherByIp/:ip",
  async (context) => {
    if (!context?.params?.ip) {
      context.response.status = 400;
      context.response.body = "Please provide an IP address.";
      return;
    }

    const ip = context.params.ip;
    if (!isIPv4(ip) && !isIPv6(ip)) {
      context.response.status = 400;
      context.response.body = "Please provide a valid IP address.";
      return;
    }

    try {
      const weather = await getCurrentWeather(ip);
      context.response.body = weather;
      return;
    } catch (error) {
      if (error instanceof Error) {
        context.response.status = 400;
        context.response.body = error.message;
        return;
      }
    }
  },
);

export default router;
