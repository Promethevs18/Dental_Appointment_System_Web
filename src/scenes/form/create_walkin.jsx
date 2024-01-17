import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { getDatabase, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  address: "",
  changed: "",
  contact_num: "",
  email: "",
  fullName: "",
  gender: "",
  service: "",
};

const phoneRegExp =
  // eslint-disable-next-line
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//this is for showing error sa form
const userSchema = yup.object().shape({
  address: yup.string().required("This field is required"),
  contact_num: yup
    .string()
    .matches(phoneRegExp, "Phone number is invalid")
    .required("This field is required"),
  email: yup.string().email("Invalid Email").required("This field is required"),
  fullName: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  sched_date: yup.string().required("This field is required"),
  service: yup.string().required("This field is required"),
});

//the main form
const Form = () => {
  const isNonMObile = useMediaQuery("(min-width:600px)");
  const db = getDatabase();
  const navigate = useNavigate();
  var date = new Date();

  var schedule_time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleFormSubmit = async (values) => {
    if (
      values.fullName &&
      values.address &&
      values.gender &&
      values.service &&
      values.email &&
      values.contact_num !== null
    ) {
      try {
        await update(
          ref(
            db,
            "Patient Bookings/" +
              values.fullName +
              " " +
              schedule_time +
              "/" +
              values.fullName +
              " " +
              schedule_time
          ),
          {
            ...values,
            sched_date:
              date.toLocaleString("default", { month: "long" }) +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear(),
            sched_time: schedule_time,
            changed: "no",
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/dental-management-system-2dccb.appspot.com/o/Profile-pic.png?alt=media&token=5e0d4817-042b-4cf3-b31d-fb3a1d675ec1",
          }
        );
        await update(
          ref(
            db,
            "Attendance List/" +
              date.toDateString() +
              "/" +
              values.fullName +
              " " +
              schedule_time +
              " " +
              schedule_time
          ),
          {
            ...values,
            sched_date:
              date.toLocaleString("default", { month: "long" }) +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear(),
            sched_time: schedule_time,
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/dental-management-system-2dccb.appspot.com/o/Profile-pic.png?alt=media&token=5e0d4817-042b-4cf3-b31d-fb3a1d675ec1",
          }
        );
        toast.success("Data has been uploaded in the database");
      } catch (error) {
        toast.error(error);
      }
    }
    navigate("/");
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE WALK-IN"
        subtitle="Create a walk-in appointment"
        onSubmit={handleFormSubmit}
      />

      <Formik initialValues={initialValues} validationSchema={userSchema}>
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMObile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact_num}
                name="contact_num"
                error={!!touched.contact_num && !!errors.contact_num}
                helperText={touched.contact_num && errors.contact_num}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Services"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service}
                name="service"
                error={!!touched.service && !!errors.service}
                helperText={touched.service && errors.service}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={() => handleFormSubmit(values)}
              >
                Create Walk-in Appointment
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;

//THIS PROJECT WAS MADE BY PROMETHEUS
