import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  useGetList,
  SimpleList,
} from "react-admin";
import { REVIEW_ROUTE } from "../review.constants";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomPagination from "../../shared/components/CustomPagination";
import { ReviewFilterSideBar } from "../components/ReviewFilterSideBar";

const sort = { field: "id", order: "ASC" };

const ListReview = () => {
  const { data, isLoading, total } = useGetList(REVIEW_ROUTE, {
    pagination: { page: 1, perPage: 4 },
    sort,
  });

  const theme = useTheme();
  const isMeduimAndDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallAndDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List
      pagination={<CustomPagination total={total} />}
      aside={isSmallAndDown ? undefined : <ReviewFilterSideBar />}
    >
      {isMeduimAndDown ? (
        <SimpleList
          primaryText={(record) => record.product.name}
          secondaryText={(record) => record.value}
          tertiaryText={(record) =>
            new Date(record.endDate).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="product.name" />
          <TextField source="value" />
          <DateField source="startDate" />
          <DateField source="endDate" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default ListReview;
