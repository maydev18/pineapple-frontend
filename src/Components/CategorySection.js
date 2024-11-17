import React from "react";
import styles from "./CategorySection.module.css";
import pic from '../images/about1.jpeg'

const categories = [
  {
    title: "Men's",
    imageUrl: pic, 
   
  },
  {
    title: "Women's",
    imageUrl: pic, 
    
  },
];

const CategorySection = () => {
  return (
    <section className={styles.categorySection}>
      {categories.map((category, index) => (
        <div key={index} className={styles.categoryCard}>
          
            <img
              src={category.imageUrl}
              alt={category.title}
              className={styles.categoryImage}
            />
            <h3 className={styles.categoryTitle}>{category.title}</h3>
          
        </div>
      ))}
    </section>
  );
};

export default CategorySection;
