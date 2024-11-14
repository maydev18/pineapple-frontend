import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Card from '../Components/Card';
import classes from './ProductPage.module.css';
import { Pagination, Spinner } from 'react-bootstrap';
import { useError } from '../context/ErrorContext';
import { getFullSize } from '../utils/cartUtils/convertSize';

const Product = () => {
  const { showError } = useError();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}products?page=${currentPage}`);
      if (!response.ok) {
        const err = await response.json();
        throw err;
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      showError("Failed to load products, please try again", 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setSearchParams({page : currentPage});
  }, [currentPage]);

  useEffect(() => {
    if (products.length) {
      const scrollPosition = sessionStorage.getItem('scroll');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scroll');
      }
    }
  }, [products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  const saveScrollPosition = () => {
    sessionStorage.setItem("scroll" , window.scrollY);
  }

  return (
    <>
      <div className={classes.banner} />
      <div className={classes.productsPage}>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner animation="border" />
          </div>
        ) : (
          <div className={classes.cardContainer}>
            {products.map((product, index) => {
              const allSizesOutOfStock = sizes.every(size => product[getFullSize(size)] === 0);
              return (
                <Link to={`/products/${product.title.replace(/ /g, "-")}`} style={{ textDecoration: "none" }} key={index} onClick={saveScrollPosition}>
                  <Card
                    color="black"
                    image={product.mainImage}
                    hoverImage={product.backImage}
                    title={product.title}
                    price={product.price}
                    titleColor="black"
                    priceColor="black"
                    allSizesOutOfStock={allSizesOutOfStock}
                  />
                </Link>
              );
            })}
          </div>
        )}
        <div className={classes.paginationContainer}>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Product;