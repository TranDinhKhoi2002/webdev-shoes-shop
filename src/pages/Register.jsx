import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100%", padding: "35px 0 0 20px" }}>
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
            sx={{
              paddingTop: 5,
              my: 8,
              mx: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="" className="heading">
              Đăng ký
            </Typography>
            <Typography component="h1" variant="" className="subheading">
              Nhập thông tin đăng ký để tiếp tục
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    {...register("firstName", {
                      required: "Không được để trống",
                    })}
                    id="firstName"
                    label="Họ"
                    name="firstName"
                    autoFocus
                  />
                  {errors.firstName && (
                    <span style={{ fontSize: "14px", color: "#bf1650" }}>{errors.firstName?.message}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    {...register("lastName", {
                      required: "Không được để trống",
                    })}
                    id="lastName"
                    label="Tên"
                    name="lastName"
                  />
                  {errors.lastName && (
                    <span style={{ fontSize: "14px", color: "#bf1650" }}>{errors.lastName?.message}</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("email", {
                      required: "Không được để trống",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                  />
                  {errors.email && <span style={{ fontSize: "14px", color: "#bf1650" }}>{errors.email?.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    {...register("password", {
                      required: "Không được để trống",
                      minLength: {
                        value: 4,
                        message: "Mật khẩu tối thiểu 4 ký tự",
                      },
                    })}
                    id="password"
                    label="Mật khẩu"
                    name="password"
                    type="password"
                  />
                  {errors.password && (
                    <span style={{ fontSize: "14px", color: "#bf1650" }}>{errors.password?.message}</span>
                  )}
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                <Typography component="h1" variant="" className="submit-button">
                  Đăng ký
                </Typography>
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2" underline="hover">
                    Đã có tài khoản? Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
