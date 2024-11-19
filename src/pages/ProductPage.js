import React, { useEffect, useState } from 'react';
import { useSearchParams, Link , useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import classes from './ProductPage.module.css';
import { Pagination, Spinner } from 'react-bootstrap';
import { useError } from '../context/ErrorContext';
import { getFullSize } from '../utils/cartUtils/convertSize';

const Product = () => {
  const { showError } = useError();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // Get initial query parameters
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialGender = searchParams.get('gender') || "null";

  const [query, setQuery] = useState({
    currentPage: initialPage,
    gender: initialGender,
  });

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Fetch products based on query
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}products?page=${query.currentPage}&gender=${query.gender}`
      );
      if (!response.ok) {
        const err = await response.json();
        throw err;
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      showError('Failed to load products, please try again', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  // Synchronize query state with URL parameters
  useEffect(() => {
    navigate(`?page=${query.currentPage}${query.gender !== "null" ? `&gender=${query.gender}` : ''}`, { replace: true });
    fetchProducts();
  }, [query, navigate]);

  // Handle page change
  const handlePageChange = (page) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      currentPage: page,
    }));
  };

  // Save scroll position before navigating to a product page
  const saveScrollPosition = () => {
    sessionStorage.setItem('scroll', window.scrollY);
  };

  // Restore scroll position after fetching products
  useEffect(() => {
    if (products.length) {
      const scrollPosition = sessionStorage.getItem('scroll') || 0;
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.setItem('scroll' , 0);
    }
  }, [products]);
  const handlePageUpdateChange = (number) => {
    sessionStorage.setItem('scroll' , 0);
    if(number !== query.currentPage){
      handlePageChange(number)
    }
  }
  const handlePageIncrement = () => {
    sessionStorage.setItem('scroll' , 0);
    handlePageChange(query.currentPage < totalPages ? query.currentPage + 1 : totalPages);
  }
  const handlePageDecrement = () => {
    sessionStorage.setItem('scroll' , 0);
    handlePageChange(query.currentPage > 1 ? query.currentPage - 1 : 1);
  }
  // Render pagination items
  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === query.currentPage}
          onClick={() => handlePageUpdateChange(number)}
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
      <div className={classes.productsPage}>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner animation="border" />
          </div>
        ) : (
          <div className={classes.cardContainer}>
            {products.map((product, index) => {
              const allSizesOutOfStock = sizes.every((size) => product[getFullSize(size)] === 0);
              return (
                <Link
                  to={`/products/${product.title.replace(/ /g, '-')}`}
                  style={{ textDecoration: 'none' }}
                  key={index}
                  onClick={saveScrollPosition}
                >
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
              onClick={handlePageDecrement}
              disabled={query.currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={handlePageIncrement}
              disabled={query.currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Product;
