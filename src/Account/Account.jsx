import TopPanel from "./AccountPanels/TopPanel";
import BottomPanel from "./AccountPanels/BottomPanel";
import styles from "./Account.module.css";
import { Fragment } from "react";

function Account(props) {
  return (
    <Fragment>
      <div className={styles.account}>
        <TopPanel />
        <BottomPanel />
      </div>
    </Fragment>
  );
}

export default Account;
