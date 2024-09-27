import React from 'react';
import styles from './PolicyPage.module.css';
import { useError } from '../context/ErrorContext'; 

const ReturnPolicy = () => {
  
  return (
    
    <div className={styles.policyContainer}>
      <h1 className={styles.mainHeading}>Terms and Conditions</h1>
      
      <h2 className={styles.highlightedHeading}>
        PINEAPPLE does not offer a Return Policy
      </h2>
      <p className={styles.policyText}>
      <span className={styles.capitalized}>PINEAPPLE does not offer a Return policy</span> once the product is delivered and opened by the customer.
      </p>
      <p className={styles.policyText}>
        In case a product reflects a <span className={styles.capitalized}>DAMAGE</span> issue, one can raise a replacement request within 4 days of the order delivery. A fresh replacement will be dispatched to the customer. This will be provided post physical examination of the product and if there is no issue found, same unit will be dispatched.
      </p>
      <p className={styles.policyText}>
        If a ticket is raised post 4 days of delivery, product is replaced with an equivalent condition product, post testing.
      </p>
      <p className={styles.policyText}>
        In case of product replacement, if the product is out of stock (color/variant), an alternate product with equivalent price will be offered and will continue as per the previous product purchase date.
      </p>

      <h2 className={styles.highlightedHeading}>
        Damaged product arrived/Wrong product received/Accessories Missing
      </h2>
      <p className={styles.policyText}>
        If your order is <span className={styles.capitalized}>damaged</span>/<span className={styles.capitalized}>wrong</span>/<span className={styles.capitalized}>SIZE</span> issue, please raise a complaint within 24 business hours from the time of delivery.
      </p>
      <p className={styles.policyText}>
        You can email us at pineappleindiaofficial@gmail.com. We will need your order ID and a few images of the product to process the replacement or initiate a refund.
      </p>

      <h2 className={styles.highlightedHeading}>
        Attention regarding wrong product received
      </h2>
      <p className={styles.policyText}>
        If the product is completely different, it will be considered as a wrong product. Under no condition will a refund or replacement be provided for any defect-free product, on the basis of look & feel or minor differences in shades and color.
      </p>

      <p><strong>
      *If the order is processed, cancellation won't be possible and in this case the order must be refused at the doorstep
      </strong></p>
    </div>
  );
};

export default ReturnPolicy;
