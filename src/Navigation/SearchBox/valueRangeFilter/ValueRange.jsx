import { Fragment, useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import "./ValueRange.css";
import Box from '@mui/material/Box';
import Slider from "@mui/material/Slider";

function valuetext(value){
    return `${value}`;
}



function ValueRange(props){

const dispatch = useDispatch();    

const [minMaxValues,setMinMaxValues] = useState([0,1000]);

const handleChange = (event,newValue)=>{
    setMinMaxValues(newValue);
};

useEffect(()=>{setTimeout(()=>{dispatch(props.configureRangeFilter.updateMinMaxValues({min:minMaxValues[0],max:minMaxValues[1]}))},500)},[minMaxValues,dispatch]);

let phoneSlider = <Box sx={{width:300, height:20, mb:4,mt:-3}}> 
<Slider getAriaLabel={()=>{'Slider'}}
value={minMaxValues}
onChange={handleChange}
valueLabelDisplay="auto"
step={10}
min={0}
max={1000}
scale={props.configureRangeFilter.calculateValue}
disableSwap
marks={props.configureRangeFilter.marks}
valueLabelFormat={props.configureRangeFilter.valueLabelFormat}
getAriaValueText={valuetext}/>
</Box>;


let tabletDesktopSlider = <Box sx={{width:300, height:20, mb:4,mt:-3}}> 
<Slider getAriaLabel={()=>{'Slider'}}
value={minMaxValues}
onChange={handleChange}
valueLabelDisplay="auto"
step={10}
min={0}
max={1000}
scale={props.configureRangeFilter.calculateValue}
disableSwap
marks={props.configureRangeFilter.marks}
valueLabelFormat={props.configureRangeFilter.valueLabelFormat}
getAriaValueText={valuetext}/>
</Box>;



return (<Box sx={{width:210, height:14, mb:6,mt:-2.1}}> 
<Slider getAriaLabel={()=>{'Slider'}}
value={minMaxValues}
onChange={handleChange}
valueLabelDisplay="auto"
step={10}
min={0}
max={1000}
scale={props.configureRangeFilter.calculateValue}
disableSwap
marks={props.configureRangeFilter.marks}
valueLabelFormat={props.configureRangeFilter.valueLabelFormat}
getAriaValueText={valuetext}/>
</Box>);

};

export default ValueRange;