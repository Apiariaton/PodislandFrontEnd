import styles from "./BackgroundPanel.module.css";


function BackgroundPanel(props){
return <div className={styles.backgroundPanelContainer}><div className={styles.backgroundPanelInnerContainer}>
{props.children}
</div></div>;
};

export default BackgroundPanel;