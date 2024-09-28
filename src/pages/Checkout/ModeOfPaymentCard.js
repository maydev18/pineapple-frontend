import { Card, Form } from 'react-bootstrap';
import classes from './Checkout.module.css';

function ModeOfPaymentCard({updateSelectedPaymentMethod}) {
    return (
        <div>
            <Card className={classes.savedpayment}>
                <Card.Body>
                    <Form.Check
                        type="radio"
                        name="paymentMethod"
                        onChange={() => {updateSelectedPaymentMethod('cod')}}
                        label={
                            <div className={classes.savedAddresses}>
                                <div className={classes.savedAddress}>
                                    <div>
                                        <h5>Cash on Delivery</h5>
                                        <p style={{textTransform: "none", color: "GRAY", padding: 0, fontSize: "15px", fontWeight: '300'}}>*extra fee of ₹100 will be charged</p>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </Card.Body>
            </Card>

            <Card className={classes.savedpayment}>
                <Card.Body>
                    <Form.Check
                        type="radio"
                        name="paymentMethod" 
                        onChange={() => {updateSelectedPaymentMethod('prepaid')}}
                        label={
                            <div className={classes.savedAddresses}>
                                <div className={classes.savedAddress}>
                                    <div>
                                        <h5>UPI</h5>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default ModeOfPaymentCard;
