import { Fragment, useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./NavBar.module.css";
import retrieveAuthTokenOnCreateOrLogin from "../../UserBasketRedux/store/auth/retrieveAuthTokenLoginOrCreate";
import clearThisAuthTokenOnLogout from "../../UserBasketRedux/store/auth/clearThisAuthTokenOnLogout";
import clearAllAuthTokensOnLogout from "../../UserBasketRedux/store/auth/clearAllAuthTokens";
import obtainPastOrders from "../../UserBasketRedux/store/pastOrders/pastOrdersActions";
import addItemToBasket from "../../UserBasketRedux/store/basket/addItemToBasket";
import { removeItemFromBasket } from "../../UserBasketRedux/store/basket/removeItemFromBasket";
import Basket from "../Basket/Basket";

function NavBar(props) {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const ref = useRef(null);
  //console.log(authToken);

  const [numberOfItemsInBasket, setNumberOfItemsInBasket] = useState(0);
  const [currentAuthToken, setCurrentAuthToken] = useState(authToken);
  const numberOfItems = useSelector((state) => state.basket["basket"]);
  const [basketVisible, toggleBasketVisible] = useState(false);

  useEffect(() => {
    numberOfItems.length > 0
      ? setNumberOfItemsInBasket(
          numberOfItems.reduce((acc, item) => {
            acc += item.quantity;
            return acc;
          }, 0)
        )
      : setNumberOfItemsInBasket(0);
  }, [numberOfItems]);

  const logoutHandler = (authToken = currentAuthToken) => {
    dispatch(clearThisAuthTokenOnLogout(authToken));
  };

  const currentAuthTokenValueHandler = (newValue) => {
    setCurrentAuthToken(newValue);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target.value)) {
      toggleBasketVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    currentAuthTokenValueHandler(authToken);
  }, [authToken, currentAuthTokenValueHandler]);

  // //console.log("authToken", authToken);
  return (
    <Fragment>
      <nav className={`${styles.navbar}`}>
        <NavLink className={styles.navlink} to="/">
          HOME
        </NavLink>
        <NavLink className={styles.navlink} to="/podcasts">
          PODCASTS
        </NavLink>
        <NavLink className={styles.navlink} to="/shop">
          SHOP
        </NavLink>
        {authToken && (
          <div className={styles.navlink}>
            <button
              onClick={() => {
                toggleBasketVisible((prevState) => !prevState);
              }}
            >
              BASKET{" "}
              {numberOfItemsInBasket != 0 ? (
                <span className={styles.basketItems}>
                  {numberOfItemsInBasket}
                </span>
              ) : (
                ""
              )}
            </button>
          </div>
        )}
        {authToken && (
          <NavLink className={styles.navlink} to="/account">
            ACCOUNT
          </NavLink>
        )}
        {authToken && (
          <NavLink className={styles.navlink} to="/">
            <button
              className={styles.navlinkButton}
              onClick={() => {
                logoutHandler();
              }}
            >
              LOGOUT
            </button>
          </NavLink>
        )}
        {!authToken && (
          <NavLink className={styles.navlink} to="/login">
            LOGIN
          </NavLink>
        )}
        {!authToken && (
          <NavLink className={styles.navlink} to="/sign-up">
            SIGN UP
          </NavLink>
        )}
      </nav>
      {basketVisible && (
        <div ref={ref}>
          <Basket toggleBasketVisible={toggleBasketVisible} />
        </div>
      )}
      {props.children}
      <Outlet />
      {/* <button
        onClick={() => {
          loginHandler();
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          logoutHandler();
        }}
      >
        Logout
      </button>
      <button onClick={()=>{logoutAllHandler()}}>
        Logout All
      </button>
      <button onClick={()=>{getPastOrdersHandler()}}>
        Get All Past Orders
      </button>
      <button onClick={()=>{addItemToBasketHandler()}}>Add Mug to Basket</button>
      <button onClick={()=>{removeItemFromBasketHandler()}}>Remove Mug from Basket</button> */}
    </Fragment>
  );
}

export default NavBar;
