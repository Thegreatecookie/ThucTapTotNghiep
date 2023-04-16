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

const SignUp = () => {
  const theme = createTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    TeacherAPI.createTeacher(data)
      .then((res) => navigate("/login"))
      .catch((err) => {
        toast.error(`Sign up Fail! ${err?.response?.data}`);
        console.error(err?.response);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
    }
  }, []);

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
          <Box noValidate sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstName", { required: true })}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                  {errors.firstName?.type === "required" && (
                    <p role="alert">First name is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName", { required: true })}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                  {errors.lastName?.type === "required" && (
                    <p role="alert">First name is required</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("email", { required: true })}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                  {errors.email?.type === "required" && (
                    <p role="alert">First name is required</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("phone", { required: true })}
                    fullWidth
                    name="phone"
                    label="Phone"
                    id="phone"
                  />
                  {errors.phone?.type === "required" && (
                    <p role="alert">First name is required</p>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
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
