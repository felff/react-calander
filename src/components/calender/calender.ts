export const THIS_YEAR = () => +new Date().getFullYear();
// 1 => January, 12 => December
export const THIS_MONTH = () => +new Date().getMonth() + 1;
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value: number, length: number) => {
  return `${value}`.padStart(length, "0");
};
export const getMonthFirstDay = (month = THIS_MONTH(), year = THIS_YEAR()) => {
  return +new Date(year, month - 1, 1).getDay();
};
export const getMonthLastDate = (month = THIS_MONTH(), year = THIS_YEAR()) => {
  return +new Date(year, month, 0).getDate();
};
export const getMonthLastDay = (month = THIS_MONTH(), year = THIS_YEAR()) => {
  return +new Date(year, month, 0).getDay();
};

export enum ChangeMonthEnum {
  NEXT,
  PREVIOUS,
}
