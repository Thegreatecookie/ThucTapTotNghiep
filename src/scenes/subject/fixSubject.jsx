import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const FixSubject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="EDIT SUBJECT" subtitle="EDIT a Subject" />

      <Formik
        onSubmit={handleFormSubmit}
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
          <form onSubmit={handleSubmit}>
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
                label="asdsds Current name of the subject"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subjectname}
                name="currentsubjectname"
                error={!!touched.subjectname && !!errors.subjectname}
                helperText={touched.subjectname && errors.subjectname}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="New name of the subject"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subjectname}
                name="newsubjectname"
                error={!!touched.newsubjectname && !!errors.newsubjectname}
                helperText={touched.newsubjectname && errors.newsubjectname}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  currentsubjectname: yup
    .string()
    .subjectname("invalid subjectname")
    .required("required"),
  newsubjectname: yup
    .string()
    .subjectname("invalid subjectname")
    .required("required"),
});
const initialValues = {
  subjectname: "",
};

export default FixSubject;
