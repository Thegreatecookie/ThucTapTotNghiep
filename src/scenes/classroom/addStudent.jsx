import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { ClassRoomStudentSchema } from "../../schemas";
import { ClassroomStudentAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { StudentAPI } from "../../services";
import { ClassRoomAPI } from "../../services";
import { useLocation } from "react-router-dom";

const AddStudent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassRoomStudentSchema),
    defaultValues: {
      r_classroom: "r_classroom",
    },
  });

  const [student, setStudent] = useState([]);

  const fetchStudents = (pageOptions) => {
    StudentAPI.getStudent(pageOptions).then((res) => {
      const students =
        res?.students?.map((studentItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = studentItem._id;
          return { ...studentItem, id, idIncrement };
        }) ?? [];
      setStudent(students);
    });
  };

  const onSubmit = (data) => {
    console.log(data, "DATA");
    ClassroomStudentAPI.createClassRoomStudent(data)
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
    fetchStudents({ page: 1, pageSize: 10000 });
  }, []);

  useEffect(() => {
    ClassRoomAPI.getClassRoomById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { _id } = res;
        setValue("r_classroom", _id);
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
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="role"
              defaultValue=""
              {...register("role")}
            >
              <MenuItem value="">-- Choose Role --</MenuItem>
              <MenuItem value="member">MEMBER</MenuItem>
              <MenuItem value="class_monitor">CLASS MONITOR</MenuItem>
            </Select>
            <FormHelperText>{errors?.role?.message}</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ gridColumn: "span 4" }}
            variant="filled"
            error={!!errors?.r_student?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Student
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Age"
              defaultValue=""
              {...register("r_student")}
            >
              <MenuItem value="">-- Choose student --</MenuItem>
              {student.map((i) => (
                <MenuItem key={i._id} value={i._id}>
                  {i.firstName + " " + i.lastName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.r_student?.message}</FormHelperText>
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
          <TextField
            disabled={true}
            id="r_clasroom"
            fullWidth
            variant="filled"
            type="text"
            label="r_classroom"
            {...register("r_classroom")}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddStudent;
