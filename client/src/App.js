



import "./App.css";
import {  Route, Routes ,Navigate} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

function App() {
  const token=localStorage.getItem("token");
  return (
    // <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={token ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={token ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path="/edit/:id" element={token ? <Edit /> : <Navigate to={"/login"} />} />
            </Routes>
      </div>
    // </BrowserRouter>
  );
}

export default App;
