import { fireEvent, render } from "@testing-library/react";
import {
  THIS_YEAR,
  THIS_MONTH,
  getMonthFirstDay,
  getMonthLastDate,
  getMonthLastDay,
} from "../components/utils/helper";
import Calender from "../components/pages/calander";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

describe("Calendar Component", () => {
  test("renders with correct initial month and year", () => {
    const { getByText } = render(<Calender />);
    const headerContent = getByText(`${THIS_YEAR()}年${THIS_MONTH()}月`);
    expect(headerContent).toBeInTheDocument();
  });

  test("clicking next button updates month and year correctly", () => {
    const { getByText } = render(<Calender />);
    const nextButton = getByText("›");
    fireEvent.click(nextButton);
    const headerContent = getByText(`${THIS_YEAR()}年${THIS_MONTH() + 1}月`);
    expect(headerContent).toBeInTheDocument();
  });

  test("clicking previous button updates month and year correctly", () => {
    const { getByText } = render(<Calender />);
    const previousButton = getByText("‹");
    fireEvent.click(previousButton);
    const headerContent = getByText(`${THIS_YEAR()}年${THIS_MONTH() - 1}月`);
    expect(headerContent).toBeInTheDocument();
  });

  test("getMonthFirstDay returns correct value", () => {
    expect(getMonthFirstDay(4, 2024)).toBe(1); // April 1, 2024 is Friday
  });

  test("getMonthLastDate returns correct value", () => {
    expect(getMonthLastDate(4, 2024)).toBe(30); // April 2024 has 30 days
  });

  test("getMonthLastDay returns correct value", () => {
    expect(getMonthLastDay(4, 2024)).toBe(2); // April 30, 2024 is Tuesday
  });
});
