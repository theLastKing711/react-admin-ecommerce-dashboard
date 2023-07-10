import {
  Create,
  ImageInput,
  SimpleForm,
  TextInput,
  maxLength,
  minLength,
  required,
} from "react-admin";
import { validateCreatedUsernameUnicity } from "../appUser.validationHelpers";
import { StyledImageField } from "../../shared/components/StyledImageField";

const validateFirstName = [
  required(),
  minLength(2),
  maxLength(15),
  validateCreatedUsernameUnicity,
];
const validatePassword = [required(), minLength(8)];

const CreateAppUser = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="userName" validate={validateFirstName} />
        <TextInput
          source="password"
          type="password"
          validate={validatePassword}
        />
        <ImageInput
          source="file"
          label="profile picture"
          maxSize={1024 * 1024 * 4}
        >
          <StyledImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateAppUser;
