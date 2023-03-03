import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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

export default function Login() {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100%",
        padding: "35px 0 0 20px",
      }}
    >
      <CssBaseline />
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
            className="box"
            sx={{
              paddingTop: 12,
              my: 8,
              mx: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3">Log In</Typography>
            <Typography>Fill your information below to continue</Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
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
                autoFocus
              />
              {errors.email && <span style={{ fontSize: "14px", color: "#bf1650" }}>{errors.email?.message}</span>}
              <TextField
                margin="normal"
                fullWidth
                required
                {...register("password", {
                  required: "This is required",
                })}
                id="password"
                label="Password"
                name="password"
                type="password"
              />
              {errors.password && (
                <span style={{ fontSize: "14px", color: "#bf1650" }}>{errors.password?.message}</span>
              )}
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2, padding: 1, fontSize: "1.2rem" }}>
                Log in
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <span style={{ fontSize: "0.875rem", opacity: "0.7" }}>{"Don't have an account? "}</span>
                  <Link to="/signup">{"Sign Up"}</Link>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
