import React from "react";

function Filter({ onCategoryChange, selectedCategory, categories }) {
  const handleChange = (event) => {
    if (event.target.value !== selectedCategory) {
      onCategoryChange(event.target.value); // Pass only the value
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="Filter">
        <select
          name="filter"
          onChange={handleChange}
          value={selectedCategory || ""}
        >
          <option value="">Select a category</option>
        </select>
      </div>
    );
  }

  return (
    <div className="Filter">
      <select
        name="filter"
        onChange={handleChange}
        value={selectedCategory || ""}
      >
        <option value="All">Filter by category</option>
        {categories.filter((cat) => cat !== "All").map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;