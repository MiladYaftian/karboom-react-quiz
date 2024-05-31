import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./components/Searchbar";
import SingleItem from "./components/SingleItem";
import { FaPlus } from "react-icons/fa";
import { generateRandomColor } from "./RandomColor";

const App = () => {
  const [responseData, setResponseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/data");
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = Object.values(responseData).filter(
        (item) =>
          item.title.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchQuery, responseData]);

  const handleAddNewItem = async (query) => {
    try {
      const response = await axios.get("http://localhost:3001/data");
      const responseData = response.data;

      const lastItemKey = parseInt(Object.keys(responseData).pop());
      const newKey = lastItemKey + 1;

      const newItem = {
        title: { text: query },
        description: responseData[lastItemKey].description,
        img: responseData[lastItemKey].img,
        color: generateRandomColor(),
      };

      const dataToSend = {
        [newKey]: newItem,
      };

      await axios.patch("http://localhost:3001/data", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNewItems((prevItems) => [...prevItems, { id: newKey, ...newItem }]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = (itemId) => {
    setNewItems(newItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <Searchbar
        search={searchQuery}
        setSearch={setSearchQuery}
        handleAddNewItem={handleAddNewItem}
      />
      <div>
        {searchQuery === "" &&
        filteredResults.length <= 0 &&
        newItems.length <= 0 ? (
          <p className="search-instruction">
            Please enter a search query.
            <br /> e.g: unleash creativity
          </p>
        ) : (
          <>
            {filteredResults.length > 0 || newItems.length > 0 ? (
              filteredResults.map((item, index) => (
                <SingleItem key={index} item={item} />
              ))
            ) : (
              <p className="no-results-text">
                No results found. Click <FaPlus className="add-btn" /> to add
                your item to the list.
              </p>
            )}
          </>
        )}
      </div>
      {newItems.map((newItem) => (
        <SingleItem
          key={newItem.id}
          item={newItem}
          onDelete={handleDeleteItem}
        />
      ))}
    </div>
  );
};

export default App;
