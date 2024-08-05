import React from 'react';
import { Carousel } from 'react-bootstrap';
import classes from './SingleProduct.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const SingleProduct = ({ images, title, mainImage, backImage }) => {
  images = [mainImage, ...images, backImage];
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
