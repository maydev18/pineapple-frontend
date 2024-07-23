import React, { useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import Footer from './Footer';
import Header from '../Components/Header';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import back from '../images/back.jpg';
import front from '../images/front.jpg';
import CustomArrow from '../Components/CustomArrow';
import CartSidebar from '../Components/CartSidebar';

const product = {
  name: 'TECTONEER NAVY REGULAR FIT SHORTS',
  price: 'INR 1599',
  rating: 4,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  mainImage: back,
  images: [front, front, front, front],
};

const sizes = ['S', 'M', 'L', 'XL'];

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <div className="product-page">
        <SingleProduct product={product} />
        <div className="product-details">
          <h2>{product.name}</h2>
          <p className="product-price">{product.price}</p>
          <div className="product-rating">
            {[...Array(5)].map((star, index) => (
              <span key={index} className={`star ${index < product.rating ? 'filled' : ''}`}>&#9733;</span>
            ))}
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-sizes">
            <p>Select Size:</p>
            <div className="sizes">
              {sizes.map((size) => (
                <button key={size} className="size-button">{size}</button>
              ))}
            </div>
          </div>
          <div className="product-quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className="product-buttons">
            <button className="button add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="button add-to-wishlist">Wishlist</button>
          </div>
        </div>
      </div>
      <CartSidebar product={product} quantity={quantity} isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="related-products">
        <h3>YOU MAY ALSO LIKE</h3>
        <Slider {...settings}>
          {Array(5).fill(product).map((relatedProduct, index) => (
            <div key={index}>
              <SingleProduct product={relatedProduct} />
            </div>
          ))}
        </Slider>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
