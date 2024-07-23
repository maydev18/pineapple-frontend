import React from 'react';
import '../index.css';
import CartSidebar from './CartSidebar'; 


const Checkout = () => {
    const product = {
        name: 'Fuscia suit',
        mainImage: 'https://via.placeholder.com/150',
        price: 'Free',
    };
    const quantity = 1;
    const selectedSize = 'M';

    return (
        <div className="container">
            <div className="checkout-form">
                <h2>Express Checkout</h2>
                <div className="express-buttons">
                    <button className="shop-pay">Shop Pay</button>
                    <button className="paypal">PayPal</button>
                    <button className="gpay">G Pay</button>
                </div>
                <div className="or">OR</div>
                <div className="contact">
                    <label htmlFor="contact">Contact</label>
                    <input type="email" id="contact" placeholder="Email or mobile phone number" />
                    <input type="checkbox" id="subscribe" />
                    <label htmlFor="subscribe">Email me with news and offers</label>
                </div>
                <div className="delivery">
                    <h3>Delivery</h3>
                    <select id="country">
                        <option value="canada">Canada</option>
                    </select>
                    <div className="name">
                        <input type="text" placeholder="First name (optional)" />
                        <input type="text" placeholder="Last name" />
                    </div>
                    <input type="text" placeholder="Address" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" />
                    <div className="location">
                        <input type="text" placeholder="City" />
                        <select id="province">
                            <option value="alberta">Alberta</option>
                        </select>
                        <input type="text" placeholder="Postal code" />
                    </div>
                </div>
                <div className="shipping-method">
                    <label htmlFor="shipping">Shipping method</label>
                    <input type="text" id="shipping" placeholder="Enter your shipping address to view available shipping methods" />
                </div>
                <div className="payment">
                    <h3>Payment</h3>
                    <p>All transactions are secure and encrypted.</p>
                    <p>Your order is free. No payment is required.</p>
                </div>
                <button className="complete-order">Complete order</button>
            </div>
            <CartSidebar 
                product={product} 
                quantity={quantity} 
                selectedSize={selectedSize} 
                isOpen={true} 
            />
        </div>
    );
};

export default Checkout;
