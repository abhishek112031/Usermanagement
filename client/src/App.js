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
import Registration from "./pages/Registration";
import Login from "./pages/Login";
// import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Registration /> 
      {/* <Login /> */}
      {/*<Home />*/}
    </div>
  );
}


export default App;

// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Routes>
//           {/* <Route path="/" exact component={Home} /> */}
//           <Route path="/registration" element={Registration} />
//           <Route path="/login" element={Login} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
