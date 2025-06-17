import { parse, format, isValid } from "date-fns";

type ModeType = "date" | "time";
export const parseDateTimeForInput = (datetimeStr: string, mode: ModeType) => {
  // extract if date format is like this (dd-MMM-yyyy)
  if (isDateValid(datetimeStr)) {
    const parsed = parse(datetimeStr, "dd-MMM-yyyy", new Date());
    return format(parsed, "yyyy-MM-dd");
  }

  const parsed = parse(datetimeStr, "dd-MMM-yyyy hh:mm a", new Date());
  if (mode === "date") {
    return format(parsed, "yyyy-MM-dd"); // For <input type="date">
  } else {
    return format(parsed, "HH:mm"); // For <input type="time">
  }
};

const isDateValid = (datetimeStr: string, expectedFormat = "dd-MMM-yyyy") => {
  try {
    // Parse the input string into a Date object
    const parsedDate = parse(datetimeStr, expectedFormat, new Date());

    // Check if the parsed date is valid
    if (!isValid(parsedDate)) {
      return false;
    }

    // Optional: Reformat and compare to ensure strict format adherence
    const reformatted = format(parsedDate, expectedFormat);
    return reformatted === datetimeStr;
  } catch (e) {
    return false;
  }
};
