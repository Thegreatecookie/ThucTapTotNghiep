import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../../schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { ROUTE_PATH } from "../../constants";

const Signin = () => {
  const theme = createTheme();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    axios
      .post("http://localhost:3003/account/login", data)
      .then((response) => {
        console.log(response, "RESPONSE");

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("email", response.data.mail);
          alert("Đăng nhập thành công")
          return navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err, "ERR");
        const msgErr = err.response.data.message.split(":")[1];
        alert(msgErr);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link href={ROUTE_PATH.SIGNUP} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signin;
