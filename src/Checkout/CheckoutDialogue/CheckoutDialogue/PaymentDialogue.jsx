import styles from "./PaymentDialogue.module.css";
import PaymentForm from "./PaymentForm";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useSelector} from "react-redux";
import {Fragment} from 'react';

const publicStripeKey = import.meta.env.VITE_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(publicStripeKey);

function PaymentDialogue(props){

    const clientSecret = useSelector(state=>state.stripeInfo.clientSecret);
    const isLoggedIn = !(useSelector(state=>state.auth.authToken));

    const options = !clientSecret && isLoggedIn ? "" : {clientSecret: clientSecret};
    const content = !clientSecret && isLoggedIn ? "" : <Elements stripe={stripePromise} options={options}><div className={styles.paymentFormContainer}><div className={styles.title}>Payment</div><p className={styles.infoBox}>Use the dummy card from Stripe below: <br/> <a target="_blank" href="https://stripe.com/docs/testing">Test Cards</a> </p><PaymentForm/></div></Elements>;

    return (<Fragment><div className={styles.dialogueContainer}><div className={styles.dialogue}>{!clientSecret ?  " ": content}</div></div>
    </Fragment>    
    );


};

export default PaymentDialogue;