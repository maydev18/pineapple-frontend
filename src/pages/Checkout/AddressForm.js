import React from 'react';
import { Collapse, Form, Button, Card } from 'react-bootstrap';
import classes from './Checkout.module.css';

const AddressForm = ({
    isOpen,
    setIsOpen,
    newAddress,
    handleInputChange,
    handleAddAddress,
    handleEditAddress,
    isEditingAddress,
    handleEditClick,
    handleDeleteAddress,
    handleAddressSelection,
    selectedAddress,
    open,
    savedAddresses
}) => {
    const handleSaveAddress = () => {
        handleAddAddress();
        setIsOpen(false);  // Collapse the form after saving the address
    };

    

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
                                onChange={() => handleAddressSelection(address.addressID._id)}
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
                                                <button  onClick={() => handleEditClick(address.addressID)}>Edit</button>
                                                <button  onClick={() => handleDeleteAddress(address.addressID._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <Collapse in={selectedAddress === address.addressID._id && open}>
                                <div>
                                    <div className={classes.floatingLabel}>
                                        {/* Address form fields */}
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
                                                <button onClick={handleSaveAddress} className={classes.addAddressButton}>
                                                    Save Address
                                                </button>
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
                            <button
                                onClick={handleSaveAddress}
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
