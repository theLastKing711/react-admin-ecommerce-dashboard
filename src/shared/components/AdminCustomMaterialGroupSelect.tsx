import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { InputProps, useInput } from "react-admin";

interface Props<T> {
  autoCompleteProps: Omit<
    AutocompleteProps<T, false, true, false, "div">,
    "renderInput"
  >;
  UseInputProps: InputProps;
}

const AdminCustomMaterialGroupSelect = <T,>({
  autoCompleteProps,
  UseInputProps,
}: Props<T>) => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput({
    ...UseInputProps,
  });

  console.log("use input props", UseInputProps);

  console.log("field", field);

  return (
    <Autocomplete
      {...field}
      id="grouped-demo"
      sx={{ width: 300 }}
      {...autoCompleteProps}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          label="With categories"
          error={(isTouched || isSubmitted) && invalid}
          helperText={
            (isTouched || isSubmitted) && invalid ? error?.message : ""
          }
          required={isRequired}
        />
      )}
    />
  );
};

export default AdminCustomMaterialGroupSelect;
