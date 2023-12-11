import { useNavigate } from "react-router-dom";
import styles from "./SignUpSubTitle.module.css";

function SignUpSubTitle(props){

const navigate = useNavigate();

return <div className={styles.subTitle}>
<div className={styles.innerContainer}>
{props.desc} <button className={styles.loginRedirect}>
{props.linkDesc}
</button>
</div>
</div>;
};

export default SignUpSubTitle;