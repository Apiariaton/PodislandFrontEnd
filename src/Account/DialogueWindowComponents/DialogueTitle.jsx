import styles from "./DialogueTitle.module.css";

function DialogueTitle(props){
return <div className={styles.titleBar}><div className={styles.dialogueTitle}>{props.title}</div><button className={styles.closeDialogue} onClick={props.closeDialogue}>X</button></div>
};

export default DialogueTitle;