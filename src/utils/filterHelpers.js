// Helper to parse comma-separated string into array
export const parseToArray = (str) =>
  str
    ? str
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

export const getArraySummary = (strArray) => {
  if (!strArray || strArray.length === 0) return null;
  if (strArray.length === 1) return strArray[0];
  return `${strArray.length} Selected`;
};

export const getRangeSummary = (min, max, unit = "") => {
  if (min !== "" && max !== "") return `${min} - ${max} ${unit}`;
  if (min !== "") return `${min}+ ${unit}`;
  if (max !== "") return `Up to ${max} ${unit}`;
  return null;
};

export const getLocationSummary = (city, country) => {
  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return null;
};
