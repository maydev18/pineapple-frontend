import React, { useEffect, useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../Components/CartItem'; 
import { Icon } from '@iconify/react';
import { getAuthToken } from '../utils/Auth';
import { add } from 'date-fns';
import logo from '../images/logo_black.png';
import { Form, Card, Collapse } from 'react-bootstrap'; // Added Collapse from Bootstrap
import { redirect, useNavigate } from 'react-router-dom';
import { getsize } from '../utils/cartUtils/convertSize';
import ModeOfPaymentCard from '../Components/ModeOfPaymentCard';
import { useError } from '../context/ErrorContext';
import { useCart } from '../context/CartContext';
const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartProducts] = useState([]);
    const [savedAddresses, setAddresses] = useState([]);
    const [amount, setAmount] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null); 
    const {showError} = useError();
    const {fetchCart} = useCart();
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddressID, setEditingAddressID] = useState(null);
    const [open, setOpen] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        _id: '',
        fullName: '',
        phone: '',
        firstLine: '',
        secondLine: '',
        state: '',
        city: '',
        pincode: '',
        landmark: ''
    });
    

    useEffect(() => {
        getCartItems();
        getAddresses();
    }, []);


    const getCartItems = async () => {
        try{
            const res = await fetch("http://localhost:8080/cart" , {
                headers : {
                    'Authorization' : 'bearer ' + getAuthToken()
                }
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const data = await res.json();
            setCartProducts(data);
            let total = 0
            data.forEach(item => {
                total += item.productID.price * item.quantity;
            })
            setAmount(total);
        }
        catch(err){
            showError(err.message , 'danger');
        }
    }

    const getAddresses = async () => {
        try{
            const res = await fetch("http://localhost:8080/get-addresses" , {
                headers : {
                    'Authorization' : 'bearer ' + getAuthToken()
                }
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const add = await res.json();
            setAddresses(add.addresses);
        }
        catch(err){
            showError(err.message , 'danger');
        }
    }
    useEffect(() => {
        getCartItems();
        getAddresses();
    } , [])
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress =async () => {
        try{
            const data = getAddressData();
            const res = await fetch("http://localhost:8080/add-address" , {
                method : 'POST',
                headers : {
                    'Authorization' : 'bearer ' + getAuthToken() ,
                    'Content-type' : 'application/json',
                },
                body : JSON.stringify(data)
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const add = await res.json();
            setAddresses([...savedAddresses , {addressID : add}]);
            setIsAddingAddress(false);
            setNewAddress({
                _id: '',
                fullName: '',
                phone: '',
                firstLine: '',
                secondLine: '',
                state: '',
                city: '',
                pincode: '',
                landmark: '',
            });
            setIsOpen(false);
        }       
        catch(err){
            showError(err.message , 'danger');
        }

    };
    const getAddressData = () => {
        const data = {
            id: newAddress._id,
            fullName : newAddress.fullName,
            firstLine : newAddress.firstLine,
            secondLine : newAddress.secondLine,
            state : newAddress.state,
            city : newAddress.city,
            phone : newAddress.phone,
            pincode : newAddress.pincode,
            landmark : newAddress.landmark
        }
        return data;
    }
    const handleEditAddress = async () => {
        try{
            const data = getAddressData();
            data.addressID = editingAddressID;
            const res = await fetch('http://localhost:8080/edit-address' , {
                method : "POST",
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + getAuthToken()
                },
                body : JSON.stringify(data)
            })
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            setNewAddress({
                _id: '',
                fullName: '',
                phone: '',
                firstLine: '',
                secondLine: '',
                state: '',
                city: '',
                pincode: '',
                landmark: '',
            });
            const add = await res.json();
            setAddresses(savedAddresses.map(address =>
                address.addressID._id === editingAddressID ? { addressID : add } : address
            ));
            setIsEditingAddress(false);
        }
        catch(err){
            showError(err.message , 'danger');
        }      
    };
    const handleEditClick = async (address,id) => {
        setNewAddress({
            _id: address._id,
            fullName : address.fullName,
            phone : address.phone,
            firstLine : address.firstLine,
            secondLine : address.secondLine,
            pincode : address.pincode,
            landmark : address.landmark,
            city : address.city,
            state : address.state
        });
        setEditingAddressID(address._id);
        setIsAddingAddress(true);
        setIsEditingAddress(true);
        setSelectedAddress(address._id); 
        setOpen(!open); 
        setEditingAddressID((prevId) => (prevId === id ? null : id)); 
    };

  const handleDeleteAddress = async(id) => {
        try{
            const res = await fetch('http://localhost:8080/delete-address' , {
                method : 'delete',
                body : JSON.stringify({addressID : id}),
                headers : {
                    'Content-type' : 'application/json',
                    'authorization' : 'bearer ' + getAuthToken()
                }
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            setAddresses(savedAddresses.filter(address => address.addressID._id !== id));
        }
        catch(err){
            showError(err.message , 'danger');
        }
        
    };
    const handleAddressSelection = (id) => {
        setSelectedAddress(id); 
    };
    
    const generateOrderId = async() => {
        const res = await fetch('http://localhost:8080/checkout' , {
            headers : {
                'Authorization' : 'Bearer ' + getAuthToken()
            }
        })
        if(!res.ok){
            const err = await res.json();
            throw err;
        }
        const data = await res.json();
        return {
            amount : data.amount,
            id : data.id
        }
    }
    const handleCheckout = async () => {
        try{
            const {amount , id} = await generateOrderId();
            var options = {
                "key": "rzp_test_uY9lNpacaDbu5m", 
                "amount": amount,
                "currency": "INR",
                "name": "Pineapple fashion",
                "description": "Test Transaction",
                "image": logo,
                "order_id": id, 
                "handler":async function (response){
                    await createOrder(response)
                    navigate('/orders');
                    showError("Payment done successfully" , 'success');
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
            rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        }
        catch(err){
            showError(err.message , 'danger');
        }

    }
    const createOrder = async (data) => {
        const order = {
            orderID : data.razorpay_order_id,
            paymentID : data.razorpay_payment_id,
            signature : data.razorpay_signature,
            addressID : savedAddresses[0].addressID._id
        }
        const res = await fetch('http://localhost:8080/create-order' , {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : 'bearer ' + getAuthToken()
            },
            body : JSON.stringify(order)
        });
        if(!res.ok){
            const err = await res.json();
            throw err;
        }
        fetchCart();
    }


    const handleCloseForm = () => {
        setIsOpen(false);
    };
    return (
        <div className={classes.Checkoutcontainer}>
            <div className={classes.container}>
                <div className={classes.checkoutContent}>
                    <div className={classes.checkoutForm}>
                    <div className={classes.delivery}>
            <h2 className={classes.delivery}>Delivery</h2>
            {savedAddresses.length > 0 ? (
                savedAddresses.map((address) => (
                    <Card className={classes.savedAddresscard} key={address.addressID._id}>
                        <Card.Body>
                            <Form.Check
                                type='radio'
                                name='address'
                                checked={selectedAddress === address.addressID._id}
                                onChange={() => handleAddressSelection(address.addressID._id)}
                                label={
                                    <div className={classes.savedAddresses}>
                                        <div className={classes.savedAddress}>
                                            <div>
                                                {/* <p>{address.addressID._id}</p> */}
                                                <h6><strong>{address.addressID.fullName}</strong></h6>
                                                <p>{address.addressID.firstLine + " " + address.addressID.secondLine}, {address.addressID.state}, {address.addressID.city} - {address.addressID.pincode}</p>
                                                <p>Landmark: {address.addressID.landmark}</p>
                                                <p>Phone: {address.addressID.phone}</p>
                                            </div>
                                            <hr />
                                            <div className={classes.addressActions}>
                                                <button className={classes.addressbuttons} onClick={() => handleEditClick(address.addressID)}>Edit</button>
                                                <button className={classes.addressbuttons} onClick={() => handleDeleteAddress(address.addressID._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                           
                            <Collapse in={selectedAddress === address.addressID._id && open}>
                                <div>
                                    <div className={classes.floatingLabel}>
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={newAddress.fullName}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={newAddress.phone}
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
                                                <><button onClick={handleAddAddress} className={classes.addAddressButton}>
                                                        Save Address
                                                    </button>
                                                   </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <div className={classes.noAddresses}>
                    <p>No saved addresses found.</p>
                </div>
            )}
            <div className={classes.ButtonClass}>
            {!isOpen && (
                <button
                    className={classes.addAddressButton}
                    onClick={() => setIsOpen(true)}
                >
                    + Add New Address
                </button>
            )}
            <Collapse in={isOpen}>
                <div className={classes.floatingLabel}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={newAddress.fullName}
                        onChange={handleInputChange}
                        placeholder=" "
                        required />
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={newAddress.phone}
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
                        <button
                            onClick={handleAddAddress}
                            className={classes.addAddressButton}
                        >
                            Save Address
                        </button>
                        <button
                            className={classes.addAddressButton}
                            onClick={handleCloseForm}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Collapse>
        </div>
        </div>


                        <div className={classes.delivery}>
                            <h2>Mode of Payment</h2>
                            <ModeOfPaymentCard/>
                            <button className={`${classes.completeOrder} `} onClick={handleCheckout}>Proceed to Payment</button>
                        </div>
                        
                       
                    </div>
                </div>
                
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
