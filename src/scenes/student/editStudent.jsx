import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { StudentSchema } from "../../schemas";
import { StudentAPI } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "../../constants";

const EditStudent = () => {
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
    resolver: yupResolver(StudentSchema),
    defaultValues: {
      firstName: "firstName",
      lastName: "lastName",
      classRoom: "classRoom",
      email: "email",
      phone: "phone",
      idStudent: "idStudent",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data, "DATA");
    StudentAPI.updateStudent(id, data)
      .then((res) => {
        console.log(res, "UPDATE RES");
        toast.success("Update student successfully", {
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
        toast.error("Create student failure", {
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
    StudentAPI.getStudentById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { idStudent, classRoom, email, firstName, lastName, phone } = res;
        setValue("firstName", firstName, {
          shouldValidate: true,
        });
        setValue("idStudent", idStudent, { shouldValidate: true });
        setValue("classRoom", classRoom, { shouldValidate: true });
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
      <Header title="EDIT STUDENT" subtitle="Edit student file" />

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
            id="classRoom"
            fullWidth
            variant="filled"
            type="text"
            label="Classroom"
            {...register("classRoom")}
            error={!!errors?.classRoom?.message}
            helperText={errors?.classRoom?.message}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            id="idStudent"
            fullWidth
            variant="filled"
            type="text"
            label="ID Student (Not allowed to change)"
            {...register("idStudent")}
            disabled
            error={!!errors?.idStudent?.message}
            helperText={errors?.idStudent?.message}
            sx={{ gridColumn: "span 4" }}
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
            onClick={() => navigate(ROUTE_PATH.STUDENT_LIST)}
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

export default EditStudent;
