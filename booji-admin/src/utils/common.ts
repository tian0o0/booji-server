import momentMini from "moment-mini";

export const timeFormat = (time: string): string => {
  return momentMini(time).format("YYYY-MM-DD hh:mm:ss");
};
