import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { ClassRoomSchema } from "../../schemas/Classroom.schema";
import { ClassRoomAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SubjectAPI } from "../../services";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const CreateClassroom = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassRoomSchema),
  });

  const [subject, setSubject] = useState([]);

  const fetchSubjects = (pageOptions) => {
    SubjectAPI.getSubject(pageOptions).then((res) => {
      const subjects =
        res?.subjects?.map((subjectItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = subjectItem._id;
          return { ...subjectItem, id, idIncrement };
        }) ?? [];
      setSubject(subjects);
    });
  };

  const onSubmit = (data) => {
    // console.log(data, "DATA");
    ClassRoomAPI.createClassRoom(data)
      .then((res) => {
        // console.log(res, "CREATE RES");
        toast.success("Tạo lớp thành công", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // onClose: () => navigate(ROUTE_PATH.CLASSROOM_LIST),
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

  useEffect(() => {
    fetchSubjects({ page: 1, pageSize: 10000 });
  }, []);

  return (
    <Box m="20px">
      <Header title="CREATE CLASSROOM" subtitle="Create a New Classroom" />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Chọn ngày bắt đầu" />
          </LocalizationProvider>

          <TextField
            id="name"
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            {...register("name")}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
            sx={{ gridColumn: "span 4" }}
          />
          <FormControl
            sx={{ gridColumn: "span 4" }}
            variant="filled"
            error={!!errors?.period?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">Period</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="period"
              defaultValue=""
              {...register("period")}
            >
              <MenuItem value="">-- Choose period --</MenuItem>
              <MenuItem value="Ca 1: 07:00-09:30">Ca 1: 07:00-09:30</MenuItem>
              <MenuItem value="Ca 2: 09:35-12:05">Ca 2: 09:35-12:05</MenuItem>
              <MenuItem value="Ca 3: 12:35-15:05">Ca 3: 12:35-15:05</MenuItem>
              <MenuItem value="Ca 4: 15:10-17:40">Ca 4: 15:10-17:40</MenuItem>
              <MenuItem value="Ca 5: 17:45-20:15">Ca 5: 17:45-20:15</MenuItem>
            </Select>
            <FormHelperText>{errors?.period?.message}</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ gridColumn: "span 4" }}
            variant="filled"
            error={!!errors?.r_subject?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Subject
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Age"
              defaultValue=""
              {...register("r_subject")}
            >
              <MenuItem value="">-- Choose subject --</MenuItem>
              {subject.map((i) => (
                <MenuItem key={i._id} value={i._id}>
                  {i.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.r_subject?.message}</FormHelperText>
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
      </Box>
    </Box>
  );
};

export default CreateClassroom;
