import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormProvider from "@/components/Form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldRHF from "@/components/Form/TextFieldRHF";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { login } from "@/services/authServices";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("This is required").email("Email is invalid"),
    password: Yup.string().required("This is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { email, password } = values;

    try {
      const { data, status } = await login({ email, password });
      if (status === 200) {
        const token = data.jwt;
        const remainingMilliseconds = 24 * 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

        Cookies.set("token", token, { expires: expiryDate });
        toast.success("Loged in successfully!!");

        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  return (
    <Container sx={{ marginY: 10 }} maxWidth="xxl">
      <Grid
        container
        component="main"
        sx={{
          height: "100%",
        }}
      >
        <Grid
          item
          component={Paper}
          elevation={6}
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage: "url(https://i.pinimg.com/originals/5e/e6/ff/5ee6ff55c6386e5cc07697c5b33d2c02.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
            maxHeight: "546px",
          }}
        />
        <Grid item xs={12} sm={8} md={8}>
          <Container component="main" maxWidth="sm">
            <Stack
              sx={{
                paddingTop: 12,
                my: 8,
                mx: 1,
              }}
            >
              <Typography variant="h3">Log In</Typography>
              <Typography sx={{ mb: 3 }}>Fill your information below to continue</Typography>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <TextFieldRHF name="email" label="Email" />
                  <TextFieldRHF name="password" label="Password" type="password" />

                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ mt: 3, padding: 1, fontSize: "1.2rem" }}
                  >
                    Log in
                  </LoadingButton>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                  <Typography sx={{ fontSize: "0.875rem", opacity: "0.7" }}>Don't have an account?</Typography>
                  <Link to="/signup">Sign Up</Link>
                </Stack>
              </FormProvider>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
