import React, { useContext } from 'react';

import CartSidebar from '../Components/CartSidebar';
import './Checkout.css';

const Checkout = () => {
  
    return (
        <div className="container">
            <div className="checkout-content">
                <div className="checkout-form">
                    <h2>Checkout</h2>
                    <div className="contact">
                        <div className="floating-label">
                            <input type="email" id="contact-email" placeholder=" " />
                            <label htmlFor="contact-email">Email or mobile phone number</label>
                        </div>
                        <div className="floating-label">
                            <input type="text" id="contact-name" placeholder=" " />
                            <label htmlFor="contact-name">Full Name</label>
                        </div>
                    </div>
                    <div className="delivery">
                        <h2>Delivery</h2>
                        <div className="floating-label">
                            <input type="text" id="country" placeholder=" " />
                            <label htmlFor="country">Country</label>
                        </div>
                        <div className="floating-label">
                            <input type="text" id="address-line1" placeholder=" " />
                            <label htmlFor="address-line1">First Line</label>
                        </div>
                        <div className="floating-label">
                            <input type="text" id="address-line2" placeholder=" " />
                            <label htmlFor="address-line2">Second Line</label>
                        </div>
                        <div className="location">
                            <div className="floating-label">
                                <input type="text" id="state" placeholder=" " />
                                <label htmlFor="state">State</label>
                            </div>
                            <div className="floating-label">
                                <input type="text" id="city" placeholder=" " />
                                <label htmlFor="city">City</label>
                            </div>
                            <div className="floating-label">
                                <input type="text" id="pin-code" placeholder=" " />
                                <label htmlFor="pin-code">Pin code</label>
                            </div>
                        </div>
                    </div>
                    <div className="shipping-method">
                        <div className="floating-label">
                            <input type="text" id="shipping" placeholder=" " />
                            <label htmlFor="shipping">Landmark</label>
                        </div>
                    </div>
                    <div className="payment">
                        <h2>Payment</h2>
                        <p>All transactions are secure and encrypted.</p>
                    </div>
                    <button className="complete-order">Complete order</button>
                </div>
                
            </div>
        </div>
    );
};

export default Checkout;
