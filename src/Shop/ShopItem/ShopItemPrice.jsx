import styles from "./ShopItemPrice.module.css";

function ShopItemPrice(props){
return <div className={styles.price}>
£{props.price}
</div>;
};

export default ShopItemPrice;