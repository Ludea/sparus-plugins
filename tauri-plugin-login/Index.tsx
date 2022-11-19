import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Popover from "@mui/material/Popover";
import FormLabel from "@mui/material/FormLabel";

// Components
import { Save } from "utils/Storage";
// i18n
import { Trans } from "react-i18next";

function LoginDialog({ openDialog, closeDialog, isConnected, anchorEl }: any) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginEmpty, setIsLoginEmpty] = useState<Boolean>();
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<Boolean>(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const Login = () => {
    if (login === "") {
      setIsLoginEmpty(true);
    } else {
      setIsLoginEmpty(false);
      if (password === "") {
        setIsPasswordEmpty(true);
      } else {
        Save("login", login);
        Save("password", password);
        closeDialog();
        isConnected();
      }
    }
  };

  const handleClose = () => {
    closeDialog();
  };

  return (
    <Popover
      id={id}
      open={openDialog}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Card sx={{ maxWidth: 250 }}>
        <CardContent>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Login"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setLogin(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) => setPassword(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={Login}>
            <Trans i18nKey="login">Login</Trans>
          </Button>
          <Button variant="contained" onClick={handleClose}>
            <Trans i18nKey="cancel">Cancel</Trans>
          </Button>
        </CardActions>
        {isLoginEmpty ? (
          <FormLabel component="legend">
            <Trans i18nKey="emptyLogin">Please fill login form !</Trans>
          </FormLabel>
        ) : null}
        {isPasswordEmpty ? (
          <FormLabel component="legend">
            <Trans i18nKey="emptyPassword">Please fill password form !</Trans>
          </FormLabel>
        ) : null}
      </Card>
    </Popover>
  );
}

export default LoginDialog;
