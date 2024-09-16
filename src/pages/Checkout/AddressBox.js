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
                    <ModeOfPaymentCard />
                </div>
            </div>
        </div>
    );
};

export default AddressBox;
