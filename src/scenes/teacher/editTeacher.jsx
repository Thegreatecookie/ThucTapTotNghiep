import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { TeacherSchema } from "../../schemas";
import { TeacherAPI } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "../../constants";

const EditTeacher = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    state: { id },
  } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TeacherSchema),
    defaultValues: {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      phone: "phone",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data, "DATA");
    TeacherAPI.updateTeacher(id, data)
      .then((res) => {
        console.log(res, "UPDATE RES");
        toast.success("Update teacher successfully", {
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
        // Do something
        toast.error("Update teacher failure", {
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

  useEffect(() => {
    TeacherAPI.getTeacherById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { email, firstName, lastName, phone } = res;
        setValue("firstName", firstName, {
          shouldValidate: true,
        });
        setValue("email", email, { shouldValidate: true });
        setValue("lastName", lastName, { shouldValidate: true });
        setValue("phone", phone, { shouldValidate: true });
      })
      .catch((err) => {
        // Do something
      });
  }, [id]);

  console.log(id, "STATE id");

  return (
    <Box m="20px">
      <Header title="EDIT TEACHER" subtitle="Edit teacher file" />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            id="firstName"
            fullWidth
            variant="filled"
            label="First Name"
            {...register("firstName")}
            error={!!errors?.firstName?.message}
            helperText={errors?.firstName?.message}
            sx={{ gridColumn: "span 2" }}
            // InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="lastName"
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            {...register("lastName")}
            error={!!errors?.lastName?.message}
            helperText={errors?.lastName?.message}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            id="email"
            fullWidth
            variant="filled"
            type="text"
            label="Email (Not allowed to change)"
            {...register("email")}
            disabled
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            id="phone"
            fullWidth
            variant="filled"
            type="text"
            label="Phone Number"
            {...register("phone")}
            error={!!errors?.phone?.message}
            helperText={errors?.phone?.message}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            sx={{ marginRight: "12px" }}
            onClick={() => navigate(ROUTE_PATH.TEACHER_LIST)}
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

export default EditTeacher;
