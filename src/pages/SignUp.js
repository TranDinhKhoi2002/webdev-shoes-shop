import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormProvider from "@/components/Form/FormProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import TextFieldRHF from "@/components/Form/TextFieldRHF";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fetchUserSignup } from "@/redux/slices/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignUpSchema = Yup.object().shape({
    fullName: Yup.string().required("This is required"),
    email: Yup.string().required("This is required").email("Email is invalid"),
    password: Yup.string().required("This is required"),
    confirmPassword: Yup.string()
      .required("This is required")
      .test("equal", "Confirm password is incorrect", function (confirmPassword) {
        const { password } = this.parent;
        return password === confirmPassword;
      }),
    phone: Yup.string().required("This is required"),
    address: Yup.string().required("This is required"),
  });

  const defaultValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  };

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const account = {
      name: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phone: values.phone,
      address: values.address,
    };

    try {
      const response = await dispatch(fetchUserSignup(account)).unwrap();
      if (response) {
        toast.success("Signed up successfully!!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  return (
    <Container sx={{ marginY: 10 }} maxWidth="xxl">
      <Grid container component="main" sx={{ height: "100%", mt: 3 }}>
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
            <Box sx={{ mx: 1 }}>
              <Typography variant="h3">Sign up</Typography>
              <Typography sx={{ mb: 3 }}>Fill your information below to continue</Typography>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <TextFieldRHF label="Full Name *" name="fullName" />
                  <TextFieldRHF label="Email *" name="email" type="email" />
                  <TextFieldRHF label="Password *" name="password" type="password" />
                  <TextFieldRHF label="Confirm Password *" name="confirmPassword" type="password" />
                  <TextFieldRHF label="Phone Number *" name="phone" type="tel" />
                  <TextFieldRHF label="Address" name="address" />
                </Stack>
                <LoadingButton
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, fontSize: "1.2rem" }}
                >
                  Sign up
                </LoadingButton>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                  <Typography sx={{ fontSize: "0.875rem", opacity: "0.7" }}>Already have an account?</Typography>
                  <Link to="/login">Log In</Link>
                </Stack>
              </FormProvider>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
