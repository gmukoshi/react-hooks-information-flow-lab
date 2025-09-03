import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";

test("displays the <select> element", () => {
  render(<Filter onCategoryChange={() => {}} selectedCategory="All" />);
  expect(screen.queryByRole("combobox")).toBeInTheDocument();
});

test("calls the onCategoryChange callback prop when the <select> is changed", () => {
  const onCategoryChange = jest.fn();
  render(
    <Filter
      onCategoryChange={onCategoryChange}
      selectedCategory="All"
      categories={["All", "Dairy", "Produce"]}
    />
  );

  fireEvent.change(screen.queryByRole("combobox"), {
    target: { value: "Dairy" },
  });
  expect(onCategoryChange).toHaveBeenCalledWith("Dairy");
});

test("renders the correct number of <option> elements", () => {
  const categories = ["All", "Produce", "Dairy", "Meat"];
  render(
    <Filter
      categories={categories}
      onCategoryChange={() => {}}
      selectedCategory="All"
    />
  );
  const options = screen.getAllByRole("option");
  expect(options).toHaveLength(categories.length);
});

test("displays the correct default selected value", () => {
  render(
    <Filter
      selectedCategory="All"
      onCategoryChange={() => {}}
      categories={["All", "Dairy", "Produce"]}
    />
  );
  expect(screen.queryByRole("combobox").value).toBe("All");
});

test("updates the selected value when a new option is selected", () => {
  let selectedCategory = "All";
  const onCategoryChange = (newCategory) => {
    selectedCategory = newCategory;
  };

  const { rerender } = render(
    <Filter
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      categories={["All", "Meat"]}
    />
  );

  const selectElement = screen.queryByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "Meat" } });

  // Rerender with updated state
  rerender(
    <Filter
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      categories={["All", "Meat"]}
    />
  );

  expect(selectElement.value).toBe("Meat");
});

test("renders a placeholder option when no categories are provided", () => {
  render(<Filter onCategoryChange={() => {}} />);
  const options = screen.getAllByRole("option");
  expect(options).toHaveLength(1);
  expect(options[0].textContent).toBe("Select a category");
});

test("does not call onCategoryChange if the same option is selected", () => {
  const onCategoryChange = jest.fn();
  render(
    <Filter
      selectedCategory="All"
      onCategoryChange={onCategoryChange}
      categories={["All", "Meat"]}
    />
  );

  const selectElement = screen.queryByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "All" } });
  expect(onCategoryChange).not.toHaveBeenCalled();
});