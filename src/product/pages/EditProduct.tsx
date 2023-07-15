import {
  Edit,
  ImageInput,
  SelectInput,
  SimpleForm,
  TextInput,
  maxLength,
  minLength,
  minValue,
  number,
  required,
  useDataProvider,
} from "react-admin";
import { StyledImageField } from "../../shared/components/StyledImageField";
import { Typography } from "@mui/material";
import { CategoryListDto } from "../../category/category.types";
import { useQuery } from "react-query";

const validateName = [required(), minLength(2), maxLength(15)];
const validateCategoryId = [required()];
const validatePrice = [required(), number(), minValue(1)];

const EditProduct = () => {
  const dataProvider = useDataProvider();

  const { data = [] } = useQuery({
    queryKey: "categoriesList",
    queryFn: dataProvider.getCategoriesDropdownList,
  });

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={validateName} />
        <TextInput source="price" validate={validatePrice} />
        <SelectInput
          source="categoryId"
          choices={data as CategoryListDto[]}
          optionValue="id"
          validate={validateCategoryId}
        />
        <ImageInput source="file" label="product" maxSize={1024 * 1024 * 4}>
          <StyledImageField source="src" title="title" />
        </ImageInput>
        <Typography
          component="h2"
          sx={{
            margin: "1rem 0 0.25rem",
          }}
        >
          old Product Picture
        </Typography>
        <StyledImageField source="imagePath" title="old Product Picture" />
      </SimpleForm>
    </Edit>
  );
};

export default EditProduct;
