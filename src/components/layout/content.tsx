import { useCallback, useState } from "react";
import dayjs from "dayjs";
import {
  getMonthFirstDay,
  getMonthLastDate,
  getMonthLastDay,
} from "../utils/helper";
import { Date } from "../common/component/date";
interface Props {
  year: number;
  month: number;
}
const Content = ({ year, month }: Props) => {
  const [tempDate, setTempDate] = useState<dayjs.Dayjs[]>([]);
  const [firstClickCalendar, setFirstClickCalendar] = useState<boolean>(true);
  const calendarDate = useCallback(
    (month: number, year: number) => {
      const dateClick = (date: dayjs.Dayjs) => {
        if (firstClickCalendar) {
          setFirstClickCalendar(false);
          setTempDate([date]);
        } else {
          if (tempDate.length === 2 || tempDate[0].isAfter(date)) {
            setTempDate([date]);
          } else if (tempDate[0].isBefore(date)) {
            setTempDate((d) => [...d, date]);
          }
        }
      };
      const ativeDayClass = (date: dayjs.Dayjs) => {
        switch (tempDate.length) {
          case 1:
            if (date.isSame(tempDate[0])) return "calendar__day--active";
            else break;
          case 2:
            if (
              (date.isAfter(tempDate[0]) && date.isBefore(tempDate[1])) ||
              date.isSame(tempDate[0]) ||
              date.isSame(tempDate[1])
            )
              return "calendar__day--active";
            else break;
        }
      };
      const blankMonthLastDate = getMonthLastDate(month - 1, year);
      const blanks = Array(getMonthFirstDay(month, year))
        .fill(0)
        .map((_, i) => {
          const day = blankMonthLastDate - i;
          const date = dayjs(`${year}-${month - 1}-${day}`);
          return (
            <Date
              key={`blank-${i}`}
              day={day}
              date={date}
              ativeDayClass={ativeDayClass}
            />
          );
        });
      const daysInMonth = Array(getMonthLastDate(month, year))
        .fill(0)
        .map((_, i) => {
          const day = i + 1;
          const date = dayjs(`${year}-${month}-${day}`);
          const todayClass = date.isSame(dayjs(), "day")
            ? "calendar__day--today"
            : "";
          return (
            <Date
              key={`current-${day}`}
              day={day}
              date={date}
              ativeDayClass={ativeDayClass}
              todayClass={todayClass}
              onClick={dateClick}
              isCurrentMonth
            />
          );
        });

      const lastDays = Array(6 - getMonthLastDay(month, year))
        .fill(0)
        .map((_, i) => {
          const day = i + 1;
          const date = dayjs(`${year}-${month + 1}-${day}`);
          return (
            <Date
              key={`last-${day}`}
              date={date}
              day={day}
              ativeDayClass={ativeDayClass}
            />
          );
        });

      return [...blanks, ...daysInMonth, ...lastDays];
    },
    [firstClickCalendar, tempDate]
  );
  return <div className="calendar">{calendarDate(month, year)}</div>;
};

export default Content;
