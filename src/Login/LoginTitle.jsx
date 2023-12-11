import styles from "./LoginTitle.module.css";

function LoginTitle(props){
    return <h className={styles.LoginTitle}>{props.title}</h>
    };
    
export default LoginTitle;