import React from 'react';
import { Collapse, Form, Card } from 'react-bootstrap';
import EditAddressForm from './EditForm'; // Import the new component
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
        setIsOpen(false);
    };

    const handleCloseEditForm = () => {
        setIsOpen(false);
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
                                                <button onClick={() => handleEditClick(address.addressID)}>Edit</button>
                                                <button onClick={() => handleDeleteAddress(address.addressID._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <Collapse in={selectedAddress === address.addressID._id && open}>
                                <div>
                                    <EditAddressForm
                                        isOpen={selectedAddress === address.addressID._id && open}
                                        setIsOpen={setIsOpen}
                                        newAddress={newAddress}
                                        handleInputChange={handleInputChange}
                                        handleSaveAddress={handleSaveAddress}
                                        handleEditAddress={handleEditAddress}
                                        isEditingAddress={isEditingAddress}
                                    />
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
                    <div>
                        <EditAddressForm
                            isOpen={isOpen}
                            setIsOpen={handleCloseEditForm} 
                            newAddress={newAddress}
                            handleInputChange={handleInputChange}
                            handleSaveAddress={handleSaveAddress}
                            handleEditAddress={handleEditAddress}
                            isEditingAddress={isEditingAddress}
                        />
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default AddressForm;
