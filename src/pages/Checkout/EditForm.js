import React from 'react';
import { Collapse } from 'react-bootstrap';
import classes from './Checkout.module.css';

const EditAddressForm = ({
    isOpen,
    setIsOpen,
    newAddress,
    handleInputChange,
    handleSaveAddress,
    handleEditAddress,
    isEditingAddress
}) => {
    const handleClose = () => {
        console.log("Close button clicked"); // Debug log
        setIsOpen(false);
        
    };

    return (
        <Collapse in={isOpen}>
            <div className={classes.floatingLabel}>
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={newAddress.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="firstLine">Address Line 1</label>
                <input
                    type="text"
                    name="firstLine"
                    value={newAddress.firstLine}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="secondLine">Address Line 2</label>
                <input
                    type="text"
                    name="secondLine"
                    value={newAddress.secondLine}
                    onChange={handleInputChange}
                    placeholder=" "
                />
                <label htmlFor="state">State</label>
                <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="pincode">Pin code</label>
                <input
                    type="text"
                    name="pincode"
                    value={newAddress.pincode}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                />
                <label htmlFor="landmark">Landmark</label>
                <input
                    type="text"
                    name="landmark"
                    value={newAddress.landmark}
                    onChange={handleInputChange}
                    placeholder=" "
                />
                <div className={classes.ButtonClass}>
                    {isEditingAddress ? (
                        <button onClick={handleEditAddress} className={classes.addAddressButton}>
                            Save Changes
                        </button>
                    ) : (
                        <button onClick={handleSaveAddress} className={classes.addAddressButton}>
                            Save Address
                        </button>
                    )}
                    <button
                        className={classes.addAddressButton}
                        onClick={handleClose} // Ensure this function is correctly passed
                    >
                        Close
                    </button>
                </div>
            </div>
        </Collapse>
    );
};

export default EditAddressForm;
