import React from 'react';
import { Carousel } from 'react-bootstrap';
import classes from './SingleProduct.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const SingleProduct = ({ images, title }) => {
  images = [
    "http://localhost:8080/front.jpg",
    "http://localhost:8080/back.jpg",
    "http://localhost:8080/1.jpg",
    "http://localhost:8080/2.jpg",
    "http://localhost:8080/3.jpg"
  ];

  return (
    <div className={classes.singleProduct}>
      <div className={classes.mainImage}>
        <Carousel
          
          nextIcon={<span className={`carousel-control-next-icon ${classes.carouselArrow}`} />}
          prevIcon={<span className={`carousel-control-prev-icon ${classes.carouselArrow}`} />}
        >
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div className={classes.imageContainer}>
                <img src={image} alt={`${title} ${index + 1}`} className="d-block w-100" />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SingleProduct;
