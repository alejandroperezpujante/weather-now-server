import type {
  DEFAULT_FETCH_OPTIONS_T,
  DEFAULT_HEADERS_T,
} from "../types/index.ts";

// Set via Deno Deploy's enviroment variables. Mock them during development.
const RAPID_API_BASE_URL = Deno.env.get("RAPID_API_BASE_URL") as string;
const RAPID_API_HOST = Deno.env.get("RAPID_API_HOST") as string;
const RAPID_API_KEY = Deno.env.get("RAPID_API_KEY") as string;

const DEFAULT_HEADERS: DEFAULT_HEADERS_T = {
  "Content-Type": "application/json",
  "X-RapidAPI-Host": RAPID_API_HOST,
  "X-RapidAPI-Key": RAPID_API_KEY,
};

const DEFAULT_FETCH_OPTIONS: DEFAULT_FETCH_OPTIONS_T = {
  method: "GET",
  headers: DEFAULT_HEADERS,
};

/*
* This validators are extracted from the "validasaur" library and modified to fit the needs of this app
* throught the fair use of the MIT license.
* All credits and rights over the code belongs to "emfisa" (https://github.com/emsifa)
* and the contributors of the "validasaur" library (https://github.com/emsifa/validasaur).
*/

const isIPv4 = (value: any): boolean => {
  return typeof value !== "string" ||
      !value.match(/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/)
    ? false
    : true;
};

const isIPv6 = (value: any): boolean => {
  if (typeof value !== "string") return false;

  const segments = value.split(":");

  const invalidSegments = segments.filter(
    (s) => !s.match(/^(|[0-9a-f]{1,4})$/i),
  );

  if (invalidSegments.length > 0) return false;

  const emptySegmentsCount = segments.filter((s) => s === "").length;
  const startsWithLeadingZeros = value.match(/^::/) ? true : false;
  const endsWithLeadingZeros = value.match(/::$/) ? true : false;

  const maxSegments = startsWithLeadingZeros || endsWithLeadingZeros ? 9 : 8;

  let maxEmptySegments = 1;
  if (startsWithLeadingZeros) {
    maxEmptySegments += 1;
  }
  if (endsWithLeadingZeros) {
    maxEmptySegments += 1;
  }

  if (segments.length > maxSegments || emptySegmentsCount > maxEmptySegments) {
    return false;
  }

  return true;
};

export { DEFAULT_FETCH_OPTIONS, isIPv4, isIPv6, RAPID_API_BASE_URL };
