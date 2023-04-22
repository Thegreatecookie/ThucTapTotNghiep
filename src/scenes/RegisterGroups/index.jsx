import React, { useEffect, useState } from "react";
import '../../index.css'
import Header from "../../components/Header";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { ClassRoomAPI } from "../../services";
import { tokens } from "../../theme";
import { ROUTE_PATH } from "../../constants";
import axios from 'axios';
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";



const RegisterGroups = () => {

  const onSubmit = (data) => {
    console.log(data, "DATA");
    ClassRoomAPI.createClassRoom(data)
      .then((res) => {
        console.log(res, "CREATE RES");
        toast.success("Create group successfully", {
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
        toast.error("Create groups failure", {
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


  let [responseData, setResponseData] = React.useState();
  const fetchData = (e) => {
    e.preventDefault()
    ClassRoomAPI.getData()
    .then((response)=>{
        setResponseData(response.data)
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}


  const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
        console.log(values);
      };
      

 return( <Box m="20px">
 <Header title="RegisterGroups" subtitle="dkn" />

 {/* <Formik
   initialValues={initialValues}
   validationSchema={checkoutSchema}
 >
   {({
     values,
     errors,
     touched,
     handleBlur,
     handleChange,
     handleSubmit,
   }) => (
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
           label="ID Group"
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.firstName}
           name="firstName"
           error={!!touched.firstName && !!errors.firstName}
           helperText={touched.firstName && errors.firstName}
           sx={{ gridColumn: "span 4" }}
         />
         
         <TextField
           fullWidth
           variant="filled"
           type="text"
           label="Name Groups"
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.lastName}
           name="lastName"
           error={!!touched.lastName && !!errors.lastName}
           helperText={touched.lastName && errors.lastName}
           sx={{ gridColumn: "span 4" }}
         />
         
         <Autocomplete disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300,  gridColumn: "span 4" }}
            renderInput={(params) => <TextField {...params} label="Teacher" />}>

         </Autocomplete>

         <Autocomplete disablePortal
            id="combo-box-demo"
            options={optionss}
            sx={{ width: 300 , gridColumn: "span 4"}}
            renderInput={(params) => <TextField {...params} label="Subject" />}
            
            >

         </Autocomplete>
       
         <TextField
           fullWidth
           variant="filled"
           type="text"
           label="Email"
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.email}
           name="email"
           error={!!touched.email && !!errors.email}
           helperText={touched.email && errors.email}
           sx={{ gridColumn: "span 3" }}
         />
    
         <Button color="secondary" variant="contained" >ADD</Button>
         
       </Box>
       <Box display="flex" justifyContent="center" mt="20px">
         <Button type="submit" color="secondary" variant="contained" className="btn-send" >
            Send
         </Button>
       </Box>
     </form>
   )}
 </Formik> */}
</Box>);

  
};

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
  
// };


// const optionss=['English','Developer']
// const options = ['Steven', 'MaiChie']


export default RegisterGroups;
