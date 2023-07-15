import {
  Create,
  ImageInput,
  SimpleForm,
  TextInput,
  maxLength,
  minLength,
  required,
} from "react-admin";
import { StyledImageField } from "../../shared/components/StyledImageField";
import { validateCategoryCreatedNameUnicity } from "../category.validationHelpers";

const validateName = [
  required(),
  minLength(2),
  maxLength(15),
  validateCategoryCreatedNameUnicity,
];

const CreateCategory = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={validateName} />
        <ImageInput source="file" label="category" maxSize={1024 * 1024 * 4}>
          <StyledImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateCategory;
