import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "../../components/Header";
import { RoleSchema } from "../../schemas";
import { GroupStudentAPI, StudentAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";

const EditStudentGroup = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();
  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      role: "role",
      firstName: "firstName",
      lastName: "lastName",
    },
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    GroupStudentAPI.updateGroupStudent(id, data)
      .then((res) => {
        console.log(res, "CREATE RES");
        toast.success("Sửa vai trò sinh viên thành công", {
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
        const msgErr = err.response.data.message;
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

  useEffect(() => {
    GroupStudentAPI.getGroupStudentById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        StudentAPI.getStudentById(res.r_student).then((res1) => {
          console.log(res1);
          const { firstName, lastName } = res1;
          setValue("firstName", firstName);
          setValue("lastName", lastName);
        });
        const { role } = res;
        setValue("role", role);
      })
      .catch((err) => {
        console.log(err, "lỗi");
      });
  }, [id]);

  return (
    <Box m="20px">
      <Header title="EDIT STUDENT'S ROLE" subtitle="Change Role Of Student " />

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
            disabled={true}
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
            disabled={true}
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
          <FormControl
            sx={{ gridColumn: "span 4" }}
            variant="filled"
            error={!!errors?.role?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="role"
                  value={value}
                  fullWidth
                  onChange={onChange}
                >
                  <MenuItem value="member">MEMBER</MenuItem>
                  <MenuItem value="leader">LEADER</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors?.role?.message}</FormHelperText>
          </FormControl>
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
        <Box
          visibility="hidden"
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default EditStudentGroup;
