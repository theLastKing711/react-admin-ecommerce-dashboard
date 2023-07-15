import {
  Edit,
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

const validateName = [required(), minLength(2), maxLength(15)];
const validateCategoryId = [required()];
const validatePrice = [required(), number(), minValue(1)];

const DiscountProduct = () => {
  const dataProvider = useDataProvider();

  const { data = [] } = useQuery({
    queryKey: "productsWithCategoryIdList",
    queryFn: dataProvider.getProductsWithCategoryIdDropDownList,
  });

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={validateName} />
        <TextInput source="price" validate={validatePrice} />
        <SelectInput
          source="categoryId"
          choices={data as ProductListWithCategoryIdDto[]}
          optionValue="id"
          validate={validateCategoryId}
        />
      </SimpleForm>
    </Edit>
  );
};

export default DiscountProduct;
