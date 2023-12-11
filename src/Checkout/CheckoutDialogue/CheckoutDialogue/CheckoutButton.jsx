import styles from "./CheckoutButton.module.css";
import {Alert, Snackbar,Button} from "@mui/material";


function CheckoutButton(props){

const buttonClasses = `${styles.CheckoutButton} ${props.isDisabled ? styles.isDisabled : ""}`;

return <div className={styles.CheckoutButtonContainer}>
<button className={buttonClasses} disabled={props.isDisabled} onClick={()=>{props.triggerCheckout()}}>{props.buttonName}
</button>
</div>
};

export default CheckoutButton;