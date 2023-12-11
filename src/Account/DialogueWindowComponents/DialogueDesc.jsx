import styles from "./DialogueDesc.module.css";

function DialogueDesc(props){
return <div className={styles.dialogueDesc}>{props.desc}</div>


};

export default DialogueDesc;