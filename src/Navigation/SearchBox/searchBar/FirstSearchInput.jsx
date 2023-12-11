import styles from "./FirstSearchInput.module.css";
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';

function FirstSearchInput(props){

const dispatch = useDispatch();
const [currentFirstInput,setCurrentFirstInput] = useState("");

function inputHandler(event)
{
    setTimeout(()=>{setCurrentFirstInput(event.target.value)},500);
};

useEffect(()=>{dispatch(props.updateFirstTextInput(currentFirstInput))},[currentFirstInput,dispatch]);


return <input onChange={(event)=>{inputHandler(event)}} placeholder={props.placeholder} className={`${styles.mainSearchInput}`} id="main_search_field" type="text"></input>;


};

export default FirstSearchInput;