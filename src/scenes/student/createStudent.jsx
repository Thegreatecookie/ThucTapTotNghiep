import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { CreateStudentSchema } from "../../schemas";
import { StudentAPI } from "../../services";

const CreateStudent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateStudentSchema),
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    // StudentAPI.createStudent("", data)
    //   .then((res) => {
    //     console.log(res, "CREATE RES");
    //   })
    //   .catch((err) => {
    //     // Do something
    //   });
  };

  return (
    <Box m="20px">
      <Header title="CREATE STUDENT" subtitle="Create a New User Profile" />

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
            id="firstName"
            fullWidth
            variant="filled"
            label="First Name"
            type="text"
            {...register("firstName")}
            error={!!errors?.firstName?.message}
            helperText={errors?.firstName?.message}
            sx={{ gridColumn: "span 2" }}
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
            id="email"
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            {...register("email")}
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
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateStudent;
