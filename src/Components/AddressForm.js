import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import classes from '../pages/Checkout.module.css'; // Adjust import path as needed

const AddressFormAccordion = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = () => {
        // Add address logic here
        setIsOpen(false);
    };

    const handleCloseForm = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {!isOpen && (
                <button
                    className={classes.addAddressButton}
                    onClick={() => setIsOpen(true)}
                >
                    Add New Address
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
    );
};

export default AddressFormAccordion;
