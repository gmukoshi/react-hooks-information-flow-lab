import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

test("displays the toggle button", () => {
  render(<Header />);
  expect(screen.queryByText(/ Mode/)).toBeInTheDocument();
});

test("calls the onDarkModeClick callback prop when the button is clicked", () => {
  const onDarkModeClick = jest.fn();
  render(<Header onDarkModeClick={onDarkModeClick} />);

  fireEvent.click(screen.queryByText(/ Mode/));
  expect(onDarkModeClick).toHaveBeenCalled();
});

test("renders the correct initial mode text", () => {
  render(<Header isDarkMode={false} />);
  expect(screen.queryByText("Light Mode")).toBeInTheDocument();

  render(<Header isDarkMode={true} />);
  expect(screen.queryByText("Dark Mode")).toBeInTheDocument();
});

test("toggles the mode text when the button is clicked", () => {
  const onDarkModeClick = jest.fn();
  render(<Header isDarkMode={false} onDarkModeClick={onDarkModeClick} />);

  const button = screen.queryByText("Light Mode");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(onDarkModeClick).toHaveBeenCalled();
});
