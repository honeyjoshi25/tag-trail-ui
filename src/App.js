import "./App.css";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { PostDetails } from "./components/PostDetails/PostDetails";
import ProtectedRoutes from "./ProtectedRouts";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Route>
          <Route path="/auth" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
