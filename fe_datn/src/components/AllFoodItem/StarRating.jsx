import React from "react";
import "./StarRating.scss";

const StarRating = ({ rating }) => {
  const getStarFill = (index) => {
    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;
    const isFullStar = index < fullStars;
    const isPartialStar = index === fullStars && remainder > 0;
    const percentage = Math.round(remainder * 10) * 10;

    return isFullStar
      ? "#ffc400"
      : isPartialStar
      ? `url(#star-${percentage})`
      : "#dcdcdc";
  };

  return (
    <div className="star-rating">
      <svg width="0" height="0">
        <defs>
          {[...Array(10)].map((_, i) => (
            <linearGradient
              key={i}
              id={`star-${(i + 1) * 10}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset={`${(i + 1) * 10}%`} stopColor="#ffc400" />
              <stop offset={`${(i + 1) * 10}%`} stopColor="#dcdcdc" />
            </linearGradient>
          ))}
        </defs>
      </svg>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="star"
        >
          <path
            d="M12 2l2.39 4.83L20 8.3l-3.67 3.57L17 18l-5-2.63L7 18l1.67-6.53L5 8.3l5.61-.77L12 2z"
            fill={getStarFill(i)}
            stroke="#666" // Màu viền nhẹ hơn
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
