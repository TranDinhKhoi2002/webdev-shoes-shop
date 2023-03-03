import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";
// components
import FormProvider from "./FormProvider";
import TextFieldRHF from "./TextFieldRHF";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
// services
import * as authServices from "@/services/authServices";

export default function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .required("Vui lòng xác nhận lại mật khẩu")
      .test("equal", "Mật khẩu không trùng khớp", function (confirmPassword) {
        const { password } = this.parent;
        return password === confirmPassword;
      }),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
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
    const { password, confirmPassword } = values;

    try {
      const { status } = await authServices.updatePassword(token, password, confirmPassword);
      if (status === 200) {
        toast.success("Thay đổi mật khẩu thành công");
        navigate("/login");
      } else toast.error("Đã có lỗi xảy ra! Vui lòng thử lại");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextFieldRHF
          name="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextFieldRHF
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
        Xác nhận
      </LoadingButton>
    </FormProvider>
  );
}
