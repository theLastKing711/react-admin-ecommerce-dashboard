import {
  Create,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
  useCreate,
} from "react-admin";
import { APP_USER_ROUTE } from "../appUser.constants";
import { CreateAppUserDto } from "../appUser.types";

const acceptedFileTypes = [".jpg", ".png"];

const CreateAppUser = () => {
  const [approve, { data, isLoading, isError }] = useCreate<CreateAppUserDto>(
    APP_USER_ROUTE,
    {
      data: {
        userName: "",
        password: "",
        file: undefined,
      },
    }
  );

  // console.log("values", data);

  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="userName"
          validate={(value) => {
            if (!value) {
              return "Username field is required";
            }
          }}
        />
        <TextInput
          source="password"
          type="password"
          validate={(value) => {
            if (!value) {
              return "Password field is required";
            }
            if (value.length <= 8) {
              return "Password length must be at least 8 characters";
            }
          }}
        />
        <ImageInput
          source="file"
          label="profile picture"
          maxSize={1024 * 1024 * 4}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateAppUser;
