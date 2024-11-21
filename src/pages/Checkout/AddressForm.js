import React from 'react';
import { Collapse, Form, Card, Spinner } from 'react-bootstrap';
import classes from './Checkout.module.css';
import { useState, useEffect } from 'react';
import { useError } from '../../context/ErrorContext';
import { Icon } from '@iconify/react';
import editIcon from '@iconify-icons/mdi/pencil';
import deleteIcon from '@iconify-icons/mdi/trash-can';
import { useAuth } from '../../context/AuthContext';
const AddressForm = ({ updateSelectedAddress }) => {
    const { token } = useAuth();
    const [savedAddresses, setAddresses] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
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
        addressID: ''
    });
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const { showError } = useError();

    useEffect(() => {
        const getAddresses = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}get-addresses`, {
                    headers: {
                        'Authorization': 'bearer ' + token
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
            finally {
                setIsLoading(false);
            }
        };
        getAddresses();
    }, [showError, token]);
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
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}add-address`, {
                method: 'POST',
                headers: {
                    'Authorization': 'bearer ' + token,
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
                addressID: ''
            });
            setIsAddOpen(false);
        } catch (err) {
            showError(err.message, 'danger');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleEditAddress = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}edit-address`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
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
                addressID: ''
            });
            setAddresses(savedAddresses.map(address =>
                address._id === updatedAddress._id ? updatedAddress : address
            ));
        } catch (err) {
            showError(err.message, 'danger');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDeleteAddress = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}delete-address`, {
                method: 'delete',
                body: JSON.stringify({ addressID: id }),
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'bearer ' + token
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
        finally {
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
            addressID: address._id
        });
        setIsEditOpen(!isEditOpen);
        updateSelectedAddress(address._id);
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
            addressID: ""
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
                savedAddresses.map((address, index) => (
                    <div key={address._id}>
                        <Card className={classes.savedAddresscard} key={address._id}>
                            <Card.Body>
                                <Form.Check
                                    type='radio'
                                    name='address'
                                    checked={selectedAddress === address._id}
                                    onChange={() => handleAddressesChecked(address._id)}
                                    label={<div className={classes.savedAddresses}>
                                        <div className={classes.savedAddress}>
                                            <div>
                                                <h5>{address.fullName}</h5>
                                                <p style={{ color: 'black', fontSize: '16px', fontWeight: "300" }}>{address.firstLine + " " + address.secondLine}, {address.state}, {address.city} - {address.pincode}</p>
                                                <p style={{ color: 'black', fontSize: '16px', fontWeight: "300" }}>Landmark: {address.landmark}</p>
                                                <p style={{ color: 'black', fontSize: '16px', fontWeight: "300" }}>Phone: {address.phone}</p>
                                                <p style={{ color: 'black', fontSize: '16px', fontWeight: "300" , textTransform: "lowercase" }}>Email: {address.email}</p>
                                            </div>
                                        </div>
                                    </div>} />
                                <Collapse in={selectedAddress === address._id && isEditOpen}>
                                    <div style={{ marginTop: '20px' }}>
                                        <div className={classes.floatingLabel}>
                                            <label htmlFor="name">Full Name <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={addressFields.fullName}
                                                onChange={handleInputChange}
                                                placeholder=" "
                                                required />
                                            <label htmlFor="phone">Phone <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={addressFields.phone}
                                                onChange={handleInputChange}
                                                placeholder=" "
                                                required />
                                            <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={addressFields.email}
                                                onChange={handleInputChange}
                                                placeholder=" "
                                                required />
                                            <label htmlFor="firstLine">Address Line 1 <span style={{ color: 'red' }}>*</span></label>
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
                                            <label htmlFor="state">State <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={addressFields.state}
                                                onChange={handleInputChange}
                                                placeholder=" "
                                                required />
                                            <label htmlFor="city">City <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={addressFields.city}
                                                onChange={handleInputChange}
                                                placeholder=" "
                                                required />
                                            <label htmlFor="pincode">Pin code <span style={{ color: 'red' }}>*</span></label>
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
                                                    <button onClick={handleEditAddress} className={classes.addAddressButton}>
                                                        Save Changes
                                                    </button>}
                                                <button onClick={() => { setIsEditOpen(false); }} className={classes.addAddressButton}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </Card.Body>
                        </Card>
                        <div className={classes.iconButtonsContainer}>
                            <button className={classes.addressbuttons} onClick={() => handleEditClick(address)}>
                                <Icon icon={editIcon} />
                            </button>
                            {isloading ? <Spinner /> :
                                <button className={classes.addressbuttons} onClick={() => handleDeleteAddress(address._id)}>
                                    <Icon icon={deleteIcon} />
                                </button>}
                        </div>


                    </div>
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


                        <label htmlFor="name" >Full Name <span style={{ color: 'red' }}>*</span></label>

                        <input
                            type="text"
                            name="fullName"
                            value={addressFields.fullName}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />


                        <label htmlFor="name" >Phone <span style={{ color: 'red' }}>*</span></label>


                        <input
                            type="text"
                            name="phone"
                            value={addressFields.phone}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />

                        <label htmlFor="name" >Email <span style={{ color: 'red' }}>*</span></label>

                        <input
                            type="text"
                            name="email"
                            value={addressFields.email}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />

                        <label htmlFor="name" >Address Line 1 <span style={{ color: 'red' }}>*</span></label>

                        <input
                            type="text"
                            name="firstLine"
                            value={addressFields.firstLine}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />

                        <label htmlFor="name" >Address Line 2</label>

                        <input
                            type="text"
                            name="secondLine"
                            value={addressFields.secondLine}
                            onChange={handleInputChange}
                            placeholder=" " />

                        <label htmlFor="name" >State <span style={{ color: 'red' }}>*</span></label>

                        <input
                            type="text"
                            name="state"
                            value={addressFields.state}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />

                        <label htmlFor="name" >City <span style={{ color: 'red' }}>*</span></label>

                        <input
                            type="text"
                            name="city"
                            value={addressFields.city}
                            onChange={handleInputChange}
                            placeholder=" "
                            required />
                        <label htmlFor="pincode">Pin code <span style={{ color: 'red' }}>*</span></label>
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