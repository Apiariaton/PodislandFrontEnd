import styles from "./BackgroundPanel.module.css";
import {useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function BackgroundPanel(){

const navigate = useNavigate();
const [searchParams,setSearchParams] = useSearchParams();


useEffect(()=>{searchParams.get("redirect_status") == "succeeded" ? navigate("/payment-success") : ""},[searchParams]);

    return (
        <div className={styles.background_panel}>
            <div className={styles.logo}></div>
        </div>
    );

};

export default BackgroundPanel;