import styles from "./ShopItemTitle.module.css";

function ShopItemTitle(props){

const titleClasses = `${styles.title} ${props.title.length >= 24 ? styles.fontShortened : styles.fontOriginal}`;

return <div className={titleClasses}>
{props.title}
</div>;
};

export default ShopItemTitle;