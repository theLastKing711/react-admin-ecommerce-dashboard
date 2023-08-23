import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const ReviewFilterSideBar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
    <CardContent>
      <SavedQueriesList />
      <FilterLiveSearch source="user_name_search" />
      <FilterList label="Applied" icon={<ShoppingCartIcon />}>
        <FilterListItem
          label="This month"
          value={{ time_applied: "this month" }}
        />
        <FilterListItem
          label="This Year"
          value={{ time_applied: "this year" }}
        />
      </FilterList>
    </CardContent>
  </Card>
);
