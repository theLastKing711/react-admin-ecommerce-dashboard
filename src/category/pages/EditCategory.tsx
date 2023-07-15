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
import { validateCategoryUpdatedNameUnicity } from "../category.validationHelpers";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const EditCategory = () => {
  const { id = "1" } = useParams();

  const validateName = [
    required(),
    minLength(2),
    maxLength(15),
    validateCategoryUpdatedNameUnicity(+id),
  ];

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={validateName} />
        <ImageInput source="file" label="category" maxSize={1024 * 1024 * 4}>
          <StyledImageField source="src" title="title" />
        </ImageInput>
        <Typography
          component="h2"
          sx={{
            margin: "1rem 0 0.25rem",
          }}
        >
          old Category Picture
        </Typography>
        <StyledImageField source="imagePath" title="old Category Picture" />
      </SimpleForm>
    </Edit>
  );
};

export default EditCategory;
