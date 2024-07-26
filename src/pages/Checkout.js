import React from 'react';
import classes from './Checkout.module.css';

const Checkout = () => {
  
    return (
        <div className={classes.container}>
            <div className={classes.checkoutContent}>
                <div className={classes.checkoutForm}>
                    <h2>Checkout</h2>
                    <div className={classes.contact}>
                        <div className={classes.floatingLabel}>
                            <input type="email" id="contactEmail" placeholder=" " />
                            <label htmlFor="contactEmail">Email or mobile phone number</label>
                        </div>
                        <div className={classes.floatingLabel}>
                            <input type="text" id="contactName" placeholder=" " />
                            <label htmlFor="contactName">Full Name</label>
                        </div>
                    </div>
                    <div className={classes.delivery}>
                        <h2>Delivery</h2>
                        <div className={classes.floatingLabel}>
                            <input type="text" id="country" placeholder=" " />
                            <label htmlFor="country">Country</label>
                        </div>
                        <div className={classes.floatingLabel}>
                            <input type="text" id="addressLine1" placeholder=" " />
                            <label htmlFor="addressLine1">First Line</label>
                        </div>
                        <div className={classes.floatingLabel}>
                            <input type="text" id="addressLine2" placeholder=" " />
                            <label htmlFor="addressLine2">Second Line</label>
                        </div>
                        <div className={classes.location}>
                            <div className={classes.floatingLabel}>
                                <input type="text" id="state" placeholder=" " />
                                <label htmlFor="state">State</label>
                            </div>
                            <div className={classes.floatingLabel}>
                                <input type="text" id="city" placeholder=" " />
                                <label htmlFor="city">City</label>
                            </div>
                            <div className={classes.floatingLabel}>
                                <input type="text" id="pinCode" placeholder=" " />
                                <label htmlFor="pinCode">Pin code</label>
                            </div>
                        </div>
                    </div>
                    <div className={classes.shippingMethod}>
                        <div className={classes.floatingLabel}>
                            <input type="text" id="shipping" placeholder=" " />
                            <label htmlFor="shipping">Landmark</label>
                        </div>
                    </div>
                    <div className={classes.payment}>
                        <h2>Payment</h2>
                        <p>All transactions are secure and encrypted.</p>
                    </div>
                    <button className={`${classes.completeOrder} button`}>Complete order</button>
                </div>
                
            </div>
        </div>
    );
};

export default Checkout;
