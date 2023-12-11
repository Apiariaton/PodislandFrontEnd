import styles from "./ShopItemDesc.module.css";

function ShopItemDesc(props){

const descClass = `${styles.desc} ${(props.title.split("").length >= 24) ? styles.marginShortened : styles.marginOriginal}`;     

return <div className={styles.desc}>
{props.desc}
</div>;
};

export default ShopItemDesc;