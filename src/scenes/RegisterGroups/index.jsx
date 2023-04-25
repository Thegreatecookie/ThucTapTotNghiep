import React, { useEffect, useState } from "react";
import '../../index.css'
import Header from "../../components/Header";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { TeacherAPI } from "../../services";
import { GroupAPI } from "../../services";
import { tokens } from "../../theme";
import { ROUTE_PATH } from "../../constants";
import axios from 'axios';
import { GroupSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useMediaQuery from "@mui/material/useMediaQuery";



const RegisterGroups = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(GroupSchema),
  });
  // const [teacherData, setTeacherData] = useState([]);


  // useEffect(()=>{
  //   TeacherAPI.getTeacher().then((res) =>{
  //     const teachers = res?.map((e) =>{
  //      const name = e.firstName
  //      return(name);
  //    }) ?? []; setTeacherData(teachers)
  //  // eslint-disable-next-line no-undef
  //  });
  // })


  const onSubmit = (data) => {
    console.log(data, "DATA");
    GroupAPI.createGroup(data)
      .then((res) => {
        console.log(res, "CREATE RES");
        toast.success("Create Group successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => navigate(ROUTE_PATH.CLASSROOM_LIST),
        });
      })
      .catch((err) => {

        toast.error("Create Group failure", {
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


  const isNonMobile = useMediaQuery("(min-width:600px)");
 return( <Box m="20px">
 <Header title="RegisterGroups" subtitle="dkn" />
     <form onSubmit={handleSubmit(onSubmit)}>
       <Box
         display="grid"
         gap="30px"
         gridTemplateColumns="repeat(4, minmax(0, 1fr))"
         sx={{
           "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
         }}
       >
         <TextField
           fullWidth
           variant="filled"
           type="text"
           label="Name Groups"
        
          {...register("name")}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
           sx={{ gridColumn: "span 4" }}
         />
        
    
         <Button type="submit" color="secondary" variant="contained" >ADD</Button>
         
       </Box>
     </form>
</Box>);

  
};


export default RegisterGroups;
