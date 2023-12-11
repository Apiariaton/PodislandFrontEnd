import styles from "./PaymentForm.module.css";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const clientSecret = useSelector((state) => state.stripeInfo.clientSecret);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    //Make sure that the path specified corresponds to the correct URL
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://podisland.netlify.app/payment-success/",
      },
    });

    if (result.error) {
      //console.log(result.error.message);
    } else {
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret ? <PaymentElement /> : ""}
      <div className={styles.buttonContainer}>
        <button className={styles.paymentButton} disabled={!stripe}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
