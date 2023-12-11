import styles from "./LoginDesc.module.css";


function LoginDesc(props){
return <h className={styles.LoginDesc}>{props.desc}</h>
};


export default LoginDesc;