import {
  Create,
  Edit,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
  useCreate,
  useUpdate,
} from "react-admin";
import { APP_USER_ROUTE } from "../appUser.constants";
import { UpdateAppUserDto } from "../appUser.types";
import { StyledImageField } from "../../shared/components/StyledImageField";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const acceptedFileTypes = [".jpg", ".png"];

const EditAppUser = () => {
  const [approve, { data, isLoading, isError }] = useUpdate<UpdateAppUserDto>(
    APP_USER_ROUTE,
    {
      data: {
        userName: "",
        password: "",
        file: undefined,
      },
    }
  );

  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="userName"
          validate={(value) => {
            console.log("value");
            if (!value) {
              return "Username field is required";
            }
          }}
        />
        <TextInput
          source="password"
          type="password"
          validate={(value: string) => {
            console.log("value", value);
            if (value && value.length <= 8) {
              return "Password lenght must be at least 8 characters";
            }
          }}
        />
        <ImageInput
          source="file"
          label="profile picture"
          isRequired={false}
          maxSize={1024 * 1024 * 4}
        >
          <StyledImageField source="src" title="user profile picture" />
        </ImageInput>
        <Typography
          component="h2"
          sx={{
            margin: "1rem 0 0.25rem",
          }}
        >
          old Profile Picture
        </Typography>
        <StyledImageField source="imagePath" title="user profile" />
      </SimpleForm>
    </Edit>
  );
};

export default EditAppUser;
