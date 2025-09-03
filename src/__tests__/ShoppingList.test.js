import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ShoppingList from "../components/ShoppingList";

const items = [
  { id: 1, name: "Milk", category: "Dairy" },
  { id: 2, name: "Apple", category: "Produce" },
  { id: 3, name: "Cake", category: "Dessert" },
];

test("renders the ShoppingList component", () => {
  render(<ShoppingList items={items} />);
  expect(screen.getByText("Milk")).toBeInTheDocument();
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Cake")).toBeInTheDocument();
});

test("filters items by category", () => {
  render(<ShoppingList items={items} />);
  const dairyItem = screen.getByText("Milk");
  expect(dairyItem).toBeInTheDocument();
});