import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

test("toggles dark mode", () => {
  render(<App />);
  const button = screen.getByText(/light mode/i);
  fireEvent.click(button);
  expect(button.textContent).toBe("Dark Mode");
});