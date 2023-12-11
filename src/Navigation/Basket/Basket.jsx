import styles from "./Basket.module.css";
import BasketTitle from "./BasketTitle";
import BasketItemContainer from "./BasketItemContainer";
import BasketCheckoutBtn from "./BasketCheckoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Basket(props) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    props.toggleBasketVisible(false);
    navigate("/checkout");
  };

  const basketErrorMessage = useSelector(
    (state) => state.errorMessage.basketErrorMessage
  );
  // //console.log("basketErrorMSG",basketErrorMessage);

  return (
    <div className={styles.basket}>
      <BasketTitle title="Basket"></BasketTitle>
      <BasketItemContainer></BasketItemContainer>
      <BasketCheckoutBtn handleCheckout={handleCheckout}></BasketCheckoutBtn>
      <div className={styles.errorMessage}>{basketErrorMessage}</div>
    </div>
  );
}

export default Basket;
