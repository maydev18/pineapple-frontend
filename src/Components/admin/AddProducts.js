import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Form from 'react-bootstrap/Form';

const AddProducts = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontImage(URL.createObjectURL(file));
    }
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackImage(URL.createObjectURL(file));
    }
  };

  const handleProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div className={styles.alignProducts}>
      <div className={styles.productsBox}>
        <h1 className={styles.heading}>Add Products</h1>
        <Form.Group controlId="productName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" />
        </Form.Group>

        <Form.Group controlId="productSize" className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Select aria-label="Select size">
            <option>Select Size</option>
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
            <option value="extraLarge">XL</option>
            <option value="doubleExtraLarge">XXL</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter product description" />
        </Form.Group>

        <Form.Group controlId="frontImage" className="mb-3">
          <Form.Label>Front Image (choose one file)</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleFrontImageChange} 
          />
        </Form.Group>

        <Form.Group controlId="backImage" className="mb-3">
          <Form.Label>Back Image (choose one file)</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleBackImageChange} 
          />
        </Form.Group>

        <Form.Group controlId="productImages" className="mb-3">
          <Form.Label>Product Images (choose one or more file)</Form.Label>
          <Form.Control 
            type="file" 
            multiple 
            onChange={handleProductImagesChange} 
          />
        </Form.Group>
        
        <div className={styles.imagePreview}>
          {frontImage && (
            <div className={styles.previewContainer}>
              <h6>Front Image</h6>
              <img src={frontImage} alt="Front Preview" className={styles.previewImage} />
            </div>
          )}
          {backImage && (
            <div className={styles.previewContainer}>
              <h6>Back Image</h6>
              <img src={backImage} alt="Back Preview" className={styles.previewImage} />
            </div>
          )}
          {productImages.length > 0 && (
            <div className={styles.previewContainer}>
              <h6>Product Images</h6>
              {productImages.map((image, index) => (
                <img key={index} src={image} alt={`Preview ${index}`} className={styles.previewImage} />
              ))}
            </div>
          )}
        </div>
        
        <button className={styles.btn}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProducts;
