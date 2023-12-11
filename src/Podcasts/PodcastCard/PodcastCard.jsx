import styles from "./PodcastCard.module.css";
import monkey from "../../assets/images/infi.jpeg";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

function PodcastCard(props){

return (
    //Eventually add like button
    <div className={styles.card}>
    <img className={styles.profileImg} src={props.cardImage}></img>
    <div className={styles.cardBody}>
    <div className={styles.cardTitle}>{props.cardTitle}</div>
    <div className={styles.cardArtist}>{props.cardArtist}</div><br/>
    <div className={styles.cardGenres}>{props.cardGenres}</div>
    </div>
    <div className={styles.cardFooter}>
    <a href={props.cardLink} target="_blank">LISTEN NOW</a><p>{/*LIKE*/}</p>    
    </div>
    </div>
    );

};


export default PodcastCard;