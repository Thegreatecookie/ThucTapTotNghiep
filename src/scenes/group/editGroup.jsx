import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { GroupSchema } from "../../schemas";
import { GroupAPI } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "../../constants";

const EditGroup = () => {
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
    resolver: yupResolver(GroupSchema),
    defaultValues: {
      name: "name",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data, "DATA");
    GroupAPI.updateGroup(id, data)
      .then((res) => {
        console.log(res, "UPDATE RES");
        toast.success("Sửa thông tin lớp học thành công", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // alert("Sửa thông tin môn học thành công");
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
    GroupAPI.getGroupById(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { name } = res;
        setValue("name", name, {
          shouldValidate: true,
        });
      })
      .catch((err) => {
        // Do something
      });
  }, [id]);

  console.log(id, "STATE id");

  return (
    <Box m="20px">
      <Header title="EDIT SUBJECT" subtitle="Edit Subject Information" />

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
            sx={{ gridColumn: "span 4" }}
            // InputLabelProps={{ shrink: true }}
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

export default EditGroup;
