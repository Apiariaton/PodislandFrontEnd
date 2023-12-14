import { Fragment } from "react";
import styles from "./Home.module.css";
import BackgroundPanel from "./BackgroundPanel";

function HomePage(){


return (
    <Fragment>
   
    <BackgroundPanel/>
    <div className={styles.homeFooter}>
        <div className={styles.textContainer}>
     Share your favourite podcasts and hunt for new finds...    
        </div>
        </div> 
    </Fragment>
)


};

export default HomePage;