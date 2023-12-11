import { Fragment } from "react";
import styles from "./ShopItem.module.css";
import ShopItemTitle from "./ShopItemTitle";
import ShopItemDesc from "./ShopItemDesc";
import ShopItemPrice from "./ShopItemPrice";
import ShopItemQuantityToggle from "./ShopItemQuantityToggle";

function ShopItem(props){
return <Fragment>
    <div className={styles.shopItem}>
        <div><img src={props.itemImg} className={styles.shopItemImage}></img></div>
            <ShopItemTitle title={props.title}></ShopItemTitle>
            <ShopItemDesc desc={props.desc} title={props.title}></ShopItemDesc>
        <div className={styles.bottomRow}>
            <ShopItemPrice price={props.price}></ShopItemPrice>
            <ShopItemQuantityToggle ProductName={props.title} currentQuantity={props.currentQuantity}></ShopItemQuantityToggle>
        </div>
    </div>
</Fragment>
};

export default ShopItem;