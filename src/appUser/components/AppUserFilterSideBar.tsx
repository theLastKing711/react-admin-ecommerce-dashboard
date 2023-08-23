import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const AppUserFilterSideBar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
    <CardContent>
      <SavedQueriesList />
      <FilterLiveSearch source="full_name_search" />
      <FilterList label="Role" icon={<PersonIcon />}>
        <FilterListItem label="Admin" value={{ role: "admin" }} />
        <FilterListItem label="User" value={{ role: "user" }} />
      </FilterList>
      <FilterList label="Has Purchased" icon={<ShoppingCartIcon />}>
        <FilterListItem
          label="This month"
          value={{ has_purchased: "this month" }}
        />
        <FilterListItem
          label="This year"
          value={{ has_purchased: "this year" }}
        />
      </FilterList>
    </CardContent>
  </Card>
);
