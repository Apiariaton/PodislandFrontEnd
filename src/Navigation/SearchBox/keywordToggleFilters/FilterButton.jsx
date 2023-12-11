import styles from "./FilterButton.module.css";
import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';

function FilterToggleButton(props)
{
    const [isToggleActive,setToggleActive] = useState(false);

    const dispatch = useDispatch();
    const activeFilters = useSelector(state=>state.podcastFilter.activeFilters);
    
    const isFilterActive = activeFilters.includes(props.filterValue);
    const buttonClasses = `${styles.baseButton} ${isToggleActive ? styles.filterToggleButtonOn : ''}`;

useEffect(()=>{
const timer = setTimeout(()=>{
    dispatch(props.toggleFilter({"filterValue": props.filterValue, "isActive": isToggleActive}));
},500);  
return ()=>clearTimeout(timer);   
},[isToggleActive,dispatch]);

    // 
    return (
        <button type="button" className={buttonClasses} onClick={()=>{setToggleActive((prevState)=>!prevState)}}>
            {props.filterValue}
        </button>

    );

};

export default FilterToggleButton;