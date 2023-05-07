import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "../../components/Header";
import { RoleSchema } from "../../schemas";
import { ClassroomStudentAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";

const EditStudentClassroom = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      role: "role",
    },
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    ClassroomStudentAPI.updateClassRoomStudent(id,data)
      .then((res) => {
        console.log(res, "CREATE RES");
        toast.success("Create ClassRoom successfully", {
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
        toast.error("Create ClassRoom failure", {
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
    ClassroomStudentAPI.getClassRoomStudentById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { role } = res;
        setValue("role", role);
      })
      .catch((err) => {
        console.log(err, "lỗi");
      });
  }, [id]);

  return (
    <Box m="20px">
      <Header title="ADD STUDENT" />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
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
                  <MenuItem value="class_monitor">CLASS MONITOR</MenuItem>
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
        >
        </Box>
      </Box>
    </Box>
  );
};

export default EditStudentClassroom;
