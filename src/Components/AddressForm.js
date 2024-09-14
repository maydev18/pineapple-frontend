import React, { useState } from 'react';
import { Card, Form, Accordion } from 'react-bootstrap';
import classes from '../pages/Checkout.module.css';

const AddressBox = ({ address, onEditClick, onDeleteClick, onSaveChanges, isSelected, onSelect }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedAddress, setEditedAddress] = useState(address);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = () => {
        onSaveChanges(editedAddress);
        setIsEditing(false);
    };

    return (
        <Card className={`${classes.savedAddresscard} ${isSelected ? classes.selected : ''}`}>
            <Card.Body>
                <Form.Check
                    type="radio"
                    name="address"
                    checked={isSelected}
                    onChange={onSelect}
                    label={
                        <div className={classes.savedAddresses}>
                            <div className={classes.savedAddress}>
                                <div>
                                    <h6><strong>{address.fullName}</strong></h6>
                                    <p>{address.firstLine + " " + address.secondLine}, {address.state}, {address.city} - {address.pincode}</p>
                                    <p>Landmark: {address.landmark}</p>
                                    <p>Phone: {address.phone}</p>
                                </div>
                                <hr />
                                <div className={classes.addressActions}>
                                    <div>
                                        <button className={classes.addressbuttons} onClick={() => setIsEditing(!isEditing)}>Edit</button>
                                    </div>
                                    <div>
                                        <button className={classes.addressbuttons} onClick={() => onDeleteClick(address._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
                {isEditing && (
                    <Accordion className={classes.editAccordion} defaultActiveKey="0">
                        <Accordion.Collapse eventKey="0">
                            <div className={classes.floatingLabel}>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={editedAddress.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedAddress.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="firstLine">Address Line 1</label>
                                <input
                                    type="text"
                                    name="firstLine"
                                    value={editedAddress.firstLine}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="secondLine">Address Line 2</label>
                                <input
                                    type="text"
                                    name="secondLine"
                                    value={editedAddress.secondLine}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={editedAddress.state}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={editedAddress.city}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="pincode">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={editedAddress.pincode}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="landmark">Landmark</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={editedAddress.landmark}
                                    onChange={handleInputChange}
                                />
                                <div className={classes.ButtonClass}>
                                    <button onClick={handleSaveChanges} className={classes.addAddressButton}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                )}
            </Card.Body>
        </Card>
    );
};

export default AddressBox;
