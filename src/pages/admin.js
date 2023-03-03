import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import FormProvider from "../components/Form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldRHF from "../components/Form/TextFieldRHF";
import { LoadingButton } from "@mui/lab";

export default function Admin() {
  const AdminSchema = Yup.object().shape({
    name: Yup.string().required("This is required"),
    brandName: Yup.string().required("This is required"),
    size: Yup.string()
      .required("This is required")
      .matches(/[0-9]+/gi, "Size must be a number"),
    price: Yup.string()
      .required("This is required")
      .matches(/[0-9]+/gi, "Price must be a number"),
    discount: Yup.number()
      .required("This is required")
      .typeError("Discount must be a number")
      .min(0, "Discount must be between 0 and 1")
      .max(1, "Discount must be between 0 and 1"),
    desc: Yup.string().required("This is required"),
  });

  const defaultValues = {
    name: "",
    brandName: "",
    width: "",
    height: "",
    size: "",
    price: "",
    discount: "",
    desc: "",
  };

  const methods = useForm({
    resolver: yupResolver(AdminSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container component="main">
      <Container
        maxWidth="false"
        component={Paper}
        elevation={6}
        sx={{ borderRadius: "15px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 2 }}>
            Create Product
          </Typography>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldRHF label="Name *" name="name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldRHF label="Brand Name *" name="brandName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldRHF label="Size *" name="size" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{
                    //   marginRight: "1rem",
                    minWidth: "544px",
                    minHeight: "56px",
                  }}
                >
                  Image
                  <input type="file" accept=".png" hidden />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldRHF label="Price *" name="price" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldRHF label="Discount *" name="discount" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldRHF label="Description *" name="desc" />
              </Grid>
            </Grid>
            <LoadingButton
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: 1,
                fontSize: "1.2rem",
                textTransform: "capitalize",
              }}
            >
              Create
            </LoadingButton>
          </FormProvider>
        </Box>
      </Container>
    </Container>
  );
}
