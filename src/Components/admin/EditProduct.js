import React, { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import styles from './Dashboard.module.css';

const initialProducts = [
  {
    id: 1,
    name: 'white tshirt',
    size: 'M',
    description: 'Description of Product 1',
    color: 'Red',
  },
  {
    id: 2,
    name: 'yellow tshirt',
    size: 'L',
    description: 'Description of Product 2',
    color: 'Blue',
  },
  {
    id: 3,
    name: 'white tshirt',
    size: 'M',
    description: 'Description of Product 1',
    color: 'Red',
  },
  {
    id: 4,
    name: 'yellow tshirt',
    size: 'L',
    description: 'Description of Product 2',
    color: 'Blue',
  },
];

const EditProduct = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    description: '',
    color: ''
  });

  const handleCheckboxChange = (product) => {
    setSelectedProduct(product.id);
    setFormData({
      name: product.name,
      size: product.size,
      description: product.description,
      color: product.color
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct
        ? { ...product, ...formData }
        : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Product</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <Card key={product.id} className={`${styles.productCard} ${selectedProduct === product.id ? styles.selected : ''}`}>
            <Card.Body>
              <Form.Check
                type="radio"
                label={
                  <div className={styles.ProductInfo}>
                    <h4>{product.name}</h4>
                    <p>Size: {product.size}</p>
                    <p>Description: {product.description}</p>
                    <p>Color: {product.color}</p>
                  </div>
                }
                name="productSelect"
                checked={selectedProduct === product.id}
                onChange={() => handleCheckboxChange(product)}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      <Form className={styles.form} onSubmit={handleSaveChanges}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Select
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          >
            <option>Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </Form.Group>
        <button className={styles.btn}>
          Save Changes
        </button>
      </Form>
    </div>
  );
};

export default EditProduct;
