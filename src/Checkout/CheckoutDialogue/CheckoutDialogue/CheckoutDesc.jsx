import styles from "./CheckoutDesc.module.css";


function CheckoutDesc(props){
return <h className={styles.CheckoutDesc}>{props.desc}</h>
};


export default CheckoutDesc;