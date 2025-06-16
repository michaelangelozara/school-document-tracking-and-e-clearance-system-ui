import { parse, format } from "date-fns";

type ModeType = "date" | "time";
export const parseDateTimeForInput = (datetimeStr: string, mode: ModeType) => {
  if (mode === "date") {
    const parsed = parse(datetimeStr, "dd-MMM-yyyy", new Date());
    return format(parsed, "yyyy-MM-dd"); // For <input type="date">
  } else {
    const parsed = parse(datetimeStr, "dd-MMM-yyyy hh:mm a", new Date());
    return format(parsed, "HH:mm"); // For <input type="time">
  }
};
