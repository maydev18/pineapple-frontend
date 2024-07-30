import React, { useEffect, useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../Components/CartItem'; // Ensure this path is correct
import { Icon } from '@iconify/react';
import { getAuthToken } from '../utils/Auth';

const Checkout = () => {
    let total = 0;
    const [cartItems , setCartProducts] = useState([]);
    const [savedAddresses , setAddresses] = useState([]);
    const getCartItems = async () => {
        const res = await fetch("http://localhost:8080/cart" , {
        headers : {
            'Authorization' : 'bearer ' + getAuthToken()
        }
        });
        if(!res.ok){
        alert('failed to fetch cart items');
        }
        else{
            setCartProducts(await res.json());
        }
    }
    const getAddresses = async () => {
        const res = await fetch("http://localhost:8080/get-addresses" , {
        headers : {
            'Authorization' : 'bearer ' + getAuthToken()
        }
        });
        if(!res.ok){
        alert('failed to fetch addresses items');
        }
        else{
            const add = await res.json();
            setAddresses(add.addresses);
        }
    }
    useEffect(() => {
        getCartItems();
    } , [])
    useEffect(() => {
        getAddresses();
    } , [])

    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        city: '',
        pinCode: '',
        landmark: '',
    });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress =async () => {
        const data = {
            fullName : newAddress.name,
            firstLine : newAddress.addressLine1,
            secondLine : newAddress.addressLine2,
            state : newAddress.state,
            city : newAddress.city,
            phone : newAddress.phone,
            pincode : newAddress.pinCode,
            landmark : newAddress.landmark
        }
        setNewAddress({
            name: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            city: '',
            pinCode: '',
            landmark: '',
        });
        const res = await fetch("http://localhost:8080/add-address" , {
            method : 'POST',
            headers : {
                'Authorization' : 'bearer ' + getAuthToken() ,
                'Content-type' : 'application/json',
            },
            body : JSON.stringify(data)
        });
        if(!res.ok){
            alert('adding address failed');
        }
        else{
            const add = await res.json();
            setAddresses([...savedAddresses , add]);
        }
        setIsAddingAddress(false);
    };

    const handleEditAddress = () => {
        if (!newAddress.phone || !newAddress.addressLine1 || !newAddress.state || !newAddress.city || !newAddress.pinCode) {
            alert('Please fill in all required fields.');
            return;
        }

        // setSavedAddresses(savedAddresses.map(address =>
        //     address.id === editingAddressId ? { ...newAddress, id: editingAddressId } : address
        // ));
        setNewAddress({
            name: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            city: '',
            pinCode: '',
            landmark: '',
        });
        setIsEditingAddress(false);
        setEditingAddressId(null);
        setIsAddingAddress(false);
    };

    const handleDeleteAddress = (id) => {
        // setSavedAddresses(savedAddresses.filter(address => address.id !== id));
    };

    const handleEditClick = (address) => {
        setNewAddress(address);
        setIsAddingAddress(true);
        setIsEditingAddress(true);
        setEditingAddressId(address.id);
    };
    cartItems.forEach(item => {
        total += item.productID.price * item.quantity;
    })
    return (
        <div className={classes.Checkoutcontainer}>
            <div className={classes.container}>
                <div className={classes.checkoutContent}>
                    <div className={classes.checkoutForm}>
                        {/* <h1>Checkout</h1> */}
                        <div className={classes.delivery}>
                            <h2>Delivery</h2>
                            {savedAddresses.length > 0 ? (
                                <div className={classes.savedAddresses}>
                                    {savedAddresses.map(address => (
                                        <div key={address.addressID._id} className={classes.savedAddress}>
                                            <div>
                                                <p><strong>{address.addressID.fullName}</strong></p>
                                                <p>{address.addressID.firstLine + address.addressID.secondLine}, {address.addressID.state}, {address.addressID.city} - {address.addressID.pincode}</p>
                                                <p>Landmark: {address.addressID.landmark}</p>
                                            </div>
                                            <div className={classes.addressActions}>
                                                <Icon icon="mdi:pencil" className={classes.editIcon} onClick={() => handleEditClick(address)} fontSize={"20px"}/>
                                                <Icon icon="mdi:trash" className={classes.deleteIcon} onClick={() => handleDeleteAddress(address.addressID._id)} fontSize={"20px"}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: "black" }}>No saved addresses. Please add a new address below.</p>
                            )}
                            {isAddingAddress && (
                                <div className={classes.floatingLabel}>
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newAddress.name}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required />
                                    <label htmlFor="phone">phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={newAddress.phone}
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
                                        {isEditingAddress ? (
                                            <button onClick={handleEditAddress} className={classes.addAddressButton}>
                                                Save Changes
                                            </button>
                                        ) : (
                                            <button onClick={handleAddAddress} className={classes.addAddressButton}>
                                                Save Address
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                            {!isAddingAddress && (
                                <div className={classes.ButtonClass}>
                                    <button onClick={() => setIsAddingAddress(true)} className={classes.showAddAddressButton}>
                                       + Add New Address
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* <div className={classes.payment}>
                            <h2>Payment</h2>
                            <p>All transactions are secure and encrypted.</p>
                        </div> */}
                        <button className={`${classes.completeOrder} `}>Proceed to Payment</button>
                    </div>
                </div>
                <div className={classes.cartSummary}>
                    <h2>Cart Summary</h2>
                    <div className={classes.cartItemsContainer}>
                        {cartItems.map((item , index) => (
                            <CartItem
                                key={index}
                                image={item.productID.mainImage}
                                size={item.size}
                                quantity={item.quantity}
                                price={item.productID.price}
                                checkout={true} />
                        ))}
                    </div>
                    <div className={classes.cartSummaryFooter}>
                        <h2>Overall Summary</h2>
                        <div>Total Items: {cartItems.length}</div>
                        <div>Total Price: Rs.{total}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
