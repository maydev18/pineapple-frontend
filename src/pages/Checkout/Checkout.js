import React, {useEffect, useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../../Components/CartItem';
import { useNavigate } from 'react-router-dom';
import { getsize } from '../../utils/cartUtils/convertSize';
import { useError } from '../../context/ErrorContext';
import { useCart } from '../../context/CartContext';
import AddressBox from './AddressBox';
import logo from '../../images/logo_black.png';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
const Checkout = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [checkoutDetails , setCheckoutDetails] = useState({
        methodOfPayment : null,
        addressID : null
    })
    const { showError } = useError();
    const {total , quantity , discount , cart , fetchCart} = useCart();
    useEffect(() => {
        if(total === 0) navigate('/products');
    } , [total])
    const[isloading , setIsLoading] = useState(false);
    const generateOrderId = async() => {
        const res = await fetch('http://localhost:8080/checkout' , {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        })
        if (!res.ok) {
            const err = await res.json();
            throw err;
        }
        const data = await res.json();
        return {
            amount: data.amount,
            id: data.id
        }
    }
    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const { amount, id } = await generateOrderId();
            var options = {
                "key": "rzp_test_uY9lNpacaDbu5m",
                "amount": amount,
                "currency": "INR",
                "name": "Pineapple fashion",
                "description": "Online payment of thepineapple.in",
                "image": logo,
                "order_id": id,
                "handler": async function (response) {
                    createOrder(response);
                },
                "prefill": {
                    "name": "Mayank Sharma",
                    "email": "ms772254@gmail.com",
                    "contact": "8750355389"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                showError("Payment Failed, Incase any amount is deducted it will be refunded soon", 'danger');
            });
            rzp1.open();
        } catch (err) {
            showError(err.message, 'danger');
        }
        finally{
            setIsLoading(false);
        }
    };

    const createOrder = async (data ) => {
        setIsLoading(true);
        try{
            const order = {
                orderID: data.razorpay_order_id,
                paymentID: data.razorpay_payment_id,
                signature: data.razorpay_signature,
                addressID: checkoutDetails.addressID,
                method: checkoutDetails.methodOfPayment
            };
            const res = await fetch('http://localhost:8080/create-order', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                body: JSON.stringify(order)
            });
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            setIsLoading(false);
            navigate('/orders');
            showError("Order successful", 'success');
            fetchCart();
        }
        catch(err){
            showError(err.message , 'danger');
        }
        finally{
            setIsLoading(false);
        }
    };
    return (
        <div className={classes.Checkoutcontainer}>
            <div className={classes.container}>
                <AddressBox 
                    checkoutDetails={checkoutDetails}
                    setCheckoutDetails={setCheckoutDetails}
                />
                <div className={classes.cartSummary}>
                    <h2>Cart Summary</h2>
                    <div className={classes.cartItemsContainer}>
                        {cart.map((item, index) => (
                            <CartItem
                                key={index}
                                image={item.productID.mainImage}
                                size={getsize(item.size)}
                                title={item.productID.title}
                                quantity={item.quantity}
                                price={item.productID.price}
                                checkout={true} 
                            />
                        ))}
                    </div>
                    <div className={classes.cartSummaryFooter}>
                        <h2 style={{ paddingTop: "1rem" }}>Overall Summary</h2>
                        <div style={{ padding: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong>Total Items: </strong>
                                <div>{quantity}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong>Total Discount: </strong>
                                <div>{discount}</div>
                            </div>
                            {checkoutDetails.methodOfPayment && 
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong>Shipping Charges: </strong>
                                <div>₹ {checkoutDetails.methodOfPayment === 'cod' ? 100 : 0}</div>
                            </div>}
                            
                            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: '12px' }}>
                                <div><strong>Total Price: </strong></div>
                                <div> ₹
                                    {checkoutDetails.methodOfPayment === 'cod' ? (total + 100) : total}</div>
                            </div>
                        </div>
                    </div>
                    {/* if the address or method of payment is null */}
                    {(!checkoutDetails.methodOfPayment || !checkoutDetails.addressID) ? (
                        <p style={{color: 'grey', fontSize: '16px', marginTop: '12px'}}>*please select delivery address and mode of payment to confirm your order</p>
                    ) : (
                        isloading ? (
                            <Spinner />
                        ) : (
                            <button className={classes.completeOrder} onClick={checkoutDetails.methodOfPayment === 'prepaid' ? handleCheckout : () => {createOrder({})}}>{checkoutDetails.methodOfPayment === 'cod' ? "Confirm your order" : "Proceed to Payment"}</button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
export default Checkout;