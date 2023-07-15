import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  useGetList,
  SimpleList,
} from "react-admin";
import { APP_USER_ROUTE } from "../appUser.constants";
import { AppUserFilterSideBar } from "../components/AppUserFilterSideBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomPagination from "../../shared/components/CustomPagination";

const sort = { field: "id", order: "ASC" };

const ListAppUsers = () => {
  const { data, isLoading, total } = useGetList(APP_USER_ROUTE, {
    pagination: { page: 1, perPage: 4 },
    sort,
  });

  const theme = useTheme();
  const isMeduimAndDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallAndDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List
      pagination={<CustomPagination total={total} />}
      aside={isSmallAndDown ? undefined : <AppUserFilterSideBar />}
    >
      {isMeduimAndDown ? (
        <SimpleList
          primaryText={(record) => record.userName}
          secondaryText={(record) => record.id}
          tertiaryText={(record) =>
            new Date(record.createdAt).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="userName" />
          <DateField source="createdAt" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default ListAppUsers;
