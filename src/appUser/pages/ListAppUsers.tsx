import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  BooleanInput,
  TextInput,
  EditActions,
  EditButton,
  Pagination,
  useGetList,
  useDataProvider,
} from "react-admin";
import { APP_USER_ROUTE } from "../appUser.constants";
import { PostFilterSidebar } from "../components/AppUserFilterSideBar";

const sort = { field: "id", order: "ASC" };

const postFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  // <BooleanInput source="is_published" alwaysOn />,
  // <TextInput source="title" defaultValue="Hello, World!" />,
];

const ListAppUsers = () => {
  const { data, isLoading, total } = useGetList(APP_USER_ROUTE, {
    pagination: { page: 1, perPage: 4 },
    sort,
  });

  console.log("total", total);

  const dataProvider = useDataProvider();

  console.log("data provider", dataProvider);

  return (
    <List
      pagination={
        <Pagination rowsPerPageOptions={[10, 25, 50]} total={total} />
      }
      aside={<PostFilterSidebar />}
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="userName" />
        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListAppUsers;
