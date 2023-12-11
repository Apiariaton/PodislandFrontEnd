import styles from "./EditUserDetailsDialogue.module.css";
import DialogueTitle from "../DialogueWindowComponents/DialogueTitle";
import DialogueDesc from "../DialogueWindowComponents/DialogueDesc";
import DialogueButton from "../DialogueWindowComponents/DialogueButton";
import { Fragment, useState, useEffect } from "react";
import validator from "validator";
import InputField from "../DialogueWindowComponents/InputField";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { authSliceActions } from "../../UserBasketRedux/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { obtainUserEmail } from "../AccountManagementFunctions/obtainUserEmail";
import getLocalStorage from "../../UserBasketRedux/localStorageFunctions/getLocalStorage";
import { removePersonalDataFromLocalStorage } from "../../UserBasketRedux/deleteAccount/removePersonalDataFromLocalStorage";

const obtainUserEmailURL = import.meta.env.VITE_NODE_BE_URL + "/users/email";
const resetPasswordURL =
  import.meta.env.VITE_NODE_BE_URL + "/users/me/reset/password";
const userAccountDeletionURL = import.meta.env.VITE_NODE_BE_URL + "/users/me";

function EditUserDetailsDialogue(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //States to handle which dialogues are visible
  const [mainMenuVisible, setMainMenuVisible] = useState(true);
  const [resetPasswordVisible, toggleResetPasswordVisible] = useState(false);
  const [deleteAccountVisible, toggleDeleteAccountVisible] = useState(null);

  //Email addressee to receive reset password email
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [userAccountEmail, setUserAccountEmail] = useState("");

  //Account deleted successfully / reset password email sent correctly
  const [resetPasswordEmailIsSent, setResetPasswordEmailIsSent] =
    useState(null);
  const [accountIsDeleted, setAccountIsDeleted] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const currentAuthToken = useSelector((state) => state.auth.authToken);
  const userEmail = getLocalStorage("userEmail");

  async function sendForgottenPasswordEmail() {
    try {
      setIsLoading(true);
      const response = await fetch(resetPasswordURL, {
        method: "POST",
        body: JSON.stringify({ selectedEmail: resetPasswordEmail }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentAuthToken,
        },
      });
      // //console.log(response);
      // //console.log(await response.json());
      if (response.status == 200) {
        setIsLoading(false);
        setResetPasswordEmailIsSent(true);
        closeResetPasswordDialogue();
      }
    } catch (e) {
      // //console.log(e);
      setIsLoading(false);
      setResetPasswordEmailIsSent(false);
    }
  }

  async function deleteAccount() {
    setIsLoading(true);
    try {
      //Check whether a user exists with this email; if not, not possible to delete account.
      if (!userEmail) {
        throw new Error(
          "No account email provided to identify account to delete..."
        );
      }

      //Check that email address provided is the same as the account email.
      if (userAccountEmail == userEmail) {
        const accountDeletionRequest = await fetch(userAccountDeletionURL, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + currentAuthToken,
          },
        });

        //Account successfully deleted
        if (accountDeletionRequest.ok) {
          // //console.log("Account is deleted successfully");
          setIsLoading(false);
          setAccountIsDeleted(true);
          return;
        }
      }
      //No match between email provided and login email
      else {
        setIsLoading(false);
        setAccountIsDeleted(false);
      }
    } catch (e) {
      //console.log(e);
    }
  }

  function openResetPasswordDialogue() {
    setMainMenuVisible(false);
    toggleResetPasswordVisible(true);
  }

  function closeResetPasswordDialogue() {
    toggleResetPasswordVisible(false);
    setMainMenuVisible(true);
  }

  function openDeleteAccountDialogue() {
    setMainMenuVisible(false);
    toggleDeleteAccountVisible(true);
  }

  function closeDeleteAccountDialogue() {
    toggleDeleteAccountVisible(false);
    setMainMenuVisible(true);
  }

  useEffect(() => {
    accountIsDeleted == true
      ? setTimeout(() => {
          dispatch(removePersonalDataFromLocalStorage());
          navigate("/");
          setAccountIsDeleted(null);
        }, 2000)
      : "";
  }, [dispatch, removePersonalDataFromLocalStorage, accountIsDeleted]);

  const mainMenu = (
    <Fragment>
      <div className={styles.titleHeader}>
        <DialogueTitle
          title="Edit User Details"
          closeDialogue={props.closeDialogue}
        />
      </div>
      <div className={styles.dialogueInnerContainer}>
        <DialogueDesc desc="Change password or delete account..." />
        <DialogueButton
          customClass="resetPassword"
          dialogueButtonValue="Reset Password"
          dialogueButtonAction={openResetPasswordDialogue}
        />
        <DialogueButton
          customClass="deleteAccount"
          dialogueButtonValue="DELETE ACCOUNT"
          dialogueButtonAction={openDeleteAccountDialogue}
        />
      </div>
    </Fragment>
  );

  const resetPasswordDialogue = (
    <Fragment>
      <div className={styles.titleHeader}>
        <DialogueTitle
          title="Reset password"
          closeDialogue={closeResetPasswordDialogue}
        />
      </div>
      <div className={styles.dialogueInnerContainer}>
        <DialogueDesc desc="Input your account email: you should then receive an email. Follow the link to reset your password..." />
        <InputField
          checkField={(value) => {
            return validator.isEmail(value);
          }}
          placeholder="Account Email"
          errorMessage={"Please enter a valid email..."}
          storeInputValue={setResetPasswordEmail}
        ></InputField>
        <DialogueButton
          isDisabled={validator.isEmpty(resetPasswordEmail)}
          customClass="resetPassword"
          dialogueButtonValue="Reset Password"
          dialogueButtonAction={sendForgottenPasswordEmail}
          isLoading={isLoading}
        />
      </div>
    </Fragment>
  );

  const deleteAccountDialogue = (
    <Fragment>
      <div className={styles.titleHeader}>
        <DialogueTitle
          title="Delete user account"
          closeDialogue={closeDeleteAccountDialogue}
        />
      </div>
      <div className={styles.dialogueInnerContainer}>
        <DialogueDesc desc="Type your account email and press button below to delete account..." />
        <InputField
          checkField={(value) => {
            return validator.isEmail(value);
          }}
          storeInputValue={setUserAccountEmail}
          placeholder="Account Email"
          errorMessage={"Please enter a valid email..."}
          isLoading={isLoading}
        ></InputField>
        <DialogueButton
          customClass="deleteAccount"
          isDisabled={userAccountEmail != userEmail}
          dialogueButtonValue="DELETE ACCOUNT"
          dialogueButtonAction={deleteAccount}
        />
        {/* <DialogueButton customClass="returnMenu" dialogueButtonValue="Go Back" dialogueButtonAction={closeDeleteAccountDialogue}/> */}
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className={styles.dialogueWindowContainer}>
        {mainMenuVisible && mainMenu}
        {resetPasswordVisible && resetPasswordDialogue}
        {deleteAccountVisible && deleteAccountDialogue}
      </div>
      <Snackbar
        open={resetPasswordEmailIsSent}
        autoHideDuration={6000}
        onClose={() => setResetPasswordEmailIsSent(null)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setResetPasswordEmailIsSent(null)}
          sx={{ width: "100%" }}
        >
          Reset password email sent successfully...
        </Alert>
      </Snackbar>
      <Snackbar
        open={resetPasswordEmailIsSent == false}
        autoHideDuration={6000}
        onClose={() => setResetPasswordEmailIsSent(null)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setResetPasswordEmailIsSent(null)}
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          There was an resetting your password: please email
          thepodisland@gmail.com if this problem continues...
        </Alert>
      </Snackbar>
      <Snackbar open={accountIsDeleted} autoHideDuration={6000}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Account was deleted succesfully - redirecting to home page...
        </Alert>
      </Snackbar>
      <Snackbar
        open={accountIsDeleted == false}
        autoHideDuration={6000}
        onClose={() => setAccountIsDeleted(null)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setAccountIsDeleted(null)}
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          Something went wrong while deleting your account: please contact
          thepodisland@gmail.com
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default EditUserDetailsDialogue;
