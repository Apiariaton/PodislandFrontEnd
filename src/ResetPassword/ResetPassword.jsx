import styles from "./ResetPassword.module.css";
import DialogueTitle from "../Account/DialogueWindowComponents/DialogueTitle";
import InputField from "../Account/DialogueWindowComponents/InputField";
import DialogueDesc from "../Account/DialogueWindowComponents/DialogueDesc";
import DialogueButton from "../Account/DialogueWindowComponents/DialogueButton";
import validator from "validator";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const changePasswordURL =
  import.meta.env.VITE_NODE_BE_URL + "/users/me/change/password";

function ResetPassword() {
  const [accountEmail, setAccountEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordIsChanged, setPasswordIsChanged] = useState(null);
  const navigate = useNavigate();

  async function handlePasswordChange() {
    const changePasswordRequest = await fetch(changePasswordURL, {
      method: "POST",
      body: JSON.stringify({ email: accountEmail, newPassword }),
      headers: { "Content-Type": "application/json" },
    });
    if (changePasswordRequest.ok) {
      setPasswordIsChanged(true);
    } else {
      setPasswordIsChanged(false);
    }
  }

  useEffect(() => {
    passwordIsChanged == true
      ? setTimeout(() => {
          navigate("/");
        }, 3000)
      : "";
  }, [passwordIsChanged, navigate]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h className={styles.header}>Reset your password</h>
        <DialogueDesc desc="Enter the email you used to sign up..." />
        <InputField
          checkField={(value) => {
            return validator.isEmail(value);
          }}
          storeInputValue={setAccountEmail}
          placeholder="Account email"
        ></InputField>
        <InputField
          checkField={(value) => {
            return validator.isStrongPassword(value);
          }}
          storeInputValue={setNewPassword}
          placeholder="New password"
        ></InputField>
        <DialogueButton
          isDisabled={
            validator.isEmpty(accountEmail) || validator.isEmpty(newPassword)
          }
          customClass="resetPassword"
          dialogueButtonValue="Reset password"
          dialogueButtonAction={handlePasswordChange}
        ></DialogueButton>
      </div>

    {/* Handle errors */}
      <Snackbar
        open={passwordIsChanged}
        autoHideDuration={6000}
        onClose={() => setPasswordIsChanged(null)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setPasswordIsChanged(null)}
          sx={{ width: "100%" }}
        >
          Password changed successfully...
        </Alert>
      </Snackbar>
      <Snackbar
        open={passwordIsChanged == false}
        autoHideDuration={6000}
        onClose={() => setPasswordIsChanged(null)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setPasswordIsChanged(null)}
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          There was an error changing your password...
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ResetPassword;
