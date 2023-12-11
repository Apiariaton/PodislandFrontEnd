import styles from "./ProfileUsername.module.css";

function ProfileUsername(props){
return <div className={styles.profileUsername}>
{props.username}
</div>
};

export default ProfileUsername;