import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Form from 'react-bootstrap/Form';
import SizeQuantityInput from './SizeInput';
import { getAuthToken } from '../../utils/Auth';
import { Spinner } from 'react-bootstrap';
import { getFullSize } from '../../utils/cartUtils/convertSize';
import { useError } from '../../context/ErrorContext';
const AddProducts = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fit: '',
    size: '',
    washCare: '',
    specifications: '',
    price : ''
  });
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [quantities, setQuantities] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });
  const {showError} = useError();
  const [isSubmitting , setSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontImage(file);
    }
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackImage(file);
    }
  };

  const handleProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };
  const handleQuantityChange = (size, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [size]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    try{
      const submissionData = new FormData();
      for(const key in formData){
        submissionData.append(key , formData[key])
      }
      let images = [frontImage , backImage , ...productImages];
      images.forEach((image, index) => {
        if (image) { 
          submissionData.append('productImages', image); 
        }
      });
      for(let size in quantities){
        submissionData.append(getFullSize(size) , quantities[size]);
      }
      const response = await fetch(process.env.REACT_APP_BASE_URL + 'admin/add-product', {
        method: 'PUT',
        body: submissionData,
        headers: {
            'Authorization': 'Bearer '  + getAuthToken()
        }
      });
      if(!response.ok){
        const err = await response.json();
        throw err;
      }
      setFormData({
        title: '',
        description: '',
        fit: '',
        size: '',
        washCare: '',
        specifications: '',
        price : ''
      })
      setBackImage(null);
      setFrontImage(null);
      setProductImages([]);
      setQuantities({
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      });
      showError("Product Added Successfully" , "success");
    }
    catch(err){
      showError(err.message , 'danger');
    }
    finally{
      setSubmitting(false);
    }
  };
  return (
    <div className={styles.alignProducts}>
      <div className={styles.productsBox}>
        <h1 className={styles.heading}>Add Products</h1>
        <Form.Group controlId="productName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter product name"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="productPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='Number'
            name="price"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <SizeQuantityInput sizes={Object.keys(quantities)} values = {Object.values(quantities)} onQuantityChange={handleQuantityChange} />

        <Form.Group controlId="productFit" className="mb-3">
          <Form.Label>Fit</Form.Label>
          <Form.Control
            as="textarea"
            name="fit"
            rows={2}
            placeholder="Oversized fit"
            value={formData.fit}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productSize" className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Control
            as="textarea"
            name="size"
            rows={2}
            placeholder="Model is wearing L size"
            value={formData.size}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productWashCare" className="mb-3">
          <Form.Label>Wash Care</Form.Label>
          <Form.Control
            as="textarea"
            name="washCare"
            rows={2}
            placeholder="Machine wash"
            value={formData.washCare}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productSpecifications" className="mb-3">
          <Form.Label>Specifications</Form.Label>
          <Form.Control
            as="textarea"
            name="specifications"
            rows={2}
            placeholder="Casual wear, college wear, street wear, gym wear, graphic print"
            value={formData.specifications}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="frontImage" className="mb-3">
          <Form.Label>Front Image (choose one file)</Form.Label>
          <Form.Control
            type="file"
            name="frontImage"
            onChange={handleFrontImageChange}
          />
        </Form.Group>

        <Form.Group controlId="backImage" className="mb-3">
          <Form.Label>Back Image (choose one file)</Form.Label>
          <Form.Control
            type="file"
            name="backImage"
            onChange={handleBackImageChange}
          />
        </Form.Group>

        <Form.Group controlId="productImages" className="mb-3">
          <Form.Label>Product Images (choose one or more files)</Form.Label>
          <Form.Control
            type="file"
            name="moreImages"
            multiple
            onChange={handleProductImagesChange}
          />
        </Form.Group>

        <div className={styles.imagePreview}>
          {frontImage && (
            <div className={styles.previewContainer}>
              <h6>Front Image</h6>
              <img src={URL.createObjectURL(frontImage)} alt="Front Preview" className={styles.previewImage} />
            </div>
          )}
          {backImage && (
            <div className={styles.previewContainer}>
              <h6>Back Image</h6>
              <img src={URL.createObjectURL(backImage)} alt="Back Preview" className={styles.previewImage} />
            </div>
          )}
          {productImages.length > 0 && (
            <div className={styles.previewContainer}>
              <h6>Product Images</h6>
              {productImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className={styles.previewImage} />
              ))}
            </div>
          )}
        </div>

        <button className={styles.btn} onClick={handleSubmit} disabled={isSubmitting}> {isSubmitting ? <Spinner animation="border" /> : "Add Product"}</button>
      </div>
    </div>
  );
};

export default AddProducts;
