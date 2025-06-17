import { parse, format } from "date-fns";

type ModeType = "date" | "time";
export const parseDateTimeForInput = (datetimeStr: string, mode: ModeType) => {
  const parsed = parse(datetimeStr, "dd-MMM-yyyy hh:mm a", new Date());
  if (mode === "date") {
    return format(parsed, "yyyy-MM-dd"); // For <input type="date">
  } else {
    return format(parsed, "HH:mm"); // For <input type="time">
  }
};
