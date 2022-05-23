import { DEFAULT_FETCH_OPTIONS, RAPID_API_BASE_URL } from "../utils/index.ts";

/**
 * It takes a city name as a string, makes a request to the RapidAPI endpoint, and returns the weather
 * data as a JSON object
 * @param {string} city - string - the city name to search for
 * @returns The current weather for the city.
 */
export const getCurrentWeather = async (city: string) => {
  try {
    const response = await fetch(
      `${RAPID_API_BASE_URL}/current.json?q=${city}`,
      DEFAULT_FETCH_OPTIONS,
    );

    if (!response.ok) {
      throw new Error("Sorry, we couldn't find the city. Try again.");
    }

    const weather = await response.json();
    return weather;
  } catch (error) {
    throw error;
  }
};
