import styles from "./BasketCheckoutBtn.module.css";
import { useSelector } from "react-redux";
import {useState, useEffect } from 'react';

function BasketCheckoutBtn(props){

const [buttonIsActive,setButtonIsActive] = useState(false);    
const basket = useSelector(state=>state.basket.basket);
const buttonClasses = `${styles.checkoutBtn} ${buttonIsActive ? "" : styles.isDisabled}`;

//Only possible to checkout with at least one item in basket
useEffect(()=>{setButtonIsActive(basket.length > 0)},[basket]);

    return <div className={styles.btnContainer}><button disabled={!buttonIsActive} className={buttonClasses} onClick={()=>{props.handleCheckout()}}>Go to Checkout</button></div>;
    };

export default BasketCheckoutBtn;