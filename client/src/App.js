// import logo from "./logo.svg";
// import "./App.css";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <div className="App">
//       {/* <Registration /> */}
//       <Login />
//     </div>
//   );
// }

// export default App;



import "./App.css";
import {  Route, Routes ,Navigate} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";

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
        </Routes>
      </div>
    // </BrowserRouter>
  );
}

export default App;
