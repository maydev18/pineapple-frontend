import classes from './Checkout.module.css';
import ModeOfPaymentCard from './ModeOfPaymentCard';
import AddressForm from './AddressForm';
const AddressBox = ({checkoutDetails , setCheckoutDetails}) => {
    const updateSelectedAddress = (id) => {
        setCheckoutDetails({
            methodOfPayment : checkoutDetails.methodOfPayment,
            addressID : id
        });
    }
    const updateSelectedPaymentMethod = (method) => {
        setCheckoutDetails({
            methodOfPayment : method,
            addressID : checkoutDetails.addressID
        });
    }
    return (
        <div className={classes.checkoutContent}>
            <div className={classes.checkoutForm}>
                <div className={classes.delivery}>
                    <h2 className={classes.delivery}>Delivery</h2>
                    <AddressForm
                        updateSelectedAddress={updateSelectedAddress}
                    />
                </div>
                <div className={classes.delivery}>
                    <h2>Mode of Payment</h2>
                    <ModeOfPaymentCard 
                        updateSelectedPaymentMethod= {updateSelectedPaymentMethod}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressBox;
