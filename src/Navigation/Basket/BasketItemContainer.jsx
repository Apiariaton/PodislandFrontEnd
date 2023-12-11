import styles from "./BasketItemContainer.module.css";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import BasketItemQuantityToggle from "./BasketItemQuantityToggle";

function BasketItemContainer() {
  const basketItems = useSelector((state) => state.basket.basket);
  //console.log(basketItems);

  return (
    <div className={styles.basketItemContainer}>
      {basketItems.map((item, index) => {
        return (
          <Fragment key={index}>
            <div className={styles.quantityDescContainer}>
              <li className={styles.basketItem} key={item["name"]}>
                {item["quantity"]} x {item["name"]}
              </li>
              <BasketItemQuantityToggle item={item}></BasketItemQuantityToggle>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default BasketItemContainer;
