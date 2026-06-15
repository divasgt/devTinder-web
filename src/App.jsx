import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import IgnoredUsers from "./components/IgnoredUsers";

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
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/connections/ignored" element={<IgnoredUsers />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
