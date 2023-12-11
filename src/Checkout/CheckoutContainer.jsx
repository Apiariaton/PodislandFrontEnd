import styles from "./CheckoutContainer.module.css";
import Checkout from "./CheckoutDialogue/CheckoutDialogue/Checkout";

function CheckoutContainer(props){
return <div className={styles.checkout}><Checkout></Checkout></div>;
};

export default CheckoutContainer;