import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TeacherAPI } from "../../services";
import { toast } from "react-toastify";
import { SignUpSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const theme = createTheme();

  const navigate = useNavigate();
  const [signupError, setSignupError] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    TeacherAPI.createTeacher(data)
      .then((respone) => {
        console.log(respone, "RESPONSE");
        setSignupError("");
        toast.success("Create Account successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => navigate(ROUTE_PATH.SIGNIN),
        });
      })
      .catch((err) => {
        console.log(err, "ERR");
        const msgErr = err.response.data.message;
        setSignupError(msgErr?.trim());
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors?.firstName?.message}
                  helperText={errors?.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  autoComplete="off"
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={!!errors?.lastName?.message}
                  helperText={errors?.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  autoComplete="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={!!errors?.email?.message}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phone")}
                  fullWidth
                  autoComplete="off"
                  name="phone"
                  label="Phone"
                  id="phone"
                  error={!!errors?.phone?.message}
                  helperText={errors?.phone?.message}
                />
              </Grid>
            </Grid>
            {signupError && <p>{signupError}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={ROUTE_PATH.SIGNIN} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;
