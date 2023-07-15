import { FilterLiveSearch } from "react-admin";
import { Card, CardContent } from "@mui/material";

export const CategoryFilterSideBar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
    <CardContent>
      <FilterLiveSearch source="name" />
    </CardContent>
  </Card>
);
