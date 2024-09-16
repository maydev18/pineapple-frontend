import React from 'react';
import { Collapse, Form, Card } from 'react-bootstrap';
import classes from './Checkout.module.css';
import { useState , useEffect } from 'react';
import { useError } from '../../context/ErrorContext';
import { getAuthToken } from '../../utils/Auth';
const AddressForm = ({updateSelectedAddress}) => {
    const [savedAddresses, setAddresses] = useState([]);
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
    const [isOpen, setIsOpen] = useState(false);
    const {showError} = useError();

    useEffect(() => {
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
            setAddresses([...savedAddresses, { addressID: add }]);
            setAddressFields({
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
            setIsOpen(false);
        } catch (err) {
            showError(err.message, 'danger');
        }
    };
    const handleEditAddress = async () => {
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
            const add = await res.json();
            setAddresses(savedAddresses.map(address =>
                address.addressID._id === addressFields.addressID ? { addressID: add } : address
            ));
            setIsOpen(false);
        } catch (err) {
            showError(err.message, 'danger');
        }
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
        setIsOpen(!isOpen);
    }
    const handleAddressesChecked = (id) => {
        updateSelectedAddress(id);
        setSelectedAddress(id);
    }
    return (
        <div>
            {savedAddresses.length > 0 ? (
                savedAddresses.map((address) => (
                    <Card className={classes.savedAddresscard} key={address.addressID._id}>
                        <Card.Body>
                            <Form.Check
                                type='radio'
                                name='address'
                                checked={selectedAddress === address.addressID._id}
                                onChange={() => handleAddressesChecked(address.addressID._id)}
                                label={
                                    <div className={classes.savedAddresses}>
                                        <div className={classes.savedAddress}>
                                            <div>
                                                <h6><strong>{address.addressID.fullName}</strong></h6>
                                                <p>{address.addressID.firstLine + " " + address.addressID.secondLine}, {address.addressID.state}, {address.addressID.city} - {address.addressID.pincode}</p>
                                                <p>Landmark: {address.addressID.landmark}</p>
                                                <p>Phone: {address.addressID.phone}</p>
                                                <p>Email: {address.addressID.email}</p>
                                            </div>
                                            <hr />
                                            <div className={classes.addressActions}>
                                                <button className={classes.addressbuttons}  onClick={() => handleEditClick(address.addressID)}>Edit</button>
                                                <button className={classes.addressbuttons}  onClick={() => handleDeleteAddress(address.addressID._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <Collapse in={selectedAddress === address.addressID._id && isOpen}>
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
                                            <button onClick={handleEditAddress} className={classes.addAddressButton}>
                                                Save Changes
                                            </button>
                                            <button onClick={() => {setIsOpen(false)}} className={classes.addAddressButton}>
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
                            <button
                                onClick={handleAddAddress}
                                className={classes.addAddressButton}
                            >
                                Save Address
                            </button>
                            <button
                                className={classes.addAddressButton}
                                onClick={() => setIsOpen(false)}
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
