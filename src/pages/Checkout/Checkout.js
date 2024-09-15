import React, { useEffect, useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../../Components/CartItem'; 
import { getAuthToken } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';
import { getsize } from '../../utils/cartUtils/convertSize';
import { useError } from '../../context/ErrorContext';
import { useCart } from '../../context/CartContext';
import AddressBox from './AddressBox';
const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartProducts] = useState([]);
    const [savedAddresses, setAddresses] = useState([]);
    const [amount, setAmount] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null); 
    const {showError} = useError();
    const {fetchCart} = useCart();

    const [isAddingAddress, setIsAddingAddress] = useState(false);
    useEffect(() => {
        getCartItems();
        getAddresses();
    }, []);
    const getCartItems = async () => {
        try {
            const data = await fetchCart();
            setCartProducts(data);
            let total = 0
            data.forEach(item => {
                total += item.productID.price * item.quantity;
            })
            setAmount(total);
        }
        catch (err) {
            showError(err.message, 'danger');
        }
    }

    const getAddresses = async () => {
        try {
            const res = await fetch("http://localhost:8080/get-addresses", {
                headers: {
                    'Authorization': 'bearer ' + getAuthToken()
                }
            });
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            const add = await res.json();
            setAddresses(add.addresses);
        }
        catch (err) {
            showError(err.message, 'danger');
        }
    }
    useEffect(() => {
        getCartItems();
        getAddresses();
    } , [])
   
    return (
        <div className={classes.Checkoutcontainer}>
            <div className={classes.container}>
                
                <AddressBox/>
                
                <div className={classes.cartSummary}>
                    <h2>Cart Summary</h2>
                    <div className={classes.cartItemsContainer}>
                        {cartItems.map((item, index) => (
                            <CartItem
                                key={index}
                                image={item.productID.mainImage}
                                size={getsize(item.size)}
                                title={item.productID.title}
                                quantity={item.quantity}
                                price={item.productID.price}
                                checkout={true} />
                        ))}
                    </div>
                    <div className={classes.cartSummaryFooter}>
                        <h2 style={{paddingTop: "1rem"}}>Overall Summary</h2>
                        <div style={{padding: "12px"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                        <strong>Total Items: </strong>
                            <div>{cartItems.length}</div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", paddingTop: '12px'}}>
                            <div><strong>Total Price: </strong></div>
                            <div> ₹
                            {amount}</div>
                </div>
             
                     </div>
            </div>
                </div>

                        
            </div>
            </div>
    );
};

export default Checkout;