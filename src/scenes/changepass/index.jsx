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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PassWordSchema),
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    AccountAPI.changePassword(data)
      .then((res) => {
        console.log(res, "CREATE RES");
        toast.success("Change Password successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => navigate(ROUTE_PATH.SUBJECT_LIST),
        });
      })
      .catch((err) => {
        // Do something
        toast.error("Change Password failure", {
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
            id="password"
            fullWidth
            variant="filled"
            type="text"
            label="Current Password"
            {...register("password")}
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            id="newPassword"
            fullWidth
            variant="filled"
            type="text"
            label="New Password"
            {...register("newPassword")}
            error={!!errors?.newPassword?.message}
            helperText={errors?.newPassword?.message}
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
