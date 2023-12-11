import { Fragment } from "react";
import styles from "./BottomPanel.module.css";
import ShopItem from "./ShopItem/ShopItem";
import ShopItemContainer from "./ShopItem/ShopItemContainer";

function BottomPanel(){
return <Fragment> <div className={styles.container}> <ShopItemContainer></ShopItemContainer></div> </Fragment>;
};


export default BottomPanel;