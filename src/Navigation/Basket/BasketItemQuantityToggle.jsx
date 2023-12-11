import styles from "./BasketItemQuantityToggle.module.css";
import {useDispatch} from 'react-redux'; 
import addItemToBasket from '../../UserBasketRedux/store/basket/addItemToBasket';
import removeItemFromBasket from '../../UserBasketRedux/store/basket/removeItemFromBasket';

function BasketItemQuantityToggle(props){

    const dispatch = useDispatch();

    function addThisItemToBasket(){
        const newItemObject = {"ProductName":props.item["name"],"ProductQuantity":1};
        dispatch(addItemToBasket(newItemObject));
    };

    function removeThisItemFromBasket(){
        const newItemObject = {"ProductName":props.item["name"],"ProductQuantity":1};
        dispatch(removeItemFromBasket(newItemObject));
    };

    return <div className={styles.toggleContainer}>
        <button onClick={()=>{dispatch(removeThisItemFromBasket)}}>-</button>
        <button onClick={()=>{dispatch(addThisItemToBasket)}}>+</button>
    </div>;
    };

export default BasketItemQuantityToggle;
