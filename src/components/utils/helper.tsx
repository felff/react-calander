export const THIS_YEAR = () => +new Date().getFullYear();

export const THIS_MONTH = () => +new Date().getMonth() + 1;

export const getMonthFirstDay = (month = THIS_MONTH(), year = THIS_YEAR()) => {
  return +new Date(year, month - 1, 1).getDay();
};
export const getMonthLastDate = (month = THIS_MONTH(), year = THIS_YEAR()) => {
  return +new Date(year, month, 0).getDate();
};
export const getMonthLastDay = (month = THIS_MONTH(), year = THIS_YEAR()) => {
  return +new Date(year, month, 0).getDay();
};

