import { useState } from "react";
import { THIS_MONTH, THIS_YEAR } from "../../utils/helper";
import Header from "../../layout/header";
import Content from "../../layout/content";

const Calender = () => {
  const [year, setYear] = useState(THIS_YEAR());
  const [month, setMonth] = useState(THIS_MONTH());

  return (
    <div className="container">
      <Header year={year} month={month} setMonth={setMonth} setYear={setYear} />
      <Content year={year} month={month} />
    </div>
  );
};

export default Calender;
