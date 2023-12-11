import {Outlet} from 'react-router-dom';
import styles from "./Shop.module.css";
import TopPanel from "./TopPanel";
import BottomPanel from "./BottomPanel";
import FooterPanel from "./FooterPanel";
import { Fragment } from 'react';
import {Snackbar,Alert} from "@mui/material";
import { useSelector } from 'react-redux';

function Shop(){

const currentAuthToken = useSelector(state=>state.auth.authToken);

return <Fragment>
{/* // return <div>Shop<Outlet></Outlet> */}
<div className={styles.shop}>
<TopPanel></TopPanel>
{currentAuthToken && <BottomPanel/>}
<Snackbar
open={!currentAuthToken}
>
<Alert
  variant="filled"
  severity="warning"
  sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
>
  Please login or sign up to browse and buy products...
</Alert>
</Snackbar>
<FooterPanel></FooterPanel>
{/* // </div>; */}
</div>

</Fragment>


};

export default Shop;