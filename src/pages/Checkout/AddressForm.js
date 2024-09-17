import React from 'react';
import { Collapse, Form, Card, Spinner } from 'react-bootstrap';
import classes from './Checkout.module.css';
import { useState , useEffect } from 'react';
import { useError } from '../../context/ErrorContext';
import { getAuthToken } from '../../utils/Auth';
const AddressForm = ({updateSelectedAddress}) => {
    const [savedAddresses, setAddresses] = useState([]);
    const [isloading , setIsLoading] = useState(false);
    const [selectedAddress , setSelectedAddress] = useState(null);
    const [addressFields, setAddressFields] = useState({
        fullName: '',
        phone: '',
        email: '',
        firstLine: '',
        secondLine: '',
        state: '',
        city: '',
        pincode: '',
        landmark: '',
        addressID : ''
    });
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const {showError} = useError();

    useEffect(() => {
        const getAddresses = async () => {
            setIsLoading(true);
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
                setAddresses(add);
            } catch (err) {
                showError(err.message, 'danger');
            }
            finally{
                setIsLoading(false);
            }
        };
        getAddresses();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressFields((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };
    const handleAddAddress = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8080/add-address", {
                method: 'POST',
                headers: {
                    'Authorization': 'bearer ' + getAuthToken(),
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(addressFields)
            });
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            const add = await res.json();
            setAddresses([...savedAddresses, add]);
            setAddressFields({
                fullName: '',
                phone: '',
                firstLine: '',
                secondLine: '',
                state: '',
                city: '',
                pincode: '',
                landmark: '',
                email: '',
                addressID : ''
            });
            setIsAddOpen(false);
        } catch (err) {
            showError(err.message, 'danger');
        }
        finally{
            setIsLoading(false);
        }
    };
    const handleEditAddress = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:8080/edit-address', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + getAuthToken()
                },
                body: JSON.stringify(addressFields)
            });
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            const updatedAddress = await res.json();
            setIsEditOpen(false);
            setAddressFields({
                fullName: '',
                phone: '',
                firstLine: '',
                secondLine: '',
                state: '',
                city: '',
                pincode: '',
                landmark: '',
                email: '',
                addressID : ''
            });
            setAddresses(savedAddresses.map(address =>
                address._id === updatedAddress._id ? updatedAddress : address
            ));
        } catch (err) {
            showError(err.message, 'danger');
        }
        finally{
            setIsLoading(false);
        }
    };
    const handleDeleteAddress = async (id) => {
        setIsLoading(true);
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
            setAddresses(savedAddresses.filter(address => address._id !== id));
        } catch (err) {
            showError("Failed to delete the address", 'danger');
        }
        finally{
            setIsLoading(false);
        }
    };
    const handleEditClick = (address) => {
        setAddressFields({
            fullName: address.fullName,
            firstLine: address.firstLine,
            secondLine: address.secondLine,
            state: address.state,
            city: address.city,
            phone: address.phone,
            pincode: address.pincode,
            landmark: address.landmark,
            email: address.email,
            addressID : address._id
        });
        setIsEditOpen(!isEditOpen);
        setIsAddOpen(false);
        setSelectedAddress(address._id);
    }
    const handleAddClick = () => {
        setAddressFields({
            fullName: "",
            firstLine: "",
            secondLine: "",
            state: "",
            city: "",
            phone: "",
            pincode: "",
            landmark: "",
            email: "",
            addressID : ""
        });
        setIsAddOpen(true);
        setIsEditOpen(false);
    }
    const handleAddressesChecked = (id) => {
        updateSelectedAddress(id);
        setSelectedAddress(id);
    }
    return (
        <div>
            {savedAddresses.length > 0 ? (
                savedAddresses.map((address , index) => (
                    <Card className={classes.savedAddresscard} key={index}>
                        <Card.Body>
                            <Form.Check
                                type='radio'
                                name='address'
                                checked={selectedAddress === address._id}
                                onChange={() => handleAddressesChecked(address._id)}
                                label={
                                    <div className={classes.savedAddresses}>
                                        <div className={classes.savedAddress}>
                                            <div>
                                                <h6><strong>{address.fullName}</strong></h6>
                                                <p>{address.firstLine + " " + address.secondLine}, {address.state}, {address.city} - {address.pincode}</p>
                                                <p>Landmark: {address.landmark}</p>
                                                <p>Phone: {address.phone}</p>
                                                <p>Email: {address.email}</p>
                                            </div>
                                            <hr />
                                            <div className={classes.addressActions}>
                                                <button className={classes.addressbuttons}  onClick={() => handleEditClick(address)}>Edit</button>
                                                {isloading ? <Spinner /> : <button className={classes.addressbuttons}  onClick={() => handleDeleteAddress(address._id)}>Delete</button>}
                                                
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <Collapse in={selectedAddress === address._id && isEditOpen}>
                                <div>
                                    <div className={classes.floatingLabel}>
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={addressFields.fullName}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={addressFields.phone}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                         <label htmlFor="email">Email</label> 
                                        <input
                                            type="text"
                                            name="email"
                                            value={addressFields.email}  
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="firstLine">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="firstLine"
                                            value={addressFields.firstLine}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="secondLine">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="secondLine"
                                            value={addressFields.secondLine}
                                            onChange={handleInputChange}
                                            placeholder=" " />
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={addressFields.state}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={addressFields.city}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="pincode">Pin code</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={addressFields.pincode}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            required />
                                        <label htmlFor="landmark">Landmark</label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={addressFields.landmark}
                                            onChange={handleInputChange}
                                            placeholder=" " />
                                        <div className={classes.ButtonClass}>
                                            {isloading ? <Spinner/> :
                                            <button onClick={handleEditAddress} className={classes.addAddressButton}>
                                                Save Changes
                                            </button>}
                                            <button onClick={() => {setIsEditOpen(false)}} className={classes.addAddressButton}>
                                                Cancel
                                            </button>
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
                {!isAddOpen && (
                    <button
                        className={classes.addAddressButton}
                        onClick={handleAddClick}
                    >
                        + Add New Address
                    </button>
                )}
                <Collapse in={isAddOpen}>
                    <div className={classes.floatingLabel}>
                        
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={addressFields.fullName}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={addressFields.phone}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={addressFields.email}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="firstLine">Address Line 1</label>
                        <input
                            type="text"
                            name="firstLine"
                            value={addressFields.firstLine}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="secondLine">Address Line 2</label>
                        <input
                            type="text"
                            name="secondLine"
                            value={addressFields.secondLine}
                            onChange={handleInputChange}
                            placeholder=" " />
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            name="state"
                            value={addressFields.state}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            value={addressFields.city}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="pincode">Pin code</label>
                        <input
                            type="text"
                            name="pincode"
                            value={addressFields.pincode}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="landmark">Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            value={addressFields.landmark}
                            onChange={handleInputChange}
                            placeholder=" " />
                        <div className={classes.ButtonClass}>
                            {isloading ? <Spinner /> :  
                            <button
                                onClick={handleAddAddress}
                                className={classes.addAddressButton}> Save Address </button>
                            }
                            <button
                                className={classes.addAddressButton}
                                onClick={() => setIsAddOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default AddressForm;
