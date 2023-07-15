import { Pagination } from "react-admin";

interface Props {
  total?: number;
}

const CustomPagination = ({ total }: Props) => {
  return <Pagination rowsPerPageOptions={[10, 25, 50]} total={total} />;
};

export default CustomPagination;
