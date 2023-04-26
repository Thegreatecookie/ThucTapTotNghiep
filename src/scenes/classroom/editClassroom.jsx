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
        toast.success("Update ClassRoom successfully", {
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
        toast.error("Update ClassRoom failure", {
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
            label="Name"
            {...register("name")}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
            sx={{ gridColumn: "span 2" }}
            // InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="period"
            fullWidth
            variant="filled"
            label="Period"
            {...register("period")}
            error={!!errors?.period?.message}
            helperText={errors?.period?.message}
            sx={{ gridColumn: "span 2" }}
          />

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
