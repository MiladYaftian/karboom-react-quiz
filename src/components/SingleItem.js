import React from "react";
import { FaTrash } from "react-icons/fa";

const SingleItem = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <section className="single-item-wrapper">
      <div className="single-item-container">
        <div className="single-item-info-wrapper">
          <img
            src={item.img}
            alt="placeholder image"
            className="single-item-image"
          />
          <div className="single-item-info">
            <h4 className="single-item-title">{item.title.text}</h4>
            <p className="single-item-desc">{item.description}</p>
          </div>
        </div>
        <div className="trash-icon-wrapper">
          <FaTrash className="trash-icon" onClick={handleDelete} />
        </div>
      </div>
      <div
        className="single-item-bar"
        style={{ backgroundColor: item.color }}
      ></div>
    </section>
  );
};

export default SingleItem;
