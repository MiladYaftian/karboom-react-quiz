import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

const Searchbar = ({ search, setSearch, handleAddNewItem }) => {
  const handleAddItem = () => {
    handleAddNewItem(search);
    setSearch("");
  };
  return (
    <div className="searchbar-wrapper">
      <div className="add-btn-container">
        <FaPlus className="add-btn" onClick={handleAddItem} />
      </div>
      <div className="searchbar-container">
        <label htmlFor="searchbar">
          <FaSearch className="search-icon" />
        </label>
        <input
          type="text"
          className="search-input"
          id="searchbar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Something..."
        />
      </div>
    </div>
  );
};

export default Searchbar;
