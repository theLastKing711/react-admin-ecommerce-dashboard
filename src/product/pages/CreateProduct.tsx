import {
  Create,
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
import { useQuery } from "react-query";
import { ProductListWithCategoryIdDto } from "../../discount/discount.types";
import { StyledImageField } from "../../shared/components/StyledImageField";

const validateName = [required(), minLength(2), maxLength(15)];
const validateCategoryId = [required()];
const validatePrice = [required(), number(), minValue(1)];

const CreateProduct = () => {
  const dataProvider = useDataProvider();

  const { data = [] } = useQuery({
    queryKey: "productsWithCategoryIdList",
    queryFn: dataProvider.getProductsWithCategoryIdDropDownList,
  });

  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={validateName} />
        <TextInput source="price" validate={validatePrice} />
        <ImageInput source="file" label="category" maxSize={1024 * 1024 * 4}>
          <StyledImageField source="src" title="title" />
        </ImageInput>
        <SelectInput
          source="categoryId"
          choices={data as ProductListWithCategoryIdDto[]}
          optionValue="id"
          validate={validateCategoryId}
        />
      </SimpleForm>
    </Create>
  );
};

export default CreateProduct;
