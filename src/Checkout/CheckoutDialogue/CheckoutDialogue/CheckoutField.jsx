import { stepButtonClasses } from "@mui/material";
import styles from "./CheckoutField.module.css";
import { Fragment, useState, useEffect, prevState } from "react";







function CheckoutField(props){

const [fieldValue,setFieldValue] = useState("");
const [errorIsActive,setErrorIsActive] = useState(null);

function fieldIsValid(value)
{
    setFieldValue(value);
    let isValid = props.checkField(value); 
    setErrorIsActive(!isValid);
    props.validateField(isValid);
    if (isValid)
    {
        props.updateCentralFieldData((prevState)=>{return {...prevState,[props.centralDataKey]:value}});
    }
};

// useEffect(()=>{props.checkField(fieldValue) ? fieldIsValid(true) : fieldIsValid(false)},[props.checkField,fieldValue,fieldIsValid]);
//useEffect(()=>{},[]);

return <Fragment><div className={styles.CheckoutInputContainer}>
    <input className={styles.CheckoutInput} onBlur={(event)=>{fieldIsValid(event.target.value)}}onChange={(event)=>{fieldIsValid(event.target.value)}} type="text" placeholder={props.placeholder}></input>
    </div>
    <div className={styles.errorMessage}>{errorIsActive && props.errorMessage}</div>
    </Fragment>
};


export default CheckoutField;