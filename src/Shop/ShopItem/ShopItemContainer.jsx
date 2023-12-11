import styles from "./ShopItemContainer.module.css";
import ShopItem from "./ShopItem";
import { Fragment } from "react";
import itemImg from "../../assets/images/PodislandMug.png";
import { shopListings } from "./shopListings";



function ShopItemContainer(props)
{
return <div className={styles.container}>
    {/* Map shop items */}
    {shopListings.map((shopItem,index)=>{
    return <ShopItem key={index} title={shopItem["title"]} desc={shopItem["desc"]} price={shopItem["price"]} itemImg={shopItem["img"]} currentQuantity="0"/>
    })}   

</div>
};

export default ShopItemContainer;