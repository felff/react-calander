import dayjs from "dayjs";
interface Props {
  day: number;
  date: dayjs.Dayjs;
  ativeDayClass: (date: dayjs.Dayjs) => "calendar__day--active" | undefined;
  onClick?: (date: dayjs.Dayjs) => void;
  todayClass?: "calendar__day--today" | "";
  isCurrentMonth?: boolean;
}
export const Date = ({
  date,
  day,
  ativeDayClass,
  todayClass = "",
  isCurrentMonth = false,
  onClick = () => {},
}: Props) => {
  const currentMonthClass = isCurrentMonth
    ? todayClass
    : "calendar__day--empty";
  return (
    <div
      className={`calendar__day ${currentMonthClass}  ${ativeDayClass(date)}`}
      onClick={() => {
        onClick(date);
      }}
    >
      {`${day}日`}
    </div>
  );
};
