import React, { useState } from "react";
import Filter from "./Filter"; // Corrected import path
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Produce", "Dairy", "Dessert"]; // Define categories

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <Filter 
        onCategoryChange={handleCategoryChange} 
        selectedCategory={selectedCategory}
        categories={categories} // Pass categories array
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;