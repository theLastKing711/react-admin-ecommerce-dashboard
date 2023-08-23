import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { InputProps, useInput } from "react-admin";

interface Props<T> {
  autoCompleteProps: Omit<
    AutocompleteProps<T, false, true, false, "div">,
    "renderInput"
  >;
  UseInputProps: InputProps;
  label: string;
}

const AdminCustomMaterialGroupSelect = <T,>({
  autoCompleteProps,
  UseInputProps,
  label,
}: Props<T>) => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput({
    ...UseInputProps,
  });

  console.log("field", field);

  return (
    <Autocomplete
      {...field}
      onChange={(event, value) => {
        console.log("onchangess event", event);
        console.log("onchangess value", value);
        field.onChange(value);
      }}
      value={field.value}
      sx={{ width: 300, marginBottom: "1.5rem" }}
      {...autoCompleteProps}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={(isTouched || isSubmitted) && invalid}
          helperText={
            (isTouched || isSubmitted) && invalid
              ? (error?.message as unknown as { message: string })?.message
              : ""
          }
        />
      )}
    />
  );
};

export default AdminCustomMaterialGroupSelect;
