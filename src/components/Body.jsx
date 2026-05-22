import { Outlet } from "react-router";
import NavBar from "./NavBar";

function Body() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Body;
