import styles from "./SignUpButton.module.css";
import {Alert, Snackbar,Button} from "@mui/material";


function SignUpButton(props){

const buttonClasses = `${styles.signUpButton} ${props.isDisabled ? styles.isDisabled : ""}`;

return <div className={styles.signUpButtonContainer}>
<button className={buttonClasses} disabled={props.isDisabled} onClick={()=>{props.triggerSignUp()}}>{props.buttonName}
</button>
</div>
};

export default SignUpButton;