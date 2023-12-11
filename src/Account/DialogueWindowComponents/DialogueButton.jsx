import styles from "./DialogueButton.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import {useState,useEffect} from 'react';

function DialogueButton(props){


const buttonClasses = `${styles.dialogueButton} ${styles[props.customClass]} ${props.isDisabled ? styles.isDisabled : ""}`; 

return <button disabled={props.isDisabled} className={buttonClasses} onClick={props.dialogueButtonAction}>
{!props.isLoading && props.dialogueButtonValue}
{props.isLoading && <CircularProgress style={{'color': 'white'}}/>}
</button>
};

export default DialogueButton;