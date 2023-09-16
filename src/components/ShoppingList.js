import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import items from "../data/items";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [shoppingItems, setShoppingItems] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleItemFormSubmit(newItem) {
    setShoppingItems([...shoppingItems, newItem]);
  }

  // Combine the filtered items into a single array
  const filteredItems = shoppingItems.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  }).filter((item) => {
    if (searchValue === "") return true;
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
