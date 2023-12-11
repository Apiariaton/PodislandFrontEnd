import styles from "./CheckoutTitle.module.css";

function CheckoutTitle(props){
    return <h className={styles.CheckoutTitle}>{props.title}</h>
    };
    
export default CheckoutTitle;