import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
// components
import FormProvider from "./FormProvider";
import TextFieldRHF from "./TextFieldRHF";
// services
import * as authServices from "@/services/authServices";

export default function RequestPasswordForm() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email"),
  });

  const defaultValues = {
    email: "",
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
    const { email } = values;

    try {
      const { status, data } = await authServices.requestNewPassword({ email });
      if (status === 200) {
        toast.success(data.message);
        navigate("/login");
      } else toast.error("Đã có lỗi xảy ra! Vui lòng thử lại");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextFieldRHF name="email" label="Email" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
        Xác nhận
      </LoadingButton>
    </FormProvider>
  );
}
