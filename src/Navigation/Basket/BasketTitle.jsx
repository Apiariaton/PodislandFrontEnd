import styles from "./BasketTitle.module.css";

function BasketTitle(props){
    return <div className={styles.basketTitle}>{props.title}</div>;
    };

export default BasketTitle;