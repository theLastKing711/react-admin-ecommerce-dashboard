import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const PostFilterSidebar = () => (
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
          label="Last month"
          value={{ has_purchased: "last month" }}
        />
        <FilterListItem
          label="Since account created"
          value={{ has_purchased: "since account creation" }}
        />
      </FilterList>
    </CardContent>
  </Card>
);
