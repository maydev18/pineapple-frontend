import React, { useEffect, useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../Components/CartItem';
import { getAuthToken } from '../utils/Auth';
import logo from '../images/logo_black.png';

import { useNavigate } from 'react-router-dom';
import { getsize } from '../utils/cartUtils/convertSize';
import { useError } from '../context/ErrorContext';
import { useCart } from '../context/CartContext';
import AddressBox from '../Components/AddressForm';
import ModeOfPaymentCard from '../Components/ModeOfPaymentCard';
const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartProducts] = useState([]);
    const [savedAddresses, setAddresses] = useState([]);
    const [amount, setAmount] = useState(null);
    const { showError } = useError();
    const { fetchCart } = useCart();
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
    }, [])
    const [newAddress, setNewAddress] = useState({
        fullName: '',
        phone: '',
        firstLine: '',
        secondLine: '',
        state: '',
        city: '',
        pincode: '',
        landmark: '',
        email: ''
    });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddressID, setEditingAddressID] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };
    const getAddressData = () => {
        const data = {
            fullName: newAddress.fullName,
            firstLine: newAddress.firstLine,
            secondLine: newAddress.secondLine,
            state: newAddress.state,
            city: newAddress.city,
            phone: newAddress.phone,
            pincode: newAddress.pincode,
            landmark: newAddress.landmark,
            email: newAddress.email
        }
        return data;
    }
    const handleAddAddress = async () => {
        try {
            const data = getAddressData();
            const res = await fetch("http://localhost:8080/add-address", {
                method: 'POST',
                headers: {
                    'Authorization': 'bearer ' + getAuthToken(),
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            const add = await res.json();
            setAddresses([...savedAddresses, { addressID: add }]);
            setIsAddingAddress(false);
            setNewAddress({
                fullName: '',
                phone: '',
                firstLine: '',
                secondLine: '',
                state: '',
                city: '',
                pincode: '',
                landmark: '',
                email: ''
            });
        }
        catch (err) {
            showError(err.message, 'danger');
        }
    };
    const handleEditAddress = async () => {
        try {
            const data = getAddressData();
            data.addressID = editingAddressID;
            console.log(data);
            const res = await fetch('http://localhost:8080/edit-address', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + getAuthToken()
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            setNewAddress({
                fullName: '',
                phone: '',
                firstLine: '',
                secondLine: '',
                state: '',
                city: '',
                pincode: '',
                landmark: '',
                email: ''
            });
            const add = await res.json();
            setAddresses(savedAddresses.map(address =>
                address.addressID._id === editingAddressID ? { addressID: add } : address
            ));
            setIsEditingAddress(false);
        }
        catch (err) {
            showError(err.message, 'danger');
        }
    };
    const handleEditClick = async (address) => {
        setNewAddress({
            fullName: address.fullName,
            phone: address.phone,
            firstLine: address.firstLine,
            secondLine: address.secondLine,
            pincode: address.pincode,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            email: address.email
        });
        setEditingAddressID(address._id);
        setIsEditingAddress(true);
    };
    const handleDeleteAddress = async (id) => {
        try {
            const res = await fetch('http://localhost:8080/delete-address', {
                method: 'delete',
                body: JSON.stringify({ addressID: id }),
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'bearer ' + getAuthToken()
                }
            });
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            setAddresses(savedAddresses.filter(address => address.addressID._id !== id));
        }
        catch (err) {
            showError(err.message, 'danger');
        }

    };
    const generateOrderId = async () => {
        const res = await fetch('http://localhost:8080/checkout', {
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
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
        try {
            const { amount, id } = await generateOrderId();
            var options = {
                "key": "rzp_test_uY9lNpacaDbu5m", // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Pineapple fashion",
                "description": "Test Transaction",
                "image": logo,
                "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": async function (response) {
                    try {
                        await createOrder(response);
                        navigate('/orders');
                        showError("Payment done successfully", 'success');
                    }
                    catch (err) {
                        showError("Failed to create an order, please contact us in case of any discrepancy", 'danger');
                    }
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
        }
        catch (err) {
            showError(err.message, 'danger');
        }

    }
    const createOrder = async (data) => {
        const order = {
            orderID: data.razorpay_order_id,
            paymentID: data.razorpay_payment_id,
            signature: data.razorpay_signature,
            addressID: savedAddresses[0].addressID._id,
            method: 'prepaid'
        }
        const res = await fetch('http://localhost:8080/create-order', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'bearer ' + getAuthToken()
            },
            body: JSON.stringify(order)
        });
        if (!res.ok) {
            const err = await res.json();
            throw err;
        }
        fetchCart();
    }
    return (
        <><div className={classes.Checkoutcontainer}>
            <div className={classes.container}>
                <div className={classes.checkoutContent}>
                    <div className={classes.checkoutForm}>
                        {/* <h1>Checkout</h1> */}
                        <div className={classes.delivery}>
                            <h2 className=''>Delivery</h2>
                            {savedAddresses.length > 0 ? (
                                savedAddresses.map(address => (
                                    <AddressBox
                                        key={address.addressID._id}
                                        address={address.addressID}
                                        onEditClick={handleEditClick}
                                        onDeleteClick={handleDeleteAddress}
                                        onSaveChanges={handleEditAddress}
                                    // isSelected={selectedAddressId === address._id}
                                    // onSelect={() => setSelectedAddressId(address._id)}

                                    />
                                ))
                            ) : (
                                <p style={{ color: "black" }}>No saved addresses. Please add a new address below.</p>
                            )}
                            {(isAddingAddress || isEditingAddress) && (
                                <div className={classes.floatingLabel}>
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={newAddress.fullName}
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
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={newAddress.email}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required />
                                    <label htmlFor="firstLine">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="firstLine"
                                        value={newAddress.firstLine}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required />
                                    <label htmlFor="secondLine">Address Line 2</label>
                                    <input
                                        type="text"
                                        name="secondLine"
                                        value={newAddress.secondLine}
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
                                    <label htmlFor="pincode">Pin code</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={newAddress.pincode}
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
                        <div className={classes.delivery}>
                            <h2 className={classes.delivery}>Mode of Payment</h2>
                            <ModeOfPaymentCard

                            />
                        </div>
                        <button className={`${classes.completeOrder} `} onClick={handleCheckout}>Proceed to Payment</button>

                    </div>


                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                            <h2 style={{ paddingTop: "1rem" }}>Overall Summary</h2>
                            <div style={{ padding: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <strong>Total Items: </strong>
                                    <div>{cartItems.length}</div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: '12px' }}>
                                    <div><strong>Total Price: </strong></div>
                                    <div> ₹
                                        {amount}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default Checkout;
