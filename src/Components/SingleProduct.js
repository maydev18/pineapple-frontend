import React from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import arrowLeftCircle from '@iconify-icons/mdi/arrow-left-circle';
import arrowRightCircle from '@iconify-icons/mdi/arrow-right-circle';
import classes from './SingleProduct.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SingleProduct = ({ images,  title , mainImage , backImage }) => {
  images = [mainImage , ...images , backImage];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div className={`${classes.customArrow} ${classes.customNextArrow}`}>
        <Icon icon={arrowRightCircle} />
      </div>
    ),
    prevArrow: (
      <div className={`${classes.customArrow} ${classes.customPrevArrow}`}>
        <Icon icon={arrowLeftCircle} />
      </div>
    ),
  };

  return (
    <div className={classes.singleProduct}>
      <div className={classes.mainImage}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={classes.imageContainer}>
              <img src={image} alt={`${title} ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SingleProduct;
