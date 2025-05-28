
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Body from "./components/Body"
import Login from "./components/Login"
import Feed from "./components/Feed"
import { Provider } from "react-redux"
import appStore from "./utils/AppStore"
import Profile from "./components/Profile"
import EditProfile from "./components/EditProfile"
import Requests from "./components/Requests"
import Connections from "./components/Connections";
import Query from "./components/Query";
function App() {
  return (
    <>
    <Provider store={appStore} >
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login/>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Route>
      <Route path="/user" element={<Body />} >
        <Route path="/user/requests" element={<Requests />} />
        <Route path="/user/connections" element={<Connections />} />
        <Route path="/user/query/:toUserId" element={<Query />} />
      </Route>
    </Routes>
    </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
