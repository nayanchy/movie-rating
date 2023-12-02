import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 32,
  className = "",
  messages = [],
  defaultRating = null,
  onSetRating = () => {},
}) => {
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(null);
  const handleClick = (index) => {
    setRating(index + 1);
    onSetRating(index + 1);
  };
  const handleHover = (index) => {
    setHoverRating(index + 1);
  };
  const handleHoverLeave = () => {
    setHoverRating(0);
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i + 1}
            onClick={() => handleClick(i)}
            isFull={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            onHover={() => handleHover(i)}
            onLeave={handleHoverLeave}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length > 0
          ? messages[hoverRating ? hoverRating - 1 : rating - 1]
          : hoverRating
          ? hoverRating
          : rating}
      </p>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default StarRating;
