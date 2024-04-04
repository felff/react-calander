import { useCallback, useState } from "react";
import "./calender.scss";
import {
  ChangeMonthEnum,
  getMonthFirstDay,
  getMonthLastDate,
  getMonthLastDay,
  THIS_MONTH,
  THIS_YEAR,
  zeroPad,
} from "./calender";
import dayjs from "dayjs";
const Calender = () => {
  const [year, setYear] = useState(THIS_YEAR());
  const [month, setMonth] = useState(THIS_MONTH());
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
      const blanks = Array(getMonthFirstDay(month, year))
        .fill(0)
        .map((_, i) => {
          const day = getMonthLastDate(month - 1, year) - i;
          return (
            <div
              key={`blank-${i}`}
              className={`calendar__day calendar__day--empty ${ativeDayClass(
                dayjs(`${year}-${month - 1}-${day}`)
              )}`}
            >
              {`${day}日`}
            </div>
          );
        });
      const daysInMonth = Array(getMonthLastDate(month, year))
        .fill(0)
        .map((_, i) => {
          const day = i + 1;
          const date = dayjs(`${year}-${zeroPad(month, 2)}-${zeroPad(day, 2)}`);
          const todayClass = date.isSame(dayjs(), "day")
            ? "calendar__day--today"
            : "";
          return (
            <div
              key={`current-${day}`}
              className={`calendar__day ${todayClass}  ${ativeDayClass(
                dayjs(`${year}-${month}-${day}`)
              )}`}
              onClick={() => {
                dateClick(dayjs(`${year}-${month}-${day}`));
              }}
            >
              {`${day}日`}
            </div>
          );
        });

      const lastDays = Array(6 - getMonthLastDay(month, year))
        .fill(0)
        .map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={`last-${day}`}
              className={`calendar__day calendar__day--empty ${ativeDayClass(
                dayjs(`${year}-${month + 1}-${day}`)
              )}`}
            >
              {`${day}日`}
            </div>
          );
        });

      return [...blanks, ...daysInMonth, ...lastDays];
    },
    [firstClickCalendar, tempDate]
  );

  const onChangeMonth = (buttonType: ChangeMonthEnum) => {
    switch (buttonType) {
      case ChangeMonthEnum.PREVIOUS:
        if (month === 1) {
          setYear((y) => y - 1);
          setMonth(12);
        } else setMonth((m) => m - 1);
        break;
      case ChangeMonthEnum.NEXT:
        if (month === 12) {
          setYear((y) => y + 1);
          setMonth(1);
        } else setMonth((m) => m + 1);
        break;

      default:
        break;
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div
          className="header__button"
          onClick={() => {
            onChangeMonth(ChangeMonthEnum.PREVIOUS);
          }}
        >
          {"‹"}
        </div>
        <div className="header__content">{`${year}年${month}月`}</div>
        <div
          className="header__button"
          onClick={() => {
            onChangeMonth(ChangeMonthEnum.NEXT);
          }}
        >
          {"›"}
        </div>
      </div>
      <div className="calendar">{calendarDate(month, year)}</div>
    </div>
  );
};

export default Calender;
