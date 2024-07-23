import React from 'react';
import '../index.css';

const Card = ({ image, hoverImage, title, price, description }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" />
        <img src={hoverImage} alt={title} className="card-hover-image" />
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-price">{price}</p>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
