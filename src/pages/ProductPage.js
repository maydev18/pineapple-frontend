import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import classes from './ProductPage.module.css';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { useError } from '../context/ErrorContext';
import {Spinner} from 'react-bootstrap';
const ProductPage = () => {
  const {showError} = useError();
  const [currentPage , setCurrentPage] = useState(1);
  const [products , setProducts] = useState([]);
  const [totalPages , setTotalPages] = useState(0);
  const [isLoading , setIsLoading] = useState(false);
  const fetchProducts = async () => {
    try{
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/products?page=' + currentPage);
      if(!response.ok){
        const err = await response.json();
        throw err;
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages)
      setCurrentPage(data.currentPage);
    }
    catch(err){
      showError("Failed to load products, please try again" , 'danger');
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  } , [currentPage]);

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <>
      <div className={classes.banner} />
      {/* <h1 className={classes.mainheading}></h1> */}
      <div className={classes.productsPage}>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <div className={classes.cardContainer}>
            {products.map((product, index) => (
              <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }} key={index}>
                <Card
                  color="black"
                  image={product.mainImage}
                  hoverImage={product.backImage}
                  title={product.title}
                  price={product.price}
                  titleColor="black"
                  priceColor="black"
                />
              </Link>
            ))}
          </div>
        )}
        <div className={classes.paginationContainer}>
          <Pagination>
            <Pagination.Prev 
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} 
              disabled={currentPage === 1} 
            />
            {renderPaginationItems()}
            <Pagination.Next 
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)} 
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
  
};

export default ProductPage;