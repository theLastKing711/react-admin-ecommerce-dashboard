import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  useGetList,
  SimpleList,
} from "react-admin";
import { PRODUCT_ROUTE } from "../product.constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomPagination from "../../shared/components/CustomPagination";
import { ProductFilterSideBar } from "../components/ProductFilterSideBar";

const sort = { field: "id", order: "ASC" };

const ListProduct = () => {
  const { data, isLoading, total } = useGetList(PRODUCT_ROUTE, {
    pagination: { page: 1, perPage: 4 },
    sort,
  });

  const theme = useTheme();
  const isMeduimAndDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallAndDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List
      pagination={<CustomPagination total={total} />}
      aside={isSmallAndDown ? undefined : <ProductFilterSideBar />}
    >
      {isMeduimAndDown ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.price}
          tertiaryText={(record) =>
            new Date(record.createdAt).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="category.name" />
          <DateField source="createdAt" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default ListProduct;
