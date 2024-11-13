import styles from '../Dashboard.module.css';
import { Form, Modal } from 'react-bootstrap';
import { useState , useEffect } from 'react';
import { getsize } from '../../../utils/cartUtils/convertSize';
import { useError } from '../../../context/ErrorContext';
import { useAuth } from '../../../context/AuthContext';
import {Spinner} from 'react-bootstrap';
function EditProductModal({ selectedProduct, show, handleClose , fetchProducts}) {
    const [isSubmitting , setIsSubmitting] = useState(false);
    const [error , setError] = useState("");
    const {showError} = useError();
    const {isLoggedIn , token} = useAuth();
    const [product , setProduct] = useState({
        productId :"",
        title : "",
        description : "",
        price : "",
        washCare : "",
        fit : "",
        size : "",
        specifications : "",
        small : 0,
        medium : 0,
        large : 0,
        extraLarge : 0,
        doubleExtraLarge : 0
    })
    useEffect(() => {
        if (selectedProduct) {
            setProduct({
                productId : selectedProduct._id,
                title: selectedProduct.title || '',
                description: selectedProduct.description || '',
                price: selectedProduct.price || '',
                washCare: selectedProduct.washCare || '',
                fit: selectedProduct.fit || '',
                size: selectedProduct.size || '',
                specifications: selectedProduct.specifications || '',
                small : selectedProduct.small || 0,
                medium : selectedProduct.medium || 0,
                large : selectedProduct.large || 0,
                extraLarge : selectedProduct.extraLarge || 0,
                doubleExtraLarge : selectedProduct.doubleExtraLarge || 0
            });
        }
    }, [selectedProduct]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const submitHandler =async (e) => {
        e.preventDefault();
        try{
            setIsSubmitting(true);
            console.log(product);
            const res = await fetch(process.env.REACT_APP_BASE_URL + "admin/edit-product" , {
                headers : {
                    'Content-type' : "application/json",
                    'authorization' : 'bearer ' + token
                },
                body : JSON.stringify(product),
                method : 'post'
            })
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            handleClose();
            setError("");
            setProduct({});
            showError("Product Updated successfully" , 'success');
            fetchProducts();
        }
        catch(err){ 
            setError(err.message);
        }
        finally{
            setIsSubmitting(false);
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product Details</Modal.Title>
            </Modal.Header>
            <p style={{'color' : "red"}}>{error}</p>
            <Form className={styles.form}>
                <Form.Group className="mt-3">
                    <Form.Label><h3>Current Stock</h3></Form.Label>
                    <div className={styles.sizeControl}>
                        {['small', 'medium', 'large', 'extraLarge', 'doubleExtraLarge'].map(size => (
                            <div key={size} className={styles.sizeWrapper}>
                                <Form.Label><h6>{getsize(size)}</h6></Form.Label>
                                <div className={styles.quantityControl}>
                                    <Form.Control
                                        type="text"
                                        value={product[size] || 0}
                                        className={styles.quantityInput}
                                        onChange={handleChange}
                                        name = {size}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Form.Group>
                <Form.Group controlId="productTitle" className="mb-3">
                    <Form.Label><h3>Title</h3></Form.Label>
                    <Form.Control
                        as="textarea"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        rows={3}
                    />
                </Form.Group>
                <Form.Group controlId="productDescription" className="mb-3">
                    <Form.Label><h3>Description</h3></Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={5}
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="productPrice" className="mb-3">
                    <Form.Label><h3>Price</h3></Form.Label>
                    <Form.Control
                        type='text'
                        name="price"
                        placeholder="Enter product price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </Form.Group>


                <Form.Group controlId="productFit" className="mb-3">
                    <Form.Label><h3>Fit</h3></Form.Label>
                    <Form.Control
                        as="textarea"
                        name="fit"
                        rows={2}
                        placeholder="Oversized fit"
                        value={product.fit}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="productSize" className="mb-3">
                    <Form.Label><h3>Size</h3></Form.Label>
                    <Form.Control
                        as="textarea"
                        name="size"
                        rows={2}
                        placeholder="Model is wearing L size"
                        value={product.size}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="productWashCare" className="mb-3">
                    <Form.Label><h3>Wash Care</h3></Form.Label>
                    <Form.Control
                        as="textarea"
                        name="washCare"
                        rows={2}
                        placeholder="Machine wash"
                        value={product.washCare}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="productSpecifications" className="mb-3">
                    <Form.Label><h3>Specifications</h3></Form.Label>
                    <Form.Control
                        as="textarea"
                        name="specifications"
                        rows={2}
                        placeholder="Casual wear, college wear, street wear, gym wear, graphic print"
                        value={product.specifications}
                        onChange={handleChange}
                    />
                </Form.Group>
                {isSubmitting ? <Spinner /> :  <button className={styles.btn} onClick={submitHandler}>
                    Save Changes
                </button>}
               
            </Form>
        </Modal>
    );
};
export default EditProductModal;