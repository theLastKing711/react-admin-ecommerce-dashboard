import "./App.css";
import { Admin, Resource } from "react-admin";
import { myDataProfider } from "./config/config.dataProvider";
import user_routes from "./appUser/pages";
import category_routes from "./category/pages";
import product_routes from "./product/pages";
import discount_routes from "./discount/pages";
import review_routes from "./review/pages";
import { APP_USER_ROUTE } from "./appUser/appUser.constants";
import { CATEGORY_ROUTE } from "./category/category.constants";
import { PRODUCT_ROUTE } from "./product/product.constants";
import { DISCOUNT_ROUTE } from "./discount/discount.constants";
import { REVIEW_ROUTE } from "./review/review.constants";

function App() {
  return (
    <>
      <Admin dataProvider={myDataProfider}>
        <Resource name={APP_USER_ROUTE} {...user_routes} />
        <Resource name={CATEGORY_ROUTE} {...category_routes} />
        <Resource name={PRODUCT_ROUTE} {...product_routes} />
        <Resource name={DISCOUNT_ROUTE} {...discount_routes} />
        <Resource name={REVIEW_ROUTE} {...review_routes} />
      </Admin>
    </>
  );
}

export default App;
