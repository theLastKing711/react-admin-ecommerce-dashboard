import {
  Create,
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

const validateReviewValue = [required(), number(), minValue(1), maxValue(100)];
const isEmpty = (value: any) =>
  typeof value === "undefined" ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

const CreateReview = () => {
  const dataProvider = useDataProvider();

  const { data } = useQuery({
    queryKey: "productsWithCategeriesList",
    queryFn: dataProvider.getProductsWithCategoryIdDropDownList,
  });

  return (
    <Create>
      <SimpleForm>
        <NumberInput source="value" validate={validateReviewValue} />
      </SimpleForm>
    </Create>
  );
};

export default CreateReview;
