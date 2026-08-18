import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/layout/Body";
import EditProfile from "./components/profile/EditProfile";
import Login from "./components/pages/Login";
import Feed from "./components/feed/Feed";
import Landing from "./components/pages/Landing";
import NotFound from "./components/pages/NotFound";
import UserProfile from "./components/profile/UserProfile";
import { Provider, useSelector } from "react-redux";
import appStore from "./store/appStore";
import Connections from "./components/pages/Connections";
import Requests from "./components/pages/Requests";
import IgnoredUsers from "./components/pages/IgnoredUsers";
import Chat from "./components/pages/Chat";
import Chats from "./components/pages/Chats";

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
            <Route path="/chats" element={<Chats />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
