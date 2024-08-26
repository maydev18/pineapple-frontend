import React, { useEffect, useState } from 'react';
import { Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import ToggleButton from './ToggleButton';
import { getAuthToken } from '../../utils/Auth';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const handleShow = (product) => {
    setSelectedProduct(product); 
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null); 
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/products' , {
        method : 'get',
        headers : {
          'authorization' : 'bearer ' + getAuthToken()
        },
      });
      const prod = await res.json();
      setProducts(prod);
      setFilter(prod);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter(product => {
      const query = search.toLowerCase();
      return product._id.toLowerCase().match(query) ||
        product.title.toLowerCase().match(query);
    });
    setFilter(result);
  }, [search, products]);

  const handleQuantityChange = (size, action) => {
    if (selectedProduct) {
      const updatedProduct = { ...selectedProduct };
      updatedProduct[size] = action === 'increment' ? updatedProduct[size] + 1 : updatedProduct[size] - 1;
      if (updatedProduct[size] < 0) updatedProduct[size] = 0; // Prevent negative quantities
      setSelectedProduct(updatedProduct);
    }
  };

  return (
    <>
      <div className={styles.alignProducts}>
        <div className={styles.OrdersBox}>
          <h1 className={styles.heading}>Inventory</h1>
          <div className={styles.container}>
            <div className="container mt-4">
              <div className="d-flex justify-content-end">
                <input type="text"
                  className="form-control mb-5 mt-0"
                  placeholder="search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            {filter.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Product ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>XXL</th>
                    <th>Visibility</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody className={styles.table}>
                  {filter.map((product, index) => (
                    <tr key={index}>
                      <td><Link to={'/products/' + product._id}><img src={product.mainImage} alt={product.title} style={{ width: "8rem", height: "auto", borderRadius: '10px' }} /></Link></td>
                      <td>{product._id}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.small}</td>
                      <td>{product.medium}</td>
                      <td>{product.large}</td>
                      <td>{product.extraLarge}</td>
                      <td>{product.doubleExtraLarge}</td>
                      <td>
                        <ToggleButton
                          visible = {product.visible}
                          id = {product._id}
                        />
                      </td>
                      <td><p onClick={() => handleShow(product)}>Edit</p></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h1>No products to show</h1>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Details</Modal.Title>
        </Modal.Header>
        <Form className={styles.form}>
          <Form.Group className="mt-3 mb-3">
           <h3>Product Name</h3>
            <Form.Control
              type="text"
              name="name"
              value={selectedProduct?.title || ''} 
              onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })} 
            />
          </Form.Group>

         
          <Form.Group className="mt-3">
            <h3>Sizes</h3>
            <div className={styles.sizeControl}>
              {['small', 'medium', 'large', 'extraLarge', 'doubleExtraLarge'].map(size => (
                <div key={size} className={styles.sizeWrapper}>
                  <Form.Label>{size}</Form.Label>
                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(size, 'decrement')}
                      className={styles.quantityBtn}
                    >
                      -
                    </button>
                    <Form.Control
                      type="text"
                      value={selectedProduct?.[size] || 0} 
                      readOnly
                      className={styles.quantityInput}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(size, 'increment')}
                      className={styles.quantityBtn}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Form.Group>

      
          <button className={styles.btn}>
            Save Changes
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
