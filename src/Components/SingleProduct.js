import React from 'react';
import Slider from 'react-slick';
import classes from './SingleProduct.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SingleProduct = ({ images,  title , mainImage , backImage }) => {
  images = [mainImage , ...images , backImage];
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      Next
    </button>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />
  };

  return (
    <div className={classes.singleProduct}>
      <div className={classes.mainImage}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={classes.imageContainer}>
              <img src={image} alt={title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SingleProduct;
