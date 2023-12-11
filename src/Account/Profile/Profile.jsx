import styles from "./Profile.module.css";
import ProfileImg from "./ProfileImg";
import ProfileUsername from "./ProfileUsername";
import ProfileCreation from "./ProfileCreation";
import ProfileEmail from "./ProfileEmail";

function Profile(props){
return <div className={styles.profileContainer}>
<ProfileImg></ProfileImg>
<ProfileUsername username={props.username}></ProfileUsername>
<ProfileCreation accountCreationDate={props.accountCreationDate}></ProfileCreation>
{/* <ProfileEmail email={props.email}></ProfileEmail> */}
</div>;
};

export default Profile;