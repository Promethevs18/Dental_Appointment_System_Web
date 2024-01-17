import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Avatar, Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { get, getDatabase, ref, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const initialValues = {
  address: "",
  changed: "",
  contact_num: "",
  email: "",
  fullName: "",
  gender: "",
  service: "",
  sched_date: "",
  sched_time: "",
};

const detailSchema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
});

const Details = ({ user }) => {
  const db = getDatabase();
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/dental-management-system-2dccb.appspot.com/o/Profile-pic.png?alt=media&token=5e0d4817-042b-4cf3-b31d-fb3a1d675ec1"
  );

  const formikRef = useRef(null);
  const navigate = useNavigate();
  var old_time;

  //ETO YUNG KUNG MAGSEARCH NG PATIENT
  const search = async (name_search, time_search) => {
    old_time = time_search;
    console.log(
      "Patient Bookings/" +
        name_search +
        " " +
        time_search +
        "/" +
        name_search +
        " " +
        time_search
    );
    const patient = ref(
      db,
      "Patient Bookings/" +
        name_search +
        " " +
        time_search +
        "/" +
        name_search +
        " " +
        time_search
    );
    const take = await get(patient);
    if (take.exists()) {
      const patientData = take.val();
      const updatedIni = {
        address: patientData.address || "",
        changed: patientData.changed || "",
        contact_num: patientData.contact_num || "",
        email: patientData.email || "",
        fullName: patientData.fullName || "",
        gender: patientData.gender || "",
        service: patientData.service || "",
        sched_date: patientData.sched_date || "",
        imageUrl: patientData.imageUrl || "",
      };

      formikRef.current.setFieldValue("address", updatedIni.address);
      formikRef.current.setFieldValue("changed", updatedIni.changed);
      formikRef.current.setFieldValue("contact_num", updatedIni.contact_num);
      formikRef.current.setFieldValue("email", updatedIni.email);
      formikRef.current.setFieldValue("fullName", updatedIni.fullName);
      formikRef.current.setFieldValue("gender", updatedIni.gender);
      formikRef.current.setFieldValue("service", updatedIni.service);
      formikRef.current.setFieldValue("sched_date", updatedIni.sched_date);

      setImage(take.val().imageUrl);
    } else {
      toast.error("Cannot find patient");
    }
  };

  //ETO NAMAN YUNG PARA SA PAG UPLOAD NG DATA IF MAY CHANGES
  const updateData = async (details) => {
    if (
      window.confirm(
        "Are you sure you want to reschedule the patient's booking?"
      )
    ) {
      if (details.sched_date !== null) {
        try {
          await update(
            ref(
              db,
              "Patient Bookings/" +
                details.fullName +
                " " +
                details.sched_time +
                "/" +
                +details.fullName +
                " " +
                details.sched_time
            ),
            {
              ...details,
              changed: "Yes",
            }
          );

          //ETO NAMAN FOR THE EMAILING SHIT
          //this property creates a temporary form na kukuha ng values from the formik
          //para hawakan nya sa email natin
          const templateParams = {
            ...formikRef.current.values,
          };

          //eto naman ang method para magsend ng email to the user
          //kasama rito ang serviceID, templateID, at yung PublicID, pati narin yung templateParams
          emailjs
            .send(
              "service_25w69jt",
              "template_gcoxliu",
              templateParams,
              "p4xfnVj9crR2omWTm"
            )
            .then((response) => {
              toast.success(old_time);
              toast.success(details.sched_time);
              toast.success(
                "Email has been sent sucessfully and record has been updated"
              );
            })
            .catch((error) => {
              toast.error("Error sending email:", error);
            });
        } catch (error) {
          toast.error(error);
        }
      }
      navigate("/");
    }
  };

  //ETO NAMAN YUNG PARA SA DELETE BUTTON
  const handleDelete = async (id) => {
    if (window.confirm("Are you REALLY sure you want to delete the data")) {
      try {
        await remove(ref(db, "Patient Bookings/" + id, id));
        toast.success("Patient record has been deleted permanently");
      } catch (error) {
        toast.error(error);
      }
    }
    navigate("/");
  };

  return (
    <Box m="20px">
      <Header
        title="VIEW PATIENT DETAILS"
        subtitle="This section provides the details of a specific patient. The results came from either selected from the 'Patients Manifest' or searching for it below "
      />
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={detailSchema}
        onSubmit={updateData}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box display="flex" justifyContent="center" m="20px">
              <Avatar
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "20%",
                  width: "20%",
                }}
                alt="your image"
                src={image}
              />
            </Box>

            <Box display="flex" justifyContent="center" m="20px">
              <TextField
                variant="filled"
                fullWidth
                type="text"
                value={values.fullName}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Full Name"
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ maxWidth: "50%", marginRight: "15px" }}
              />

              <TextField
                variant="filled"
                fullWidth
                type="text"
                value={values.sched_time}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Booking time"
                name="sched_time"
                error={!!touched.sched_time && !!errors.sched_time}
                helperText={touched.sched_time && errors.sched_time}
                sx={{ maxWidth: "25%" }}
              />

              <Button
                sx={{ m: "20px" }}
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                onClick={() => search(values.fullName, values.sched_time)}
              ></Button>
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                variant="filled"
                fullWidth
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email address"
                name="email"
                value={values.email}
                disabled={true}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                variant="filled"
                fullWidth
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Address"
                name="address"
                disabled={true}
                value={values.address}
                sx={{ gridColumn: "span 2" }}
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
                disabled={true}
                error={!!touched.contact_num && !!errors.contact_num}
                helperText={touched.contact_num && errors.contact_num}
                sx={{ gridColumn: "span 1" }}
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
                disabled={true}
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Services"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service}
                disabled={true}
                name="service"
                error={!!touched.service && !!errors.service}
                helperText={touched.service && errors.service}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Appointment Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sched_date}
                name="sched_date"
                error={!!touched.sched_date && !!errors.sched_date}
                helperText={touched.sched_date && errors.sched_date}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>

            <Box display="flex" justifyContent="center" m="50px">
              <Button type="submit" color="secondary" variant="contained">
                Update Patient Information
              </Button>
              {values.email !== "" && (
                <span style={{ marginLeft: "20px" }}>
                  <Button
                    color="reddish"
                    variant="contained"
                    m="20px"
                    onClick={() => handleDelete(values.fullName)}
                  >
                    Delete Record Permanently
                  </Button>
                </span>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Details;

//THIS PROJECT WAS MADE BY PROMETHEUS
