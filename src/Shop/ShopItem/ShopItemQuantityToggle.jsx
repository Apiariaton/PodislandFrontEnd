import styles from "./ShopItemQuantityToggle.module.css";
import addItemToBasket from "../../UserBasketRedux/store/basket/addItemToBasket";
import removeItemFromBasket from "../../UserBasketRedux/store/basket/removeItemFromBasket";
import { useDispatch, useSelector } from "react-redux";
import {useState,useEffect,prevState} from 'react';

function ShopItemQuantityToggle(props) {
  
  const [numberOfItems,setNumberOfItems] = useState(0);
  const dispatch = useDispatch();
  let currentQuantity = useSelector((state) => state.basket);


  useEffect(()=>{
    (currentQuantity["basket"].find(item => item.name == [[props.ProductName]]) == undefined)
      ? setNumberOfItems(0)
      : setNumberOfItems(((currentQuantity["basket"]).find(item => item.name == [[props.ProductName]])).quantity);},[currentQuantity,props.ProductName]);



  function addThisItemToBasket(
    thisItem = { ProductName: props.ProductName, ProductQuantity: 1 }
  ) {
    dispatch(addItemToBasket(thisItem));
  }

  function removeThisItemFromBasket(
    thisItem = { ProductName: props.ProductName, ProductQuantity: 1 }
  ) {
    dispatch(removeItemFromBasket(thisItem));
  }

  return (
    <div className={styles.quantityToggle}>
      <button
        onClick={() => {
          dispatch(removeThisItemFromBasket());
        }}
        className={`${styles.quantityToggleButton}`}
      >
        -
      </button>
      <p className={styles.currentQuantity}>{numberOfItems}</p>
      
      <button
        className={styles.quantityToggleButton}
        onClick={() => {
          dispatch(addThisItemToBasket());
        }}
      >
        +
      </button>
    </div>
  );
}

export default ShopItemQuantityToggle;
