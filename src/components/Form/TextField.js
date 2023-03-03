import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

TextFieldRHF.propTypes = {
  name: PropTypes.string,
};

export default function TextFieldRHF({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          value={field.value || other.text || ""}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
