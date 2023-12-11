import styles from "./SignUpDesc.module.css";
import { Fragment } from "react";
import {Link} from 'react-router-dom';
import SignUpSubTitle from "./SignUpSubTitle";

function SignUpDesc(props){
return <h className={styles.signUpDesc}>{props.desc} or <Link className={styles.loginRedirect} to="/login"> login </Link>...</h>
};


export default SignUpDesc;