import styles from "./InputField.module.css";
import {useState,Fragment} from 'react';


function InputField(props){

    const [fieldValue,setFieldValue] = useState("");
    const [valueError,setValueError] = useState(null);
    
    function thisfieldIsValid(value)
    {
        setFieldValue(value);
        let isValid = props.checkField(value); 
        setValueError(!isValid);
        if (isValid)
        {
            props.storeInputValue(value);
        }
    };
    
    
    return <Fragment><div className={styles.inputContainer}>
        <input className={styles.input} onBlur={(event)=>{thisfieldIsValid(event.target.value)}}onChange={(event)=>{thisfieldIsValid(event.target.value)}} type="text" placeholder={props.placeholder}></input>
        </div>
        <div className={styles.errorMessage}>{valueError && props.errorMessage}</div>
        </Fragment>
    };
    
    
    export default InputField;