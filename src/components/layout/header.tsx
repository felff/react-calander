import React from "react";
import { ChangeMonthEnum } from "../utils/common-type";

interface Props {
  year: number;
  month: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}
const Header = ({ year, month, setYear, setMonth }: Props) => {
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
  );
};

export default Header;
