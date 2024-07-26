import React from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import arrowLeftCircle from '@iconify-icons/mdi/arrow-left-circle';
import arrowRightCircle from '@iconify-icons/mdi/arrow-right-circle';
import classes from './SingleProduct.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import back from '../images/back.jpg';
import front from '../images/front.jpg';

const SingleProduct = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div className={classes.customArrow + ' ' + classes.customNextArrow}>
        <Icon icon={arrowRightCircle} />
      </div>
    ),
    prevArrow: (
      <div className={classes.customArrow + ' ' + classes.customPrevArrow}>
        <Icon icon={arrowLeftCircle} />
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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
    <div className={classes.singleProduct}>
      <div className={classes.mainImage}>
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${product.name} ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SingleProduct;
