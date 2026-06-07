import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Landing from "./components/Landing";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function Home() {
  const user = useSelector((s) => s.user);
  return user ? <Feed /> : <Landing />;
}

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
