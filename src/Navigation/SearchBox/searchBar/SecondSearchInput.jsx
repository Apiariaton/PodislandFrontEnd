import styles from "./SecondSearchInput.module.css";
import {useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';

//changeArtistName

function SecondSearchInput(props){

const [currentSecondInput,setCurrentSecondInput] = useState("");


const dispatch = useDispatch();

function inputHandler(event){
setTimeout(()=>{setCurrentSecondInput(event.target.value)},500);
};

useEffect(()=>{
dispatch(props.updateSecondTextInput(currentSecondInput));
},[dispatch,currentSecondInput]);



return <input placeholder={props.secondSearchInputPH} className={styles.secondSearchInput} onChange={(event)=>{inputHandler(event)}}>
</input>
};


export default SecondSearchInput;