import GoogleIcon from "@mui/icons-material/Google";
import { Button, Grid } from "@mui/material";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={loginWithGoogle}
      >
        Sign in Google
      </Button>
    </Grid>
  );
};

export default Login;
