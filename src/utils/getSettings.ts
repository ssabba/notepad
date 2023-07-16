// next
import { NextApiRequestCookies } from "next/dist/server/api-utils";
// config
import { defaultSettings, cookiesKey } from "../../config";

// ----------------------------------------------------------------------

export const getSettings = (cookies: NextApiRequestCookies) => {
  const themeDirection =
    getData(cookies[cookiesKey.themeDirection]) ||
    defaultSettings.themeDirection;

  return {
    themeDirection,
  };
};

// ----------------------------------------------------------------------

const getData = (value: string | undefined) => {
  if (value === "true" || value === "false") {
    return JSON.parse(value);
  }
  if (value === "undefined" || !value) {
    return "";
  }
  return value;
};
