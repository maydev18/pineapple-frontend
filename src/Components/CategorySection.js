import React from "react";
import styles from "./CategorySection.module.css";
import pic from "../images/about5.jpg";
import pic2 from "../images/pic2.jpg";
import FadeInComponent from './Fade';
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Men's",
    imageUrl: pic,
    gender:"man"
   
  },
  {
    title: "Women's",
    imageUrl: pic2,
    gender : "woman"
    
  },
];

const CategorySection = () => {
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.headingCategory}>Category</h2>
      <p className={styles.categoryDescription}>
  Discover an exclusive selection of clothing categories tailored to fit every style and occasion. Whether you're looking for casual wear or the latest trends, our collection has something for everyone. 
</p>
    <FadeInComponent>
    <div className={styles.CardsContainer}>
        {categories.map((category, index) => (
          <Link to={`/products/?gender=${category.gender}&page=1`} style={{'textDecoration' : 'none'}} key={index}>
            <div key={index} className={styles.categoryCard}>
              <img
                src={category.imageUrl}
                alt={category.title}
                className={styles.categoryImage}
              />
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              
            </div>
          </Link>
        ))}
      </div>
      </FadeInComponent>
    </section>
  );
};

export default CategorySection;
