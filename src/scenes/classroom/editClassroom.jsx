import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Header from "../../components/Header";
import { ClassRoomSchema } from "../../schemas";
import { ClassRoomAPI } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "../../constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SubjectAPI } from "../../services";

const EditClassRoom = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    state: { id },
  } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassRoomSchema),
    defaultValues: {
      name: "name",
      period: "period",
      r_subject: "r_subject",
    },
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

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data, "DATA");
    ClassRoomAPI.updateClassRoom(id, data)
      .then((res) => {
        console.log(res, "UPDATE RES");
        toast.success("Cập nhật tên lớp học thành công", {
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

  useEffect(() => {
    ClassRoomAPI.getClassRoomById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { r_subject, name, period } = res;
        setValue("name", name);
        setValue("r_subject", r_subject);
        setValue("period", period);
      })
      .catch((err) => {
        // Do something
      });
  }, [id]);

  useEffect(() => {
    fetchSubjects({ page: 1, pageSize: 10000 });
  }, []);

  return (
    <Box m="20px">
      <Header title="EDIT CLASROOM" subtitle="Edit Classroom Information" />

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
            id="name"
            fullWidth
            variant="filled"
            label="Class Name"
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
            <Controller
              name="period"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="period"
                  value={value}
                  fullWidth
                  onChange={onChange}
                >
                  <MenuItem value="Ca 1: 07:00-09:30">
                    Ca 1: 07:00-09:30
                  </MenuItem>
                  <MenuItem value="Ca 2: 09:35-12:05">
                    Ca 2: 09:35-12:05
                  </MenuItem>
                  <MenuItem value="Ca 3: 12:35-15:05">
                    Ca 3: 12:35-15:05
                  </MenuItem>
                  <MenuItem value="Ca 4: 15:10-17:40">
                    Ca 4: 15:10-17:40
                  </MenuItem>
                  <MenuItem value="Ca 5: 17:45-20:15">
                    Ca 5: 17:45-20:15
                  </MenuItem>
                </Select>
              )}
            />
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
            <Controller
              name="r_subject"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Subject"
                  value={value}
                  fullWidth
                  onChange={onChange}
                >
                  {subject.map((i) => (
                    <MenuItem key={i._id} value={i._id}>
                      {i.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors?.r_subject?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            sx={{ marginRight: "12px" }}
            onClick={() => navigate(ROUTE_PATH.CLASSROOM_LIST)}
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

export default EditClassRoom;
