import styles from "./PaymentSuccess.module.css";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {basketSliceActions} from "../UserBasketRedux/store/basket/basketSlice";

function PaymentSuccess(props){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{setTimeout(()=>{dispatch(basketSliceActions.emptyBasket());navigate("/")},3000)},[]);

    return <div className={styles.container}>
        <div className={styles.innerContainer}>
        <p className={styles.highlightedText}>
        Order placed successfully!
        </p>
        </div>
        </div>;

};

export default PaymentSuccess;