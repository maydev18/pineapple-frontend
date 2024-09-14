import React from 'react';
import classes from './DisabledButton.module.css'; // Using CSS modules

const DisabledButton = ({ label }) => {
    return (
        <button className={classes.disabledButton} disabled>
            {label || 'Out of Stock'}
        </button>
    );
};

export default DisabledButton;
