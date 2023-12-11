import styles from "./SignUpTitle.module.css";

function SignUpTitle(props){
    return <h className={styles.signUpTitle}>{props.title}</h>
    };
    
export default SignUpTitle;