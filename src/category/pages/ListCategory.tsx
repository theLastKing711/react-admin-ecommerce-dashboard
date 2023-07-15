import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  useGetList,
  SimpleList,
} from "react-admin";
import { CATEGORY_ROUTE } from "../category.constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomPagination from "../../shared/components/CustomPagination";
import { CategoryFilterSideBar } from "../components/CategoryFilterSideBar";

const sort = { field: "id", order: "ASC" };

const ListCategory = () => {
  const { data, isLoading, total } = useGetList(CATEGORY_ROUTE, {
    pagination: { page: 1, perPage: 4 },
    sort,
  });

  const theme = useTheme();
  const isMeduimAndDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallAndDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List
      pagination={<CustomPagination total={total} />}
      aside={isSmallAndDown ? undefined : <CategoryFilterSideBar />}
    >
      {isMeduimAndDown ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.id}
          tertiaryText={(record) =>
            new Date(record.createdAt).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <DateField source="createdAt" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default ListCategory;
