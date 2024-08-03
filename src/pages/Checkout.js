import React, { useEffect, useState } from 'react';
import classes from './Checkout.module.css';
import CartItem from '../Components/CartItem'; // Ensure this path is correct
import { Icon } from '@iconify/react';
import { getAuthToken } from '../utils/Auth';
import { add } from 'date-fns';
import logo from '../images/logo_black.png';
import { redirect } from 'react-router-dom';
function getsize(size){
    if(size === 'small') return 'S';
    if(size === 'medium') return 'M';
    if(size === 'large') return 'L';
    if(size === 'extraLarge') return 'XL';
    if(size === 'doubleExtraLarge') return 'XXL';
}
const Checkout = () => {
    const [cartItems , setCartProducts] = useState([]);
    const [savedAddresses , setAddresses] = useState([]);
    const [amount , setAmount] = useState(null);

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
            const data = await res.json();
            setCartProducts(data);
            let total = 0
            data.forEach(item => {
                total += item.productID.price * item.quantity;
            })
            setAmount(total);
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
        getAddresses();
    } , [])
    const [newAddress, setNewAddress] = useState({
        fullName: '',
        phone: '',
        firstLine: '',
        secondLine: '',
        state: '',
        city: '',
        pincode: '',
        landmark: ''
    });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddressID , setEditingAddressID] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };
    const getAddressData = () => {
        const data = {
            fullName : newAddress.fullName,
            firstLine : newAddress.firstLine,
            secondLine : newAddress.secondLine,
            state : newAddress.state,
            city : newAddress.city,
            phone : newAddress.phone,
            pincode : newAddress.pincode,
            landmark : newAddress.landmark
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
        });
        return data;
    }
    const handleAddAddress =async () => {
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
            alert('adding address failed');
        }
        else{
            const add = await res.json();
            setAddresses([...savedAddresses , {addressID : add}]);
        }
        setIsAddingAddress(false);
    };

    const handleEditAddress = async () => {
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
            alert("failed editing address");
        }
        else{
            setNewAddress({
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
        }
        setIsEditingAddress(false);
        setIsAddingAddress(false);
    };
    const handleEditClick = async (address) => {
        setNewAddress({
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
    };

    const handleDeleteAddress = async(id) => {
        // setSavedAddresses(savedAddresses.filter(address => address.id !== id));
        const res = await fetch('http://localhost:8080/delete-address' , {
            method : 'delete',
            body : JSON.stringify({addressID : id}),
            headers : {
                'Content-type' : 'application/json',
                'authorization' : 'bearer ' + getAuthToken()
            }
        });
        if(!res.ok){
            alert('failed to delete address');
        }
        else{
            getAddresses();
        }
    };
    const generateOrderId = async() => {
        const res = await fetch('http://localhost:8080/checkout' , {
            headers : {
                'Authorization' : 'Bearer ' + getAuthToken()
            }
        })
        if(!res.ok){
            alert('payment failed');
        }
        else{
            const data = await res.json();
            return {
                amount : data.amount,
                id : data.id
            }
        }
    }
    const handleCheckout = async () => {
        const {amount , id} = await generateOrderId();
        console.log(amount , id);
        var options = {
            "key": "rzp_test_uY9lNpacaDbu5m", // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Pineapple fashion",
            "description": "Test Transaction",
            "image": logo,
            "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                createOrder(response)
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
            alert("Payment failed");
        }
        else{
            const resdata = await res.json();
            console.log(resdata)
            return redirect('/orders');
        }
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
                                <div className={classes.savedAddresses}>
                                    {savedAddresses.map(address => (
                                        <div key={address.addressID._id} className={classes.savedAddress}>
                                            <div>
                                                <p><strong>{address.addressID.fullName}</strong></p>
                                                <p>{address.addressID.firstLine + " " + address.addressID.secondLine}, {address.addressID.state}, {address.addressID.city} - {address.addressID.pincode}</p>
                                                <p>Landmark: {address.addressID.landmark}</p>
                                                <p>Phone: {address.addressID.phone}</p>
                                            </div>
                                            <div className={classes.addressActions}>
                                                <Icon icon="mdi:pencil" className={classes.editIcon} onClick={() => handleEditClick(address.addressID)} fontSize={"20px"}/>
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
                        {/* <div className={classes.payment}>
                            <h2>Payment</h2>
                            <p>All transactions are secure and encrypted.</p>
                        </div> */}
                        <button className={`${classes.completeOrder} `} onClick={handleCheckout}>Proceed to Payment</button>
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
                                quantity={item.quantity}
                                price={item.productID.price}
                                checkout={true} />
                        ))}
                    </div>
                </div>

            </div>

        </div><div className={classes.cartSummaryFooter}>
                <h2>Overall Summary</h2>
                <div><strong>Total Items : </strong> {cartItems.length}</div>
                <div><strong>Total Price: </strong> Rs.{amount}</div>
            </div></>
    );
};
export default Checkout;
