import { Router } from "../deps.ts";
import { getCurrentWeather } from "../services/index.ts";
import { isIPv4, isIPv6 } from "../utils/index.ts";

const router = new Router();

// Router requires callback to be async, even if It doesn't perform any async operations.
// deno-lint-ignore require-await
router.get("/", async () => {
  return new Response(
    "Hello, welcome to the Weather Now's API. Please use the app to interact with the API.",
    { status: 200 },
  );
});

router.get(
  "/getCurrentWeatherByCity",
  async (r: Request, _p: Record<string, string>) => {
    const city = r.url.split("city=")[1];

    if (city === "" || !isNaN(Number(city))) {
      return new Response(
        "Please use a valid city.",
        { status: 400 },
      );
    }

    try {
      const weather = await getCurrentWeather(city);
      return new Response(JSON.stringify(weather), { status: 200 });
    } catch (error) {
      return new Response(
        error.message,
        { status: 400 },
      );
    }
  },
);

router.get(
  "/getCurrentWeatherByCoords",
  async (r: Request, _p: Record<string, string>) => {
    const coords = r.url.split("coords=")[1];

    if (coords === "" || coords.split(",").length !== 2) {
      return new Response(
        "Please use valid coordinates.",
        { status: 400 },
      );
    }

    try {
      const weather = await getCurrentWeather(coords);
      return new Response(JSON.stringify(weather), { status: 200 });
    } catch (error) {
      return new Response(
        error.message,
        { status: 400 },
      );
    }
  },
);

router.get(
  "/getCurrentWeatherByIp",
  async (r: Request, _p: Record<string, string>) => {
    const ip = r.url.split("ip=")[1];

    if (!isIPv4(ip) && !isIPv6(ip)) {
      return new Response(
        "Please use a valid IP.",
        { status: 400 },
      );
    }

    try {
      const weather = await getCurrentWeather(ip);
      return new Response(JSON.stringify(weather), { status: 200 });
    } catch (error) {
      return new Response(
        error.message,
        { status: 400 },
      );
    }
  },
);

export default router;
