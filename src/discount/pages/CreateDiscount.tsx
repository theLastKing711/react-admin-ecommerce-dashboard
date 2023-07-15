import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  maxValue,
  minValue,
  required,
  useDataProvider,
} from "react-admin";
import { useQuery } from "react-query";
import AdminCustomMaterialGroupSelect from "../../shared/components/AdminCustomMaterialGroupSelect";
import { ProductListWithCategoryIdDto } from "../discount.types";

const validateDiscountValue = [required(), minValue(1), maxValue(100)];

const altData = [
  {
    name: "first product",
    category: {
      name: "firset category",
    },
  },
  {
    name: "second product",
    category: {
      name: "second category",
    },
  },
  {
    name: "third product",
    category: {
      name: "third product",
    },
  },
];

const CreateDiscount = () => {
  const dataProvider = useDataProvider();

  const { data = [] } = useQuery({
    queryKey: "productsWithCategeriesList",
    queryFn: dataProvider.getProductsWithCategoryIdDropDownList,
  });

  console.log("data", data);

  return (
    <Create>
      <SimpleForm>
        <TextInput source="value" validate={validateDiscountValue} />
        <AdminCustomMaterialGroupSelect
          autoCompleteProps={{
            id: "discounted-products",
            options:
              (data as ProductListWithCategoryIdDto[]) ||
              ([] as ProductListWithCategoryIdDto[]),
            groupBy: (option) => option.category.name,
            getOptionLabel: (option) => {
              console.log("option", option);

              return option.name;
            },
          }}
          UseInputProps={{
            source: "id",
            name: "categoryId",
            label: "product",
            isRequired: true,
            format: (fromValue) => {
              console.log("form value", fromValue);
              return fromValue;
            },
            parse: (inputValue) => {
              console.log("form value input", inputValue);
              return inputValue.id;
            },
          }}
        />
      </SimpleForm>
      {/* <DateInput source="startDate" label="Date date" />
      <DateInput source="endDate" label="End Date" /> */}
    </Create>
  );
};

export default CreateDiscount;
