import React, { useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../Components/CartItem'; // Ensure this path is correct
import back from '../images/back.jpg';
import { Icon } from '@iconify/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer'

const Checkout = () => {
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            country: 'India',
            addressLine1: '98, Hauz Khas',
            addressLine2: '',
            state: 'Delhi,',
            city: 'New Delhi,',
            pinCode: '110029,',
            landmark: 'Near Deer Park',
        },
    ]);

    const [newAddress, setNewAddress] = useState({
        country: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        city: '',
        pinCode: '',
        landmark: '',
    });

    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = () => {
        if (!newAddress.country || !newAddress.addressLine1 || !newAddress.state || !newAddress.city || !newAddress.pinCode) {
            alert('Please fill in all required fields.');
            return;
        }

        setSavedAddresses([...savedAddresses, { ...newAddress, id: savedAddresses.length + 1 }]);
        setNewAddress({
            country: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            city: '',
            pinCode: '',
            landmark: '',
        });
        setIsAddingAddress(false);
    };

    const handleDeleteAddress = (id) => {
        setSavedAddresses(savedAddresses.filter(address => address.id !== id));
    };

    const cartItems = [
        {
            id: 1,
            image: back,
            size: 'M',
            quantity: 2,
            price: 'Rs1500',
        },
        {
            id: 2,
            image: back,
            size: 'L',
            quantity: 1,
            price: 'Rs 1200',
        },
    ];

    return (
        <>
            <Header />
            <div className={classes.Checkoutcontainer}>
                <div className={classes.container}>
                    <div className={classes.checkoutContent}>
                        <div className={classes.checkoutForm}>
                            <h2>Checkout</h2>
                            <div className={classes.contact}>
                                <div className={classes.floatingLabel}>
                                    <label htmlFor="contactEmail">Email or mobile phone number</label>
                                    <input type="email" id="contactEmail" placeholder=" " required />
                                </div>
                                <div className={classes.floatingLabel}>
                                    <label htmlFor="contactName">Full Name</label>
                                    <input type="text" id="contactName" placeholder=" " required />
                                </div>
                            </div>
                            <div className={classes.delivery}>
                                <h2>Delivery</h2>
                                {savedAddresses.length > 0 ? (
                                    <div className={classes.savedAddresses}>
                                        {savedAddresses.map(address => (
                                            <div key={address.id} className={classes.savedAddress}>
                                                <Icon icon="mdi:trash" className={classes.deleteIcon} onClick={() => handleDeleteAddress(address.id)} />
                                                <p>{address.country} {address.addressLine1} {address.addressLine2} {address.state} {address.city} {address.pinCode} {address.landmark}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: "black" }}>No saved addresses. Please add a new address below.</p>
                                )}
                                {isAddingAddress && (
                                    <div className={classes.floatingLabel}>
                                        <label htmlFor="country">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={newAddress.country}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="addressLine1">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={newAddress.addressLine1}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="addressLine2">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            value={newAddress.addressLine2}
                                            onChange={handleInputChange}
                                            placeholder=" " />
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={newAddress.state}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={newAddress.city}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="pinCode">Pin code</label>
                                        <input
                                            type="text"
                                            name="pinCode"
                                            value={newAddress.pinCode}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="landmark">Landmark</label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={newAddress.landmark}
                                            onChange={handleInputChange}
                                            placeholder=" " />
                                        <div className={classes.ButtonClass}>
                                            <button onClick={handleAddAddress} className={classes.addAddressButton}>
                                                Add Address
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {!isAddingAddress && (
                                    <div className={classes.ButtonClass}>
                                        <button onClick={() => setIsAddingAddress(true)} className={classes.showAddAddressButton}>
                                            Add New Address
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={classes.payment}>
                                <h2>Payment</h2>
                                <p>All transactions are secure and encrypted.</p>
                            </div>
                            <button className={`${classes.completeOrder} button`}>Complete order</button>
                        </div>
                    </div>
                    <div className={classes.cartSummary}>
                        <h2>Cart Summary</h2>
                        <div className={classes.cartItemsContainer}>
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    image={item.image}
                                    size={item.size}
                                    quantity={item.quantity}
                                    price={item.price} />
                            ))}
                        </div>
                        <div className={classes.cartSummaryFooter}>
                            <h2>Overall Summary</h2>
                            <div>Total Items: {cartItems.length}</div>
                            <div>Total Price: Rs{cartItems.reduce((total, item) => total + parseInt(item.price.replace('Rs', '')), 0)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
