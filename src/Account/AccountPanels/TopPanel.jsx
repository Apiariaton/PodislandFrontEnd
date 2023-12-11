import styles from "./TopPanel.module.css";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import getLocalStorage from "../../UserBasketRedux/localStorageFunctions/getLocalStorage";
import EditUserDetailsDialogue from "../EditAccountDetails/EditUserDetailsDialogue";
import ShowPastOrdersDialogue from "../ShowPastOrdersDialogue";
import obtainPastOrders from "../../UserBasketRedux/store/pastOrders/pastOrdersActions";
import { useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";

const orderHistoryURL = import.meta.env.VITE_NODE_BE_URL + "/past-orders/";

function TopPanel() {
  
  const [userDetailsIsVisible, toggleUserDetailsIsVisible] = useState(false);
  const [pastOrdersIsVisible, togglePastOrdersIsVisible] = useState(false);
  const currentAuthToken = useSelector(state=>state.auth.authToken);
  const [pastOrders,setPastOrders] = useState(null);
  
  
  const dispatch = useDispatch();

  function openEditUserDetails() {
    toggleUserDetailsIsVisible(true);
  }

  function openPastOrdersDialogue() {
    togglePastOrdersIsVisible(true);
    getPastOrders();
  }

  function closePastOrders() {
    togglePastOrdersIsVisible(false);
  }

  function closeEditUserDetails() {
    toggleUserDetailsIsVisible(false);
  }

  function getPastOrders()
  {
      dispatch(obtainPastOrders(currentAuthToken))
  };

  const username = getLocalStorage("username");
  const accountCreationDate = getLocalStorage("accountCreationDate");
  const screenIsPhone = useMediaQuery('(max-width:449px)');

  let phoneContent = 
  <div className={styles.backgroundImgContainer}>
    <div className={styles.dialogueContainer}>
      <div className={styles.accountCard}>
        <Profile
          username={username}
          accountCreationDate={accountCreationDate}
        />
        <button
          onClick={openEditUserDetails}
          className={`${styles.baseButton} ${styles.editUserDetails}`}
        >
          Edit User Details
        </button>
        <button
          onClick={openPastOrdersDialogue}
          className={`${styles.baseButton} ${styles.showPastOrders}`}
        >
          Show Past Orders
        </button>
      </div>
      {userDetailsIsVisible && (
        <EditUserDetailsDialogue closeDialogue={closeEditUserDetails} />
      )}
      {pastOrdersIsVisible && (
        <ShowPastOrdersDialogue closeDialogue={closePastOrders} />
      )}
    </div>
  </div>;



  let tabletDesktopContent = <div className={styles.outermostContainer}>
  <div className={styles.backgroundImgContainer}>
    
      <div className={styles.accountCard}>
        <Profile
          username={username}
          accountCreationDate={accountCreationDate}
        />
        <button
          onClick={openEditUserDetails}
          className={`${styles.baseButton} ${styles.editUserDetails}`}
        >
          Edit User Details
        </button>
        <button
          onClick={openPastOrdersDialogue}
          className={`${styles.baseButton} ${styles.showPastOrders}`}
        >
          Show Past Orders
        </button>
      </div>
      {userDetailsIsVisible && (
        <EditUserDetailsDialogue closeDialogue={closeEditUserDetails} />
      )}
      {pastOrdersIsVisible && (
        <ShowPastOrdersDialogue closeDialogue={closePastOrders} />
      )}
    </div>
</div>;

  return (
    <Fragment>
    {screenIsPhone && phoneContent}
    {!screenIsPhone && tabletDesktopContent}
    </Fragment>
  );
}

export default TopPanel;
