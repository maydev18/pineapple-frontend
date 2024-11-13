import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import ToggleButton from './ToggleButton';
import { useError } from '../../context/ErrorContext';
import { useAuth } from '../../context/AuthContext';
import EditProductModal from './adminComponents/EditProductModal';
const Inventory = () => {
  const [products, setProducts] = useState([]);
  const {isLoggedIn , token} = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const {showError} = useError();
  const [product , setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => { 
      setShowModal(false);
  };
  const fetchProducts = async () => {
    try{
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/products' , {
        method : 'get',
        headers : {
          'authorization' : 'bearer ' + token
        },
      });
      if(!res.ok){
        const err = await res.json();
        throw err;
      }
      const prod = await res.json();
      setProducts(prod);
      setProduct(products[0]);
      setFilter(prod);
    }
    catch(err){
      showError("Cannot fetch the Inventory, please try again" , 'danger');
    }
  };
  useEffect(() => {
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
                    <th>Top Product</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody className={styles.table}>
                  {filter.map((product, index) => (
                    <tr key={index}>
                      <td><Link to={'/admin/product/' + product._id +'/' + token}><img src={product.mainImage} alt={product.title} style={{ width: "8rem", height: "auto", borderRadius: '10px' }} /></Link></td>
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
                          on = {product.visible}
                          id = {product._id}
                          top={false}
                        />
                      </td>
                      <td>
                        <ToggleButton
                          on = {product.top}
                          id = {product._id}
                          top={true}
                        />
                      </td>
                      <td><p onClick={() => {setProduct(product); setShowModal(true);}}>Edit</p></td>
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
      <EditProductModal
        selectedProduct={product}
        show = {showModal}
        handleClose={handleClose}
        fetchProducts = {fetchProducts}
      />
    </>
  );
};

export default Inventory;
