import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { SubjectSchema } from "../../schemas/Subject.schema";
import { SubjectAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { API_PATH, ROUTE_PATH } from "../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const CreateSubject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const [createError, setCreateError] = React.useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubjectSchema),
  });

  const onSubmit = (data) => {
    // data.name = data.name.trim();
    console.log(data, "DATA");
    SubjectAPI.createSubject(data)
      .then((res) => {
        console.log(res, "CREATE RES");
        toast.success("Tạo môn học thành công", {
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
        console.log(err, "ERR");
        const msgErr = err.response.data.message;
        toast.error(msgErr, {
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
  return (
    <Box m="20px">
      <Header title="CREATE SUBJECT" subtitle="Create a New Subject" />

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
        </Box>
        {/* {createError && <p>{createError}</p>} */}
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

export default CreateSubject;
