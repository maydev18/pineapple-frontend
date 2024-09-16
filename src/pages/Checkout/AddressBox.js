
import React, { useState, useEffect } from 'react';
import { Card, Form, Collapse } from 'react-bootstrap';
import classes from './Checkout.module.css';
import ModeOfPaymentCard from '../../Components/ModeOfPaymentCard'; 
import { useNavigate } from 'react-router-dom';
import { useError } from '../../context/ErrorContext';
import { useCart } from '../../context/CartContext';
import { getAuthToken } from '../../utils/Auth';
import logo from '../../images/logo_black.png';
import AddressForm from './AddressForm';
const AddressBox = () => {
    const navigate = useNavigate();
    const { showError } = useError();
    const { fetchCart } = useCart();
    const [cartItems, setCartProducts] = useState([]);
    const [savedAddresses, setAddresses] = useState([]);
    const [amount, setAmount] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
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
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getCartItems();
        getAddresses();
    }, []);
    const generateOrderId = async() => {
      const res = await fetch('http://localhost:8080/checkout' , {
          headers : {
              'Authorization' : 'Bearer ' + getAuthToken()
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
    const getCartItems = async () => {
        try {
            const data = await fetchCart();
            setCartProducts(data);
            let total = 0;
            data.forEach(item => {
                total += item.productID.price * item.quantity;
            });
            setAmount(total);
        } catch (err) {
            showError(err.message, 'danger');
        }
    };

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
        } catch (err) {
            showError(err.message, 'danger');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

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
        } catch (err) {
            showError(err.message, 'danger');
        }
    };

    const handleEditAddress = async () => {
        try {
            const data = getAddressData();
            data.addressID = editingAddressID;
            const res = await fetch('http://localhost:8080/edit-address', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + getAuthToken()
                },
                body: JSON.stringify(data)
            });
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
            setIsOpen(false);
            setOpen(false);
        } catch (err) {
            showError(err.message, 'danger');
        }
    };

    const handleEditClick = (address) => {
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
        setIsAddingAddress(true);
        setIsEditingAddress(true);
        setSelectedAddress(address._id);
        setOpen(!open);
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
        } catch (err) {
            showError(err.message, 'danger');
        }
    };

    const handleAddressSelection = (id) => {
        setSelectedAddress(id);
    };

    const getAddressData = () => {
        return {
            fullName: newAddress.fullName,
            firstLine: newAddress.firstLine,
            secondLine: newAddress.secondLine,
            state: newAddress.state,
            city: newAddress.city,
            phone: newAddress.phone,
            pincode: newAddress.pincode,
            landmark: newAddress.landmark,
            email: newAddress.email
        };
    };

    const handleCheckout = async () => {
        try {
            const { amount, id } = await generateOrderId();
            var options = {
                "key": "rzp_test_uY9lNpacaDbu5m",
                "amount": amount,
                "currency": "INR",
                "name": "Pineapple fashion",
                "description": "Test Transaction",
                "image": logo,
                "order_id": id,
                "handler": async function (response) {
                    await createOrder(response);
                    navigate('/orders');
                    showError("Payment done successfully", 'success');
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
    };

    const createOrder = async (data) => {
        const order = {
            orderID: data.razorpay_order_id,
            paymentID: data.razorpay_payment_id,
            signature: data.razorpay_signature,
            addressID: savedAddresses[0].addressID._id,
            method: 'prepaid'
        };
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
    };

    return (
        <div className={classes.checkoutContent}>
            <div className={classes.checkoutForm}>
                <div className={classes.delivery}>
                    <h2 className={classes.delivery}>Delivery</h2>
             
                        <AddressForm
                        savedAddresses={savedAddresses}
                        selectedAddress={selectedAddress}
                        open={open}
                        handleAddressSelection={handleAddressSelection}
                        handleEditClick={handleEditClick}
                        handleDeleteAddress={handleDeleteAddress}
                        handleInputChange={handleInputChange}
                        newAddress={newAddress}
                        handleAddAddress={handleAddAddress}
                        handleEditAddress={handleEditAddress}
                        isEditingAddress={isEditingAddress}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                   
                    />
                    </div>
                    <div className={classes.delivery}>
                    <h2>Mode of Payment</h2>
                    <ModeOfPaymentCard />
                    <button className={classes.completeOrder} onClick={handleCheckout}>Proceed to Payment</button>
                </div>
                </div>

               
            </div>
       
    );
};

export default AddressBox;
