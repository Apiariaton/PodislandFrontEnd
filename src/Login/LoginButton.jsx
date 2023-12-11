import styles from "./LoginButton.module.css";
import {Alert, Snackbar,Button} from "@mui/material";


function LoginButton(props){

const buttonClasses = `${styles.LoginButton} ${props.isDisabled ? styles.isDisabled : ""}`;

return <div className={styles.LoginButtonContainer}>
<button className={buttonClasses} disabled={props.isDisabled} onClick={()=>{props.triggerLogin()}}>{props.buttonName}
</button>
</div>
};

export default LoginButton;