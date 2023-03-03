import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormProvider from "@/components/Form/FormProvider";
import { signup } from "@/services/authRequests";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
    const account = {
      name: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phone: values.phone,
      address: values.address,
    };

    try {
      const res = await signup(account);
      if (res.status === 201) {
        toast.success("Signed up successfully!!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100%", padding: "35px 0 0 20px" }}>
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
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              paddingTop: 5,
              my: 8,
              mx: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" className="heading">
              Sign up
            </Typography>
            <Typography className="subheading" sx={{ mb: 3 }}>
              Fill your information below to continue
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("fullName", {
                      required: "This is required",
                    })}
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("email", {
                      required: "This is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email",
                      },
                    })}
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 6,
                        message: "Password must contain at least 6 characters",
                      },
                    })}
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("confirmPassword", {
                      required: "This is required",
                      validate: (value) => value === getValues("password"),
                    })}
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("phone", {
                      required: "This is required",
                      pattern: {
                        value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      },
                    })}
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("address", {
                      required: "This is required",
                    })}
                    id="address"
                    label="Address"
                    name="address"
                    type="tel"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                <Typography component="h1" variant="" className="submit-button">
                  Sign up
                </Typography>
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <span style={{ fontSize: "0.875rem", opacity: "0.7" }}>{"Already have an account? "}</span>
                  <Link to="/login">{"Log In"}</Link>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
