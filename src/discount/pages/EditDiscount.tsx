import {
  Edit,
  DateTimeInput,
  NumberInput,
  SimpleForm,
  maxValue,
  minValue,
  number,
  required,
  useDataProvider,
} from "react-admin";
import { useQuery } from "react-query";
import AdminCustomMaterialGroupSelect from "../../shared/components/AdminCustomMaterialGroupSelect";
import { ProductListWithCategoryIdDto } from "../discount.types";

// const validateDiscountCreation = (values) => {
//   console.log("value form", values);
// };

const validateDiscountValue = [
  required(),
  number(),
  minValue(1),
  maxValue(100),
];
const validateProductId = [required()];
const validateDiscountStartDate = [required(), minValue(new Date())];
const validateDiscountEndDate = [required(), minValue(new Date())];

const isEmpty = (value: any) =>
  typeof value === "undefined" ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

const EditDiscount = () => {
  const dataProvider = useDataProvider();

  const { data } = useQuery({
    queryKey: "productsWithCategeriesList",
    queryFn: dataProvider.getProductsWithCategoryIdDropDownList,
  });

  const options: ProductListWithCategoryIdDto[] =
    (data as ProductListWithCategoryIdDto[]) || [];

  const getTomorrowDate = () => {
    return new Date(new Date().setDate(new Date().getDate() + 1));
  };

  return (
    <Edit>
      <SimpleForm
        validate={(values) => {
          console.log("form values", values);
          const errors: Record<
            string,
            string | { message: string; args: Record<string, number> }
          > = {};

          if (values.value < 1) {
            errors.value = {
              message: "ra.validation.minValue",
              args: { min: 1 },
            };
          }
          if (values.value > 100) {
            errors.value = {
              message: "ra.validation.maxValue",
              args: { max: 100 },
            };
          }
          if (!isEmpty(values.value) && isNaN(Number(values.value))) {
            errors.value = "ra.validation.number";
          }
          if (!values.value) {
            errors.value = "ra.validation.required";
          }

          if (!values.productId) {
            errors.productId = "Required";
          }

          if (!values.startDate) {
            errors.startDate = "ra.validation.required";
          }
          if (values.startDate >= values.endDate) {
            console.log("date error", values.startDate >= values.endDate);
            errors.startDate = "Start date must be smaller than end date";
          }

          console.log("errors", errors);

          return errors;
        }}
      >
        <NumberInput source="value" validate={validateDiscountValue} />
        <AdminCustomMaterialGroupSelect
          label="discounted product"
          autoCompleteProps={{
            id: "discounted-products",
            options,
            groupBy: (option) => option.category.name,
            getOptionLabel: (option) => {
              return option.name;
            },
          }}
          UseInputProps={{
            source: "productId",
            name: "productId",
            label: "product",
            format: (fromValue) => {
              if (fromValue === null) {
                return null;
              }
              const selectedOption = options.find((x) => x.id === fromValue);
              return selectedOption;
            },
            parse: (inputValue) => {
              console.log("form valuess parse", inputValue);

              if (!inputValue) {
                return null;
              }
              console.log("not null", inputValue);
              return inputValue;
            },
            defaultValue: null,
            validate: validateProductId,
          }}
        />
        <DateTimeInput
          source="startDate"
          label="Start date"
          defaultValue={new Date()}
          validate={validateDiscountStartDate}
        />
        <DateTimeInput
          source="endDate"
          label="End Date"
          defaultValue={getTomorrowDate()}
          validate={validateDiscountEndDate}
        />
      </SimpleForm>
    </Edit>
  );
};

export default EditDiscount;
