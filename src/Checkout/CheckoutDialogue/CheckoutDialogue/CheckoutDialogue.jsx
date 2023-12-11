import styles from "./CheckoutDialogue.module.css";
import CheckoutTitle from "./CheckoutTitle";
import CheckoutDesc from "./CheckoutDesc";
import CheckoutButton from "./CheckoutButton";
import CheckoutField from "./CheckoutField";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Snackbar, Alert } from "@mui/material";
import getLocalStorage from "../../../UserBasketRedux/localStorageFunctions/getLocalStorage";
import { stripeInfoSliceActions } from "../../../UserBasketRedux/store/stripeInfo/stripeInfoSlice";

const checkoutURL = import.meta.env.VITE_NODE_BE_URL + "/shop/place/order";

function CheckoutDialogue(props) {
  const [formIsSendable, setFormIsSendable] = useState(false);
  const [orderIsPlaced, setOrderIsPlaced] = useState(null);
  const [paymentRedirect, setPaymentRedirect] = useState(null);

  //Is checkout form valid?
  const [validForm, setValidForm] = useState({
    AddresseeName: false,
    Address: false,
  });

  //Checkout data fields: recipient name and recipient postal address
  const [fieldData, setFieldData] = useState({
    AddresseeName: "",
    Address1: "",
    Address2: "",
    Address3: "",
    Address4: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const basket = useSelector((state) => state.basket.basket);
  let errorLoggingIn = useSelector(
    (state) => state.errorMessage.authErrorMessage[0]
  );

  //Send order placement request to server
  async function sendOrderRequest() {
    //Create order body
    const orderDetails = JSON.stringify({
      order: {
        status: "pending",
        addresseePostAddress:
          fieldData["Address1"] +
          fieldData["Address2"] +
          fieldData["Address3"] +
          fieldData["Address4"],
        addresseeName: fieldData["AddresseeName"],
        orderItems: basket,
      },
    });

    const currentAuthToken = getLocalStorage("authToken");

    //Send a request to place a new order
    const orderRequest = await fetch(checkoutURL, {
      method: "POST",
      body: orderDetails,
      headers: {
        Authorization: "Bearer " + currentAuthToken,
        "Content-Type": "application/json",
      },
    });

    // //console.log("orderIsPlaced", orderRequest.ok);
    const response = await orderRequest.json();
    // //console.log(response);

    const { clientSecret, orderID } = response;

    dispatch(stripeInfoSliceActions.setStripeInfo({ clientSecret, orderID }));

    // //console.log(orderRequest, clientSecret, orderID);

    if (orderRequest.ok == true) {
      // //console.log("Order was placed successfully");
      setOrderIsPlaced(true);
      setPaymentRedirect(true);
    } else {
      // //console.log("There was an error placing the order...");
      setOrderIsPlaced(false);
      setPaymentRedirect(false);
    }
    //console.log(orderIsPlaced);
  }

  //Navigate to payment page when order is placed
  useEffect(() => {
    orderIsPlaced == true ? navigate("/payment-form") : "";
  }, [navigate, orderIsPlaced]);

  //Check that address is valid
  useEffect(() => {
    fieldData["Address1"] && fieldData["Address4"]
      ? setValidForm((prevState) => ({ ...prevState, Address: true }))
      : "";
  }, [fieldData]);

  //Check that the form is valid
  useEffect(() => {
    setFormIsSendable(
      Object.values(validForm).filter((value) => value == false).length == 0
    );
  }, [setFormIsSendable, validForm]);

  let orderString = `Place your order of: \n \n`;
  orderString = basket.reduce((acc, item) => {
    acc +=
      "\n" +
      item["quantity"] +
      "   x   " +
      item["name"] +
      (item["quantity"] > 1 ? "s" : "");
    return acc;
  }, orderString);

  return (
    <Fragment>
      <div className={styles.CheckoutDialogue}>
        <CheckoutTitle title="Checkout" />

        <CheckoutDesc desc={orderString} />

        <CheckoutField
          placeholder={"Addressee name"}
          centralDataKey={"AddresseeName"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({
              ...prevState,
              AddresseeName: isValid,
            }));
          }}
          checkField={(value) => {
            return !validator.isEmpty(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please enter a valid addressee name..."
        ></CheckoutField>

        <CheckoutField
          placeholder={"First line of delivery address"}
          centralDataKey={"Address1"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({ ...prevState, Address1: isValid }));
          }}
          checkField={(value) => {
            return !validator.isEmpty(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please enter a valid first line for the postal address..."
        ></CheckoutField>

        <CheckoutField
          placeholder={"Second line of delivery address"}
          centralDataKey={"Address2"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({ ...prevState, Address2: isValid }));
          }}
          checkField={(value) => {
            return !validator.isEmpty(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please enter a valid second line for the postal address..."
        ></CheckoutField>

        <CheckoutField
          placeholder={"Third line of delivery address"}
          centralDataKey={"Address3"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({ ...prevState, Address3: isValid }));
          }}
          checkField={(value) => {
            return !validator.isEmpty(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please enter a valid third line for the postal address..."
        ></CheckoutField>

        <CheckoutField
          placeholder={"Postcode"}
          centralDataKey={"Address4"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({ ...prevState, Address4: isValid }));
          }}
          checkField={(value) => {
            return !validator.isEmpty(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please enter a valid fourth line of the address..."
        ></CheckoutField>

        <CheckoutButton
          buttonName={"Confirm order details"}
          isDisabled={!formIsSendable}
          triggerCheckout={sendOrderRequest}
        />

        <div className={styles.errorMessage}>{errorLoggingIn}</div>
      </div>
      <Snackbar
        open={paymentRedirect}
        autoHideDuration={6000}
        onClose={() => setPaymentRedirect(null)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setOrderPlacementWasSuccessful(null)}
          sx={{ width: "100%" }}
        >
          Order successfully placed - redirecting to payment provider...
        </Alert>
      </Snackbar>
      <Snackbar
        open={paymentRedirect == false}
        autoHideDuration={6000}
        onClose={() => setPaymentRedirect(null)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setOrderPlacementWasSuccessful(null)}
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          There was an error placing the order...
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default CheckoutDialogue;
