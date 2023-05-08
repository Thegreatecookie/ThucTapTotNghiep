import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { AccountAPI, SubjectAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { toast } from "react-toastify";
import { PassWordSchema } from "../../schemas/password.schema";

const CreateSubject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [change, setChange] = React.useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PassWordSchema),
  });

  const onSubmit = (data) => {
    AccountAPI.changePassword(data)
      .then((res) => {
        const msgSucc = res.message;
        // alert(msgSucc);
        return toast.success(msgSucc, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        const msgErr = err.response.data.message;
        // alert(msgErr);
        return toast.error(msgErr, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <Box m="20px">
      <Header title="CHANGE PASSWORD" />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Current Password"
            {...register("password")}
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="New Password"
            {...register("newPassword")}
            error={!!errors?.newPassword?.message}
            helperText={errors?.newPassword?.message}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Confirm New Password"
            {...register("confirm_newPassword")}
            error={!!errors?.confirm_newPassword?.message}
            helperText={errors?.confirm_newPassword?.message}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            sx={{ marginRight: "12px" }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateSubject;
