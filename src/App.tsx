import "./App.css";
import { Admin, Resource } from "react-admin";
import users from "./appUser/pages/index";
import { APP_USER_ROUTE } from "./appUser/appUser.constants";
import {
  customDataProvider,
  myDataProfider,
} from "./config/config.dataProvider";

function App() {
  return (
    <>
      <Admin dataProvider={myDataProfider}>
        <Resource name={APP_USER_ROUTE} {...users} />
      </Admin>
    </>
  );
}

export default App;
