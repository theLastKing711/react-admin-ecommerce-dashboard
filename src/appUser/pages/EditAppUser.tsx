import {
  Edit,
  ImageInput,
  SimpleForm,
  TextInput,
  maxLength,
  minLength,
  required,
} from "react-admin";
import { StyledImageField } from "../../shared/components/StyledImageField";
import { Typography } from "@mui/material";
import { validateAppUserUpdatedUserNameUnicity } from "../appUser.validationHelpers";
import { useParams } from "react-router-dom";

const EditAppUser = () => {
  const { id = "1" } = useParams();

  const validateFirstName = [
    required(),
    minLength(2),
    maxLength(15),
    validateAppUserUpdatedUserNameUnicity(+id),
  ];

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="userName" validate={validateFirstName} />
        <TextInput source="password" type="password" />
        <ImageInput
          source="file"
          label="profile picture"
          isRequired={false}
          maxSize={1024 * 1024 * 4}
        >
          <StyledImageField source="src" title="profile picture" />
        </ImageInput>
        <Typography
          component="h2"
          sx={{
            margin: "1rem 0 0.25rem",
          }}
        >
          old Profile Picture
        </Typography>
        <StyledImageField source="imagePath" title="old user profile" />
      </SimpleForm>
    </Edit>
  );
};

export default EditAppUser;
