import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Header from "../../components/Header";
import { GroupConditionSchema } from "../../schemas";
import { ClassRoomAPI, GroupAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { API_PATH, ROUTE_PATH } from "../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EditGroupCondition = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    state: { id },
  } = useLocation();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(GroupConditionSchema),
    defaultValues: {
      min: 1,
      max: 3,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data, "DATA");
    GroupAPI.updateGroupCondition(id, data)
      .then((res) => {
        console.log(res, "UPDATE RES");
        // toast.success("Update Subject successfully", {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        alert("Sửa thông tin môn học thành công");
      })
      .catch((err) => {
        // Do something
        // toast.error("Update Subject failure", {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        console.log(err, "ERR");
        alert("Tên môn học đã tồn tại");
      });
  };

  useEffect(() => {
    GroupAPI.getGroupConditionByClassRoomID(id)
      .then((res) => {
        console.log(res, "GET ONE RES");
        const { r_classroom, max, min } = res;
        setValue("r_classroom", res[0].r_classroom);
        setValue("max", res[0].max);
        setValue("min", res[0].min);
        console.log(res[0].r_classroom);
      })
      .catch((err) => {
        // Do something
      });
  }, [id]);

  console.log(id, "STATE id");

  return (
    <Box m="20px">
      <Header
        title="EDIT GROUP CONDITION"
        subtitle="Edit Min Max Condition Of Group"
      />

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
          <FormControl
            sx={{ gridColumn: "span 4" }}
            variant="filled"
            error={!!errors?.min?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">Min</InputLabel>
            <Controller
              name="min"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select label="min" value={value} fullWidth onChange={onChange}>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                  <MenuItem value="13">13</MenuItem>
                  <MenuItem value="14">14</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="16">16</MenuItem>
                  <MenuItem value="17">17</MenuItem>
                  <MenuItem value="18">18</MenuItem>
                  <MenuItem value="19">19</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors?.min?.message}</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ gridColumn: "span 4" }}
            variant="filled"
            error={!!errors?.max?.message}
          >
            <InputLabel id="demo-simple-select-helper-label">Max</InputLabel>
            <Controller
              name="max"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select label="max" value={value} fullWidth onChange={onChange}>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                  <MenuItem value="13">13</MenuItem>
                  <MenuItem value="14">14</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="16">16</MenuItem>
                  <MenuItem value="17">17</MenuItem>
                  <MenuItem value="18">18</MenuItem>
                  <MenuItem value="19">19</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors?.max?.message}</FormHelperText>
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

export default EditGroupCondition;
