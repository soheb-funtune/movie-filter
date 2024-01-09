import React from "react";
import "../App.css";

const List = ({ sortedData, rattingStar }) => {
  return sortedData?.length > 0 ? (
    <div className="list-container">
      {sortedData?.map(({ movie, rating, category }, i) => (
        <div className="list-item">
          <div className="movie-container">
            <p>{movie}</p>
            <p style={{ color: "gray" }}>{category}</p>
          </div>
          <p className="ratting">{rattingStar(rating)}</p>
        </div>
      ))}
    </div>
  ) : (
    <noscript />
  );
};

export default List;
