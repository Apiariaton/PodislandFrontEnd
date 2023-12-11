import styles from "./ProfileCreation.module.css";
import convertDateToReadableFormat from "../DateFunctions/convertDateToReadableFormat";

function ProfileCreation(props){

    
    let formattedDate = convertDateToReadableFormat(props.accountCreationDate,{
        year: 'numeric',
        month: 'long',
    });

    


return <div className={styles.profileCreation}>Joined {formattedDate}</div>;
};

export default ProfileCreation;