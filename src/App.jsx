import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Fragment } from "react";
import Home from "./Home/Home";
import Podcasts from "./Podcasts/Podcasts";
import Shop from "./Shop/Shop";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import UserProfile from "./UserProfile/UserProfile";
import NavBar from "./Navigation/NavBar/NavBar";
import Checkout from "./Checkout/CheckoutContainer";
import PaymentDialogue from "./Checkout/CheckoutDialogue/CheckoutDialogue/PaymentDialogue";
import ResetPassword from "./ResetPassword/ResetPassword";
import PaymentSuccess from "./PaymentSuccess/PaymentSuccess";
import Account from "./Account/Account";
import ErrorPage from "./Error/ErrorPage";

const router = createBrowserRouter([
  {
    name: "Navigation Bar",
    path: "/",
    element: <NavBar />,
    errorElement: <NavBar><ErrorPage/></NavBar>,
    children: [
      {
        name: "Home Page",
        index: true,
        element: <Home />,
      },
      {
        name: "Podcasts",
        path: "podcasts",
        element: <Podcasts
        />,
        errorElement: <ErrorPage/>,
      },
      {
        name: "Sign Up",
        path: "sign-up",
        element: <SignUp />,
        errorElement: <ErrorPage/>,
      },
      {
        name: "Login",
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage/>,
      },
      {
        name: "Shop",
        path: "shop",
        element: <Shop />,
        errorElement: <ErrorPage/>,
      },
      {
        name: "Checkout",
        path: "checkout",
        element: <Checkout/>,
        errorElement: <ErrorPage/>,
      },
      {
        name:"Payment Form",
        path:"payment-form",
        element: <PaymentDialogue/>,
        errorElement: <ErrorPage/>,
      },
      {
        name:"Payment Success",
        path:"payment-success",
        element: <PaymentSuccess/>,
        errorElement: <ErrorPage/>,
      },
      {
        name:"Account",
        path:"account",
        element: <Account></Account>,
        errorElement: <ErrorPage/>,
      },
      {
        name:"Reset Password",
        path:"reset/password/",
        element: <ResetPassword/>,
        errorElement: <ErrorPage/>,
      },
      {
        name:"Payment Success",
        path:"payment-success",
        element: <PaymentSuccess/>,
        errorElement: <ErrorPage/>,
      },
        ],
      },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;

}

export default App;
